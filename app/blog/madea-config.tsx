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
    withoutTitle.split("\n\n").find((p) => p.trim() && !p.startsWith("#")) ||
    "";
  return paragraph
    .replace(/[#*_`\[\]]/g, "")
    .trim()
    .slice(0, 200);
}

const markdownComponents = {
  h1: ({ ...props }: React.ComponentProps<"h1">) => (
    <h1 className="text-2xl font-bold mt-0 mb-6 text-white" {...props} />
  ),
  h2: ({ ...props }: React.ComponentProps<"h2">) => (
    <h2 className="text-xl font-bold mt-10 mb-3 text-white" {...props} />
  ),
  h3: ({ ...props }: React.ComponentProps<"h3">) => (
    <h3 className="text-lg font-semibold mt-8 mb-2 text-white" {...props} />
  ),
  h4: ({ ...props }: React.ComponentProps<"h4">) => (
    <h4 className="font-semibold mt-6 mb-2 text-neutral-200" {...props} />
  ),
  p: ({ ...props }: React.ComponentProps<"p">) => (
    <p className="my-4 leading-relaxed text-neutral-300" {...props} />
  ),
  a: ({ ...props }: React.ComponentProps<"a">) => (
    <a
      className="text-sky-300 underline underline-offset-2 hover:text-sky-200"
      {...props}
    />
  ),
  code: ({ className, children, ...props }: React.ComponentProps<"code">) => (
    <code
      className={`${className || ""} bg-neutral-900 rounded-sm px-1 font-mono text-[0.9em]`}
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ ...props }: React.ComponentProps<"pre">) => (
    <pre
      className="bg-neutral-900 p-4 my-6 overflow-x-auto font-mono text-sm"
      {...props}
    />
  ),
  blockquote: ({ ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="border-l-2 border-neutral-700 pl-4 my-6 text-neutral-400"
      {...props}
    />
  ),
  ul: ({ ...props }: React.ComponentProps<"ul">) => (
    <ul className="list-disc pl-6 my-4 space-y-1 text-neutral-300" {...props} />
  ),
  ol: ({ ...props }: React.ComponentProps<"ol">) => (
    <ol
      className="list-decimal pl-6 my-4 space-y-1 text-neutral-300"
      {...props}
    />
  ),
  li: ({ ...props }: React.ComponentProps<"li">) => (
    <li className="leading-relaxed" {...props} />
  ),
  img: ({ ...props }: React.ComponentProps<"img">) => (
    <span className="block my-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="max-w-full h-auto" {...props} alt={props.alt || ""} />
    </span>
  ),
  table: ({ ...props }: React.ComponentProps<"table">) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse" {...props} />
    </div>
  ),
  thead: ({ ...props }: React.ComponentProps<"thead">) => (
    <thead className="" {...props} />
  ),
  tbody: ({ ...props }: React.ComponentProps<"tbody">) => (
    <tbody className="" {...props} />
  ),
  tr: ({ ...props }: React.ComponentProps<"tr">) => (
    <tr className="border-b border-neutral-800" {...props} />
  ),
  th: ({ ...props }: React.ComponentProps<"th">) => (
    <th
      className="px-3 py-2 text-left font-semibold text-neutral-200"
      {...props}
    />
  ),
  td: ({ ...props }: React.ComponentProps<"td">) => (
    <td className="px-3 py-2 text-neutral-300" {...props} />
  ),
  hr: ({ ...props }: React.ComponentProps<"hr">) => (
    <hr className="my-8 border-t border-neutral-800" {...props} />
  ),
  strong: ({ ...props }: React.ComponentProps<"strong">) => (
    <strong className="font-bold text-white" {...props} />
  ),
  em: ({ ...props }: React.ComponentProps<"em">) => (
    <em className="italic text-neutral-200" {...props} />
  ),
  sup: ({ ...props }: React.ComponentProps<"sup">) => (
    <sup className="text-xs align-super" {...props} />
  ),
  section: ({ className, ...props }: React.ComponentProps<"section">) => {
    if (className === "footnotes") {
      return (
        <section
          className="mt-10 pt-6 border-t border-neutral-800 text-sm"
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
    <main className="mx-auto max-w-2xl px-4 py-12">
      <p className="text-sm mb-8">
        <Link href="/blog" className="text-neutral-400 hover:underline">
          ← All posts
        </Link>
      </p>
      <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
      <p className="text-sm text-neutral-500 mb-8">
        {formatDate(commitInfo.date)} · {readingTime} min read ·{" "}
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          source
        </a>
      </p>
      <article>
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={markdownComponents}
        >
          {content}
        </Markdown>
      </article>
    </main>
  );
}

function FileBrowserView({ articles }: FileBrowserViewProps) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold text-white mb-2">Blog</h1>
      <p className="text-neutral-400 mb-8">
        Thoughts on audio software, AI music tools, and developer
        infrastructure.
      </p>
      <ul className="space-y-6">
        {articles.map((article: FileInfo) => {
          const desc = extractDescription(article.content);
          return (
            <li key={article.sha}>
              <Link
                href={`/blog/${article.path}`}
                className="text-sky-300 underline underline-offset-2 hover:text-sky-200"
              >
                {article.title}
              </Link>{" "}
              <span className="text-sm text-neutral-500">
                {formatDate(article.commitInfo.date)}
              </span>
              {desc && (
                <p className="text-neutral-400 mt-1 line-clamp-2">{desc}</p>
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}

function NoRepoFoundView({ username }: NoRepoFoundViewProps) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold text-white mb-2">No posts found</h1>
      <p className="text-neutral-500">Could not load blog for {username}</p>
    </main>
  );
}

function LandingView() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold text-white">Blog</h1>
    </main>
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
