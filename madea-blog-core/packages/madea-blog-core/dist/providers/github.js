import { extractTitle, isMarkdownFile } from "../utils.js";
const TEN_MINUTES_SECONDS = 60 * 10;
const ONE_DAY_SECONDS = 60 * 60 * 24;
export class GitHubDataProvider {
  username;
  repo;
  token;
  repoPath;
  subDir;
  cachedBranch;
  cachedUser;
  constructor(options) {
    this.username = options.username;
    this.repo = options.repo;
    this.token = options.token;
    this.repoPath = `${options.username}/${options.repo}`;
    this.subDir = options.subDir?.replace(/^\/|\/$/g, ""); // normalize: remove leading/trailing slashes
  }
  async fetchFromGitHub(url, cacheSeconds = TEN_MINUTES_SECONDS) {
    const headers = {
      Accept: "application/vnd.github.v3+json",
    };
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    const options = {
      headers,
      cache: "force-cache",
      next: { revalidate: cacheSeconds },
    };
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  }
  async fetchGitHubUser(username) {
    if (this.cachedUser !== undefined) {
      return this.cachedUser;
    }
    try {
      const options = {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      };
      const response = await fetch(
        `https://api.github.com/users/${username}`,
        options,
      );
      if (!response.ok) {
        this.cachedUser = null;
        return null;
      }
      const userData = await response.json();
      this.cachedUser = userData;
      return userData;
    } catch {
      this.cachedUser = null;
      return null;
    }
  }
  async getDefaultBranch() {
    if (this.cachedBranch) {
      return this.cachedBranch;
    }
    const data = await this.fetchFromGitHub(
      `https://api.github.com/repos/${this.repoPath}`,
      ONE_DAY_SECONDS,
    );
    this.cachedBranch = data.default_branch;
    return data.default_branch;
  }
  async getFileContent(filePath) {
    const branch = await this.getDefaultBranch();
    const url = `https://api.github.com/repos/${this.repoPath}/contents/${filePath}?ref=${branch}`;
    const data = await this.fetchFromGitHub(url, TEN_MINUTES_SECONDS);
    return Buffer.from(data.content, data.encoding).toString("utf-8");
  }
  async getFileContentWithMetadata(filePath) {
    const branch = await this.getDefaultBranch();
    const url = `https://api.github.com/repos/${this.repoPath}/contents/${filePath}?ref=${branch}`;
    const data = await this.fetchFromGitHub(url, TEN_MINUTES_SECONDS);
    return {
      content: Buffer.from(data.content, data.encoding).toString("utf-8"),
      sha: data.sha,
      htmlUrl: data.html_url,
    };
  }
  async getCommitInfo(filePath) {
    const commits = await this.fetchFromGitHub(
      `https://api.github.com/repos/${this.repoPath}/commits?path=${filePath}&per_page=1`,
    );
    if (!commits || commits.length === 0) {
      return {
        date: new Date().toISOString(),
        authorName: this.username,
        authorEmail: undefined,
        authorUsername: this.username,
        authorAvatarUrl: `https://github.com/${this.username}.png`,
      };
    }
    const lastCommit = commits[0];
    return {
      date: lastCommit.commit.author.date,
      authorName: lastCommit.commit.author.name,
      authorEmail: lastCommit.commit.author.email,
      authorUsername: lastCommit.author?.login,
      authorAvatarUrl: lastCommit.author?.avatar_url,
    };
  }
  async getArticleList() {
    const branch = await this.getDefaultBranch();
    const treeUrl = `https://api.github.com/repos/${this.repoPath}/git/trees/${branch}?recursive=1`;
    const data = await this.fetchFromGitHub(treeUrl, TEN_MINUTES_SECONDS);
    const subDirPrefix = this.subDir ? `${this.subDir}/` : "";
    const markdownFiles = data.tree.filter((item) => {
      if (item.type !== "blob" || !isMarkdownFile(item.path)) {
        return false;
      }
      // If subDir is set, only include files within that directory
      if (this.subDir && !item.path.startsWith(subDirPrefix)) {
        return false;
      }
      return true;
    });
    const articles = await Promise.all(
      markdownFiles.map(async (file) => {
        // Strip subDir prefix from path for routing
        const routePath = this.subDir
          ? file.path.slice(subDirPrefix.length)
          : file.path;
        try {
          const [content, commitInfo] = await Promise.all([
            this.getFileContent(file.path),
            this.getCommitInfo(file.path),
          ]);
          return {
            path: routePath,
            content:
              content.substring(0, 500) + (content.length > 500 ? "..." : ""),
            sha: file.sha,
            url: `https://github.com/${this.repoPath}/blob/${branch}/${file.path}`,
            commitInfo,
            title: extractTitle(content, file.path),
          };
        } catch {
          // Fallback for files that can't be fetched
          const fallbackCommitInfo = {
            date: new Date().toISOString(),
            authorName: this.username,
            authorEmail: undefined,
            authorUsername: this.username,
            authorAvatarUrl: `https://github.com/${this.username}.png`,
          };
          const fallbackTitle =
            file.path
              .replace(/\.(md|mdx)$/, "")
              .replace(/[-_]/g, " ")
              .split("/")
              .pop() || file.path;
          return {
            path: routePath,
            content: "",
            sha: file.sha,
            url: `https://github.com/${this.repoPath}/blob/${branch}/${file.path}`,
            commitInfo: fallbackCommitInfo,
            title: fallbackTitle,
          };
        }
      }),
    );
    // Sort by newest first
    articles.sort((a, b) => {
      return (
        new Date(b.commitInfo.date).getTime() -
        new Date(a.commitInfo.date).getTime()
      );
    });
    return articles;
  }
  async getArticle(articlePath) {
    try {
      const branch = await this.getDefaultBranch();
      // Prepend subDir to get the full path in the repo
      const fullPath = this.subDir
        ? `${this.subDir}/${articlePath}`
        : articlePath;
      const [fileData, commitInfo] = await Promise.all([
        this.getFileContentWithMetadata(fullPath),
        this.getCommitInfo(fullPath),
      ]);
      return {
        path: articlePath, // Return the route path (without subDir)
        content: fileData.content,
        sha: fileData.sha,
        url: `https://github.com/${this.repoPath}/blob/${branch}/${fullPath}`,
        commitInfo,
        title: extractTitle(fileData.content, fullPath),
      };
    } catch {
      return null;
    }
  }
  async getSourceInfo() {
    const [user, branch] = await Promise.all([
      this.fetchGitHubUser(this.username),
      this.getDefaultBranch(),
    ]);
    const sourceUrl = this.subDir
      ? `https://github.com/${this.repoPath}/tree/${branch}/${this.subDir}`
      : `https://github.com/${this.repoPath}`;
    return {
      name: user?.name || this.username,
      bio: user?.bio || undefined,
      avatarUrl: user?.avatar_url || `https://github.com/${this.username}.png`,
      sourceUrl,
    };
  }
}
//# sourceMappingURL=github.js.map
