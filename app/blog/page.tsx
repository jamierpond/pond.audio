import { renderMadeaBlogPage } from "madea-blog-core";
import { createBlogConfig, generateBlogMetadata } from "./madea-config";

export const revalidate = 600;

export const generateMetadata = generateBlogMetadata;

export default async function Page() {
  const config = createBlogConfig();
  return renderMadeaBlogPage(config);
}
