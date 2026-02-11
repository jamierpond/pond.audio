import { extractDescription } from "./utils.js";
/**
 * Generate metadata for an index/listing page (blog index, docs index)
 */
export function generateIndexMetadata(options) {
  const { seo, path, title, description } = options;
  const url = `${seo.baseUrl}${path}`;
  const metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: seo.siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: seo.twitterHandle,
    },
    alternates: {
      canonical: url,
    },
  };
  if (seo.defaultImage) {
    metadata.openGraph.images = [{ url: seo.defaultImage }];
    metadata.twitter.images = [seo.defaultImage];
  }
  return metadata;
}
/**
 * Generate metadata for an individual article page
 */
export function generateArticleMetadata(article, options) {
  const { seo, path } = options;
  const slug = article.path.replace(/\.md$/, "");
  const url = `${seo.baseUrl}${path}/${slug}`;
  const description =
    extractDescription(article.content) || seo.defaultDescription || "";
  const authorName = seo.authorName || article.commitInfo.authorName;
  const metadata = {
    title: `${article.title} | ${seo.siteName}`,
    description,
    openGraph: {
      title: article.title,
      description,
      url,
      siteName: seo.siteName,
      type: "article",
      publishedTime: article.commitInfo.date,
      modifiedTime: article.commitInfo.date,
      authors: authorName ? [authorName] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      site: seo.twitterHandle,
    },
    alternates: {
      canonical: url,
    },
  };
  if (seo.defaultImage) {
    metadata.openGraph.images = [{ url: seo.defaultImage }];
    metadata.twitter.images = [seo.defaultImage];
  }
  return metadata;
}
/**
 * Helper to fetch article and generate metadata in one call.
 * Returns null if article not found.
 */
export async function generateArticleMetadataFromSlug(
  dataProvider,
  slug,
  options,
) {
  const slugWithExtension = [...slug];
  slugWithExtension[slugWithExtension.length - 1] += ".md";
  const path = slugWithExtension.join("/");
  const article = await dataProvider.getArticle(path);
  if (!article) return null;
  return generateArticleMetadata(article, options);
}
//# sourceMappingURL=metadata.js.map
