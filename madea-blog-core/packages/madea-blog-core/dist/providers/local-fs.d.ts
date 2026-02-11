import type { DataProvider, FileInfo, SourceInfo } from "../data-provider.js";
interface LocalFsOptions {
  /** Path to the content directory (relative to cwd or absolute) */
  contentDir: string;
  /** Optional author name for fallback when git info unavailable */
  authorName?: string;
  /** Optional source URL for attribution */
  sourceUrl?: string;
}
export declare class LocalFsDataProvider implements DataProvider {
  private readonly git;
  private readonly contentDir;
  private readonly authorName;
  private readonly sourceUrl;
  constructor(options: LocalFsOptions);
  private getCommitInfo;
  private getFileSha;
  getArticleList(): Promise<FileInfo[]>;
  getArticle(articlePath: string): Promise<FileInfo | null>;
  getSourceInfo(): Promise<SourceInfo>;
  getDefaultBranch(): Promise<string>;
}
export {};
//# sourceMappingURL=local-fs.d.ts.map
