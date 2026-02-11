/** Data from the last commit */
export interface CommitInfo {
  date: string;
  authorName: string;
  authorEmail?: string;
  authorUsername?: string;
  authorAvatarUrl?: string;
}
/** Normalized blog article data */
export interface FileInfo {
  path: string;
  content: string;
  sha: string;
  url: string;
  commitInfo: CommitInfo;
  title: string;
}
/** Normalized source/author info for the homepage */
export interface SourceInfo {
  name: string;
  bio?: string;
  avatarUrl?: string;
  sourceUrl: string;
}
/** The main contract for all data sources */
export interface DataProvider {
  getArticleList(): Promise<FileInfo[]>;
  getArticle(path: string): Promise<FileInfo | null>;
  getSourceInfo(): Promise<SourceInfo>;
  getDefaultBranch(): Promise<string>;
}
/** Props for the article/markdown view component */
export interface ArticleViewProps {
  article: FileInfo;
  username: string;
  branch: string;
}
/** Props for the file browser/article list view component */
export interface FileBrowserViewProps {
  articles: FileInfo[];
  sourceInfo: SourceInfo;
  username: string;
}
/** Props for the "no repo found" view component */
export interface NoRepoFoundViewProps {
  username: string;
}
/** Props for the landing page view component (shown when no subdomain) */
export interface LandingViewProps {}
//# sourceMappingURL=data-provider.d.ts.map
