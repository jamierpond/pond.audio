import { extractDescription } from "./utils.js";
/**
 * Generates sitemap entries for the blog index and all articles.
 * Use this in your Next.js sitemap.ts file.
 */
export async function generateBlogSitemap(dataProvider, options) {
  const { baseUrl, blogPath = "/blog" } = options;
  const entries = [];
  try {
    const articles = await dataProvider.getArticleList();
    // Blog index page
    const latestArticle = articles[0];
    entries.push({
      url: `${baseUrl}${blogPath}`,
      lastModified: latestArticle
        ? new Date(latestArticle.commitInfo.date)
        : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
    // Individual articles
    for (const article of articles) {
      const slug = article.path.replace(/\.md$/, "");
      entries.push({
        url: `${baseUrl}${blogPath}/${slug}`,
        lastModified: new Date(article.commitInfo.date),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch {
    // Return empty if data provider fails
  }
  return entries;
}
/**
 * Generates JSON-LD structured data for the blog index page.
 */
export async function generateBlogJsonLd(dataProvider, options) {
  const {
    baseUrl,
    blogPath = "/blog",
    blogName,
    blogDescription,
    authorName,
    authorUrl,
  } = options;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: blogName,
    description: blogDescription,
    url: `${baseUrl}${blogPath}`,
  };
  if (authorName) {
    jsonLd.author = {
      "@type": "Person",
      name: authorName,
      url: authorUrl,
    };
  }
  try {
    const articles = await dataProvider.getArticleList();
    jsonLd.blogPost = articles.slice(0, 10).map((article) => ({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: extractDescription(article.content),
      url: `${baseUrl}${blogPath}/${article.path.replace(/\.md$/, "")}`,
      datePublished: article.commitInfo.date,
      dateModified: article.commitInfo.date,
    }));
  } catch {
    // Skip blog posts if data provider fails
  }
  return jsonLd;
}
/**
 * Generates JSON-LD structured data for an individual article.
 */
export function generateArticleJsonLd(article, options) {
  const { baseUrl, blogPath = "/blog", authorName, authorUrl } = options;
  const slug = article.path.replace(/\.md$/, "");
  const url = `${baseUrl}${blogPath}/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: extractDescription(article.content),
    url,
    datePublished: article.commitInfo.date,
    dateModified: article.commitInfo.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
  const author = authorName || article.commitInfo.authorName;
  if (author) {
    jsonLd.author = {
      "@type": "Person",
      name: author,
      url: authorUrl,
    };
  }
  return jsonLd;
}
//# sourceMappingURL=seo.js.map
