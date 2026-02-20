import { renderMadeaBlogPage } from "madea-blog-core";
import {
  createBlogConfig,
  generateArticlePageMetadata,
  generateBlogStaticParams,
} from "../madea-config";

export const revalidate = 600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return generateBlogStaticParams();
}

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return generateArticlePageMetadata(slug);
}

export default async function Page({ params }: PageProps) {
  const config = createBlogConfig();
  return renderMadeaBlogPage(config, params);
}
