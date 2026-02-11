import type { DataProvider, FileInfo } from "./data-provider.js";
/**
 * SEO configuration for generating metadata
 */
export interface SeoConfig {
  baseUrl: string;
  siteName: string;
  defaultDescription?: string;
  defaultImage?: string;
  twitterHandle?: string;
  authorName?: string;
  authorUrl?: string;
}
/**
 * Next.js Metadata-compatible object
 * We don't import from 'next' to keep the core framework-agnostic
 */
export interface MadeaMetadata {
  title: string;
  description: string;
  openGraph?: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    type: "website" | "article";
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
  };
  twitter?: {
    card: "summary" | "summary_large_image";
    title: string;
    description: string;
    site?: string;
    creator?: string;
    images?: string[];
  };
  alternates?: {
    canonical: string;
  };
}
export interface IndexMetadataOptions {
  seo: SeoConfig;
  path: string;
  title: string;
  description: string;
}
/**
 * Generate metadata for an index/listing page (blog index, docs index)
 */
export declare function generateIndexMetadata(
  options: IndexMetadataOptions,
): MadeaMetadata;
export interface ArticleMetadataOptions {
  seo: SeoConfig;
  path: string;
}
/**
 * Generate metadata for an individual article page
 */
export declare function generateArticleMetadata(
  article: FileInfo,
  options: ArticleMetadataOptions,
): MadeaMetadata;
/**
 * Helper to fetch article and generate metadata in one call.
 * Returns null if article not found.
 */
export declare function generateArticleMetadataFromSlug(
  dataProvider: DataProvider,
  slug: string[],
  options: ArticleMetadataOptions,
): Promise<MadeaMetadata | null>;
//# sourceMappingURL=metadata.d.ts.map
