import type { DataProvider, FileInfo, SourceInfo } from "../data-provider.js";
interface GitHubOptions {
  username: string;
  repo: string;
  token?: string;
  subDir?: string;
}
export declare class GitHubDataProvider implements DataProvider {
  private readonly username;
  private readonly repo;
  private readonly token?;
  private readonly repoPath;
  private readonly subDir?;
  private cachedBranch?;
  private cachedUser;
  constructor(options: GitHubOptions);
  private fetchFromGitHub;
  private fetchGitHubUser;
  getDefaultBranch(): Promise<string>;
  private getFileContent;
  private getFileContentWithMetadata;
  private getCommitInfo;
  getArticleList(): Promise<FileInfo[]>;
  getArticle(articlePath: string): Promise<FileInfo | null>;
  getSourceInfo(): Promise<SourceInfo>;
}
export {};
//# sourceMappingURL=github.d.ts.map
