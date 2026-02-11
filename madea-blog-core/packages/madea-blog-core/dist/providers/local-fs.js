import * as fs from "fs/promises";
import * as path from "path";
import simpleGit from "simple-git";
import { extractTitle, isMarkdownFile } from "../utils.js";
/** Recursively find all markdown files in a directory */
async function getMarkdownFiles(dir, baseDir = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip hidden directories and node_modules
      if (!entry.name.startsWith(".") && entry.name !== "node_modules") {
        const nested = await getMarkdownFiles(fullPath, baseDir);
        files.push(...nested);
      }
    } else if (isMarkdownFile(entry.name)) {
      // Return relative path from baseDir
      const relativePath = path.relative(baseDir, fullPath);
      files.push(relativePath);
    }
  }
  return files;
}
export class LocalFsDataProvider {
  git;
  contentDir;
  authorName;
  sourceUrl;
  constructor(options) {
    this.contentDir = path.resolve(options.contentDir);
    this.authorName = options.authorName || process.env.USER || "Local Author";
    this.sourceUrl = options.sourceUrl || `file://${this.contentDir}`;
    this.git = simpleGit(this.contentDir);
  }
  async getCommitInfo(relativePath) {
    try {
      const filePath = path.join(this.contentDir, relativePath);
      const logResult = await this.git.log({
        file: filePath,
        maxCount: 1,
      });
      const latestCommit = logResult.latest;
      if (latestCommit) {
        return {
          date: latestCommit.date,
          authorName: latestCommit.author_name,
          authorEmail: latestCommit.author_email,
          // No GitHub username available from local git - Avatar component will be used
          authorUsername: undefined,
          authorAvatarUrl: undefined,
        };
      }
    } catch {
      // Git log failed, fall back to file stats
    }
    // Fallback: use file modification time
    try {
      const filePath = path.join(this.contentDir, relativePath);
      const stat = await fs.stat(filePath);
      return {
        date: stat.mtime.toISOString(),
        authorName: this.authorName,
        authorEmail: undefined,
        authorUsername: undefined,
        authorAvatarUrl: undefined,
      };
    } catch {
      return {
        date: new Date().toISOString(),
        authorName: this.authorName,
        authorEmail: undefined,
        authorUsername: undefined,
        authorAvatarUrl: undefined,
      };
    }
  }
  async getFileSha(relativePath) {
    try {
      const filePath = path.join(this.contentDir, relativePath);
      // Try to get the git blob SHA
      const result = await this.git.raw(["rev-parse", `HEAD:${relativePath}`]);
      return result.trim();
    } catch {
      // Fallback: use file inode as identifier
      try {
        const filePath = path.join(this.contentDir, relativePath);
        const stat = await fs.stat(filePath);
        return `local-${stat.ino}`;
      } catch {
        return `local-${Date.now()}`;
      }
    }
  }
  async getArticleList() {
    const relativePaths = await getMarkdownFiles(this.contentDir);
    const articles = await Promise.all(
      relativePaths.map(async (relativePath) => {
        const fullPath = path.join(this.contentDir, relativePath);
        const content = await fs.readFile(fullPath, "utf-8");
        const commitInfo = await this.getCommitInfo(relativePath);
        const sha = await this.getFileSha(relativePath);
        return {
          path: relativePath,
          content:
            content.substring(0, 500) + (content.length > 500 ? "..." : ""),
          sha,
          url: fullPath,
          commitInfo,
          title: extractTitle(content, relativePath),
        };
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
      const fullPath = path.join(this.contentDir, articlePath);
      const content = await fs.readFile(fullPath, "utf-8");
      const commitInfo = await this.getCommitInfo(articlePath);
      const sha = await this.getFileSha(articlePath);
      return {
        path: articlePath,
        content,
        sha,
        url: fullPath,
        commitInfo,
        title: extractTitle(content, articlePath),
      };
    } catch {
      return null;
    }
  }
  async getSourceInfo() {
    return {
      name: this.authorName,
      bio: "Serving content from local filesystem",
      avatarUrl: undefined,
      sourceUrl: this.sourceUrl,
    };
  }
  async getDefaultBranch() {
    try {
      const result = await this.git.revparse(["--abbrev-ref", "HEAD"]);
      return result.trim() || "main";
    } catch {
      return "main";
    }
  }
}
//# sourceMappingURL=local-fs.js.map
