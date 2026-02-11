import type {
  MadeaConfigWithSeo,
  ArticleViewProps,
  FileBrowserViewProps,
  NoRepoFoundViewProps,
  LandingViewProps,
  FileInfo,
} from "madea-blog-core";
import {
  generateMetadataForIndex,
  generateMetadataForArticle,
} from "madea-blog-core";
import { GitHubDataProvider } from "madea-blog-core/providers/github";
import Link from "next/link";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

const USERNAME = "jamierpond";
const REPO = "madea.blog";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ArticleView({ article, username, branch }: ArticleViewProps) {
  const { content, commitInfo, title, path } = article;
  const sourceUrl = `https://github.com/${username}/${REPO}/blob/${branch}/${path}`;

  return (
    <div className="min-h-screen bg-neutral-950 px-6 md:px-12 lg:px-24 py-16">
      <Link
        href="/blog"
        className="inline-block mb-10 text-sm font-mono text-neutral-500 hover:text-white transition-colors"
      >
        &larr; Back to posts
      </Link>

      <article className="max-w-3xl">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-neutral-500">
            <span>{formatDate(commitInfo.date)}</span>
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              View source
            </a>
          </div>
        </header>

        <div className="prose prose-invert prose-neutral max-w-none prose-headings:font-bold prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline prose-code:text-amber-300 prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800">
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content}
          </Markdown>
        </div>
      </article>
    </div>
  );
}

function FileBrowserView({ articles }: FileBrowserViewProps) {
  return (
    <div className="min-h-screen bg-neutral-950 px-6 md:px-12 lg:px-24 py-16">
      <div className="max-w-3xl">
        <h1 className="text-sm font-mono text-neutral-500 mb-10 tracking-widest uppercase">
          Blog
        </h1>

        <div className="space-y-1">
          {articles.map((article: FileInfo) => (
            <Link
              key={article.sha}
              href={`/blog/${article.path}`}
              className="group flex items-baseline justify-between gap-4 py-4 border-b border-neutral-900 hover:border-neutral-700 transition-colors"
            >
              <h2 className="text-lg font-semibold text-neutral-300 group-hover:text-white transition-colors">
                {article.title}
              </h2>
              <span className="text-sm font-mono text-neutral-600 shrink-0">
                {formatDate(article.commitInfo.date)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function NoRepoFoundView({ username }: NoRepoFoundViewProps) {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-2">No posts found</h1>
        <p className="text-neutral-500 font-mono text-sm">
          Could not load blog for {username}
        </p>
      </div>
    </div>
  );
}

function LandingView() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6">
      <h1 className="text-2xl font-bold text-white">Blog</h1>
    </div>
  );
}

const SEO_CONFIG = {
  baseUrl: "https://pond.audio",
  siteName: "Jamie Pond",
  defaultDescription:
    "Blog posts by Jamie Pond on audio software, AI music tools, and developer infrastructure.",
  authorName: "Jamie Pond",
  authorUrl: "https://pond.audio",
} as const;

export function createBlogConfig(): MadeaConfigWithSeo {
  const token = process.env.GITHUB_TOKEN || process.env.GITHUB_PAT || "";

  const dataProvider = new GitHubDataProvider({
    username: USERNAME,
    repo: REPO,
    token,
  });

  return {
    dataProvider,
    username: USERNAME,
    fileBrowserView: FileBrowserView,
    articleView: ArticleView,
    noRepoFoundView: NoRepoFoundView,
    landingView: LandingView,
    seo: SEO_CONFIG,
    basePath: "/blog",
  };
}

export async function generateBlogMetadata() {
  const config = createBlogConfig();
  return generateMetadataForIndex(config, {
    title: "Blog",
    description:
      "Blog posts by Jamie Pond on audio software, AI music tools, and developer infrastructure.",
  });
}

export async function generateArticlePageMetadata(slug: string[]) {
  const config = createBlogConfig();
  return generateMetadataForArticle(config, slug);
}

export async function generateBlogStaticParams() {
  try {
    const config = createBlogConfig();
    const articles = await config.dataProvider.getArticleList();
    return articles.map((article) => ({
      slug: article.path.split("/"),
    }));
  } catch {
    return [];
  }
}
