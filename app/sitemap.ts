import type { MetadataRoute } from "next";
import { createBlogConfig } from "./blog/madea-config";

const BASE_URL = "https://pond.audio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tree`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/add-me`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/wordle`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/daw`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const config = createBlogConfig();
    const articles = await config.dataProvider.getArticleList();
    blogPages = articles.map((article) => ({
      url: `${BASE_URL}/blog/${article.path}`,
      lastModified: new Date(article.commitInfo.date),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // Blog articles unavailable — skip
  }

  return [...staticPages, ...blogPages];
}
