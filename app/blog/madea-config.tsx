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

function extractDescription(content: string): string {
  const withoutTitle = content.replace(/^#[^\n]*\n/, "");
  const paragraph =
    withoutTitle
      .split("\n\n")
      .find((p) => p.trim() && !p.startsWith("#")) || "";
  return paragraph.replace(/[#*_`\[\]]/g, "").trim().slice(0, 200);
}

function Texture() {
  return (
    <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 texture-bg" />
  );
}

const markdownComponents = {
  h1: ({ ...props }: React.ComponentProps<"h1">) => (
    <h1
      className="text-3xl font-bold mt-0 mb-6 text-white first:mt-0"
      {...props}
    />
  ),
  h2: ({ ...props }: React.ComponentProps<"h2">) => (
    <h2
      className="text-2xl font-bold mt-12 mb-4 pb-3 text-white border-b border-neutral-800/50"
      {...props}
    />
  ),
  h3: ({ ...props }: React.ComponentProps<"h3">) => (
    <h3 className="text-xl font-semibold mt-8 mb-3 text-white" {...props} />
  ),
  h4: ({ ...props }: React.ComponentProps<"h4">) => (
    <h4 className="text-lg font-medium mt-6 mb-2 text-neutral-200" {...props} />
  ),
  p: ({ ...props }: React.ComponentProps<"p">) => (
    <p
      className="text-base sm:text-lg my-5 leading-relaxed text-neutral-300"
      {...props}
    />
  ),
  a: ({ ...props }: React.ComponentProps<"a">) => (
    <a
      className="text-amber-400 hover:text-amber-300 underline decoration-amber-400/30 hover:decoration-amber-300 underline-offset-2 transition-all"
      {...props}
    />
  ),
  code: ({ className, children, ...props }: React.ComponentProps<"code">) => (
    <code
      className={`${className || ""} bg-amber-950/40 text-amber-300 rounded-md px-1.5 py-0.5 font-mono text-[0.85em] border border-amber-900/20`}
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ ...props }: React.ComponentProps<"pre">) => (
    <pre
      className="bg-neutral-900/80 rounded-2xl p-6 my-8 overflow-x-auto font-mono text-sm border border-neutral-800/50 shadow-lg shadow-black/20"
      {...props}
    />
  ),
  blockquote: ({ ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="border-l-4 border-amber-500/70 bg-amber-950/20 pl-6 py-4 pr-4 my-8 text-neutral-300 italic rounded-r-xl"
      {...props}
    />
  ),
  ul: ({ ...props }: React.ComponentProps<"ul">) => (
    <ul
      className="list-disc pl-6 my-6 space-y-2 text-neutral-300 marker:text-amber-500/70"
      {...props}
    />
  ),
  ol: ({ ...props }: React.ComponentProps<"ol">) => (
    <ol
      className="list-decimal pl-6 my-6 space-y-2 text-neutral-300 marker:text-amber-500/70"
      {...props}
    />
  ),
  li: ({ ...props }: React.ComponentProps<"li">) => (
    <li className="text-base sm:text-lg leading-relaxed pl-1" {...props} />
  ),
  img: ({ ...props }: React.ComponentProps<"img">) => (
    <span className="flex justify-center my-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="max-w-full h-auto rounded-2xl shadow-2xl shadow-black/30 border border-neutral-800"
        {...props}
        alt={props.alt || ""}
      />
    </span>
  ),
  table: ({ ...props }: React.ComponentProps<"table">) => (
    <div className="overflow-x-auto my-10 rounded-2xl border border-neutral-800 shadow-lg shadow-black/20">
      <table className="min-w-full divide-y divide-neutral-800" {...props} />
    </div>
  ),
  thead: ({ ...props }: React.ComponentProps<"thead">) => (
    <thead className="bg-neutral-900/80" {...props} />
  ),
  tbody: ({ ...props }: React.ComponentProps<"tbody">) => (
    <tbody
      className="divide-y divide-neutral-800/50 bg-neutral-950/50"
      {...props}
    />
  ),
  tr: ({ ...props }: React.ComponentProps<"tr">) => (
    <tr className="hover:bg-neutral-900/50 transition-colors" {...props} />
  ),
  th: ({ ...props }: React.ComponentProps<"th">) => (
    <th
      className="px-6 py-4 text-left text-xs font-semibold text-neutral-300 uppercase tracking-wider"
      {...props}
    />
  ),
  td: ({ ...props }: React.ComponentProps<"td">) => (
    <td className="px-6 py-4 text-base text-neutral-300" {...props} />
  ),
  hr: ({ ...props }: React.ComponentProps<"hr">) => (
    <hr className="my-12 border-t border-neutral-800/50" {...props} />
  ),
  strong: ({ ...props }: React.ComponentProps<"strong">) => (
    <strong className="font-bold text-white" {...props} />
  ),
  em: ({ ...props }: React.ComponentProps<"em">) => (
    <em className="italic text-neutral-200" {...props} />
  ),
  sup: ({ ...props }: React.ComponentProps<"sup">) => (
    <sup className="text-sm text-amber-400 font-bold align-super" {...props} />
  ),
  section: ({ className, ...props }: React.ComponentProps<"section">) => {
    if (className === "footnotes") {
      return (
        <section
          className="mt-12 pt-8 border-t border-neutral-800/50"
          {...props}
        >
          {props.children}
        </section>
      );
    }
    return <section className={className} {...props} />;
  },
};

function ArticleView({ article, username, branch }: ArticleViewProps) {
  const { content, commitInfo, title, path } = article;
  const sourceUrl = `https://github.com/${username}/${REPO}/blob/${branch}/${path}`;
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="relative min-h-screen">
      <Texture />
      <div className="relative z-10">
        {/* Article hero */}
        <div className="px-6 md:px-12 lg:px-24 pt-12 pb-10 border-b border-neutral-900">
          <div className="max-w-3xl">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 mb-8 text-sm font-mono text-neutral-500 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              All posts
            </Link>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-mono px-3 py-1 bg-gradient-to-r from-amber-900/50 to-orange-900/50 text-amber-300 border border-amber-800/50">
                {formatDate(commitInfo.date)}
              </span>
              <span className="text-[10px] font-mono px-3 py-1 bg-neutral-900 text-neutral-400 border border-neutral-800">
                {readingTime} min read
              </span>
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[10px] font-mono px-3 py-1 bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white hover:border-neutral-700 transition-all"
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                Source
              </a>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="px-6 md:px-12 lg:px-24 py-12">
          <article className="max-w-3xl">
            <div className="prose prose-lg prose-invert max-w-none">
              <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={markdownComponents}
              >
                {content}
              </Markdown>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

function FileBrowserView({ articles }: FileBrowserViewProps) {
  return (
    <div className="relative min-h-screen">
      <Texture />
      <div className="relative z-10 px-6 md:px-12 lg:px-24 py-16">
        <div className="max-w-4xl">
          <h1 className="text-sm font-mono text-neutral-500 mb-3 tracking-widest uppercase">
            Blog
          </h1>
          <p className="text-neutral-400 mb-10 max-w-xl leading-relaxed">
            Thoughts on audio software, AI music tools, and developer
            infrastructure.
          </p>

          <div className="grid gap-5">
            {articles.map((article: FileInfo) => {
              const desc = extractDescription(article.content);
              return (
                <Link
                  key={article.sha}
                  href={`/blog/${article.path}`}
                  className="group block p-6 sm:p-8 bg-neutral-900/30 border border-neutral-800 rounded-2xl hover:bg-neutral-900 hover:border-neutral-700 transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-200 group-hover:text-white transition-colors">
                      {article.title}
                    </h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-neutral-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </div>
                  {desc && (
                    <p className="text-neutral-500 leading-relaxed mb-4 line-clamp-2">
                      {desc}
                    </p>
                  )}
                  <span className="text-[10px] font-mono px-3 py-1 bg-gradient-to-r from-amber-900/50 to-orange-900/50 text-amber-300 border border-amber-800/50">
                    {formatDate(article.commitInfo.date)}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function NoRepoFoundView({ username }: NoRepoFoundViewProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      <Texture />
      <div className="relative z-10 text-center">
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
    <div className="relative min-h-screen flex items-center justify-center px-6">
      <Texture />
      <div className="relative z-10">
        <h1 className="text-2xl font-bold text-white">Blog</h1>
      </div>
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
