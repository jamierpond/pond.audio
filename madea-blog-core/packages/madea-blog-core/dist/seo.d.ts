import type { DataProvider, FileInfo } from "./data-provider.js";
export interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}
export interface BlogSitemapOptions {
  baseUrl: string;
  blogPath?: string;
}
/**
 * Generates sitemap entries for the blog index and all articles.
 * Use this in your Next.js sitemap.ts file.
 */
export declare function generateBlogSitemap(
  dataProvider: DataProvider,
  options: BlogSitemapOptions,
): Promise<SitemapEntry[]>;
export interface BlogJsonLd {
  "@context": "https://schema.org";
  "@type": "Blog";
  name: string;
  description: string;
  url: string;
  author?: PersonJsonLd;
  blogPost?: BlogPostingJsonLd[];
}
export interface BlogPostingJsonLd {
  "@context": "https://schema.org";
  "@type": "BlogPosting";
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  author?: PersonJsonLd;
  mainEntityOfPage?: {
    "@type": "WebPage";
    "@id": string;
  };
}
export interface PersonJsonLd {
  "@type": "Person";
  name: string;
  url?: string;
}
export interface BlogJsonLdOptions {
  baseUrl: string;
  blogPath?: string;
  blogName: string;
  blogDescription: string;
  authorName?: string;
  authorUrl?: string;
}
/**
 * Generates JSON-LD structured data for the blog index page.
 */
export declare function generateBlogJsonLd(
  dataProvider: DataProvider,
  options: BlogJsonLdOptions,
): Promise<BlogJsonLd>;
export interface ArticleJsonLdOptions {
  baseUrl: string;
  blogPath?: string;
  authorName?: string;
  authorUrl?: string;
}
/**
 * Generates JSON-LD structured data for an individual article.
 */
export declare function generateArticleJsonLd(
  article: FileInfo,
  options: ArticleJsonLdOptions,
): BlogPostingJsonLd;
//# sourceMappingURL=seo.d.ts.map
