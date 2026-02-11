import { notFound } from "next/navigation";
import {
  generateIndexMetadata,
  generateArticleMetadataFromSlug,
} from "./metadata.js";
/** Default notFound handler that uses Next.js notFound() */
function defaultNotFound() {
  notFound();
}
/**
 * Renders a RenderedView result to a React element.
 * Handles all view types internally so user code stays clean.
 *
 * @param result - The result from renderMadeaBlog
 * @param notFound - Optional custom notFound handler (defaults to throwing NotFoundError)
 * @returns The rendered view element
 */
export function renderPage(result, notFound = defaultNotFound) {
  switch (result.type) {
    case "article":
      return result.View(result.props);
    case "file-browser":
      return result.View(result.props);
    case "no-repo-found":
      return result.View(result.props);
    case "landing":
      return result.View(result.props);
    case "404":
      notFound();
  }
}
/**
 * All-in-one page renderer for Next.js dynamic routes.
 * Handles params resolution, path building, data fetching, and rendering.
 *
 * @param config - The blog configuration
 * @param params - Next.js params (sync or async)
 * @param options - Additional options
 * @returns The rendered page element
 *
 * @example
 * ```tsx
 * const CONFIG = createBlogConfig();
 *
 * export default async function Page({ params }: PageProps) {
 *   return renderMadeaBlogPage(CONFIG, params);
 * }
 * ```
 */
export async function renderMadeaBlogPage(config, params, options = {}) {
  const resolvedParams = params ? await params : { slug: undefined };
  const path = resolvedParams.slug?.join("/") || "/";
  const result = await renderMadeaBlog(config, path, {
    hasUsername: options.hasUsername ?? true,
  });
  return renderPage(result);
}
/**
 * The main server-side controller function.
 * Takes the full config and a path, handles the logic,
 * and returns the appropriate view with its props.
 *
 * @param config - The full configuration object
 * @param path - The URL path (e.g., '/' for index, 'article.md' for an article)
 * @param options - Additional options
 * @returns The view to render with its props
 */
export async function renderMadeaBlog(
  config,
  path,
  options = { hasUsername: true },
) {
  const {
    dataProvider,
    articleView,
    fileBrowserView,
    noRepoFoundView,
    landingView,
    username,
  } = config;
  // If no username (no subdomain), show landing page
  if (!options.hasUsername) {
    return {
      type: "landing",
      View: landingView,
      props: {},
    };
  }
  // Root path - show file browser (article list)
  if (path === "/" || path === "") {
    try {
      const [articles, sourceInfo] = await Promise.all([
        dataProvider.getArticleList(),
        dataProvider.getSourceInfo(),
      ]);
      return {
        type: "file-browser",
        View: fileBrowserView,
        props: {
          articles,
          sourceInfo,
          username,
        },
      };
    } catch {
      // Repo not found or error fetching
      return {
        type: "no-repo-found",
        View: noRepoFoundView,
        props: {
          username,
        },
      };
    }
  }
  // Article path - show individual article
  try {
    const [article, branch] = await Promise.all([
      dataProvider.getArticle(path),
      dataProvider.getDefaultBranch(),
    ]);
    if (article) {
      return {
        type: "article",
        View: articleView,
        props: {
          article,
          username,
          branch,
        },
      };
    }
    // Article not found
    return { type: "404" };
  } catch {
    return { type: "404" };
  }
}
/**
 * Generate metadata for an index/listing page using config.
 */
export function generateMetadataForIndex(config, params) {
  return generateIndexMetadata({
    seo: config.seo,
    path: config.basePath,
    title: params.title,
    description: params.description,
  });
}
/**
 * Generate metadata for an article page using config.
 * Fetches the article and returns metadata, or null if not found.
 */
export async function generateMetadataForArticle(config, slug) {
  return generateArticleMetadataFromSlug(config.dataProvider, slug, {
    seo: config.seo,
    path: config.basePath,
  });
}
//# sourceMappingURL=config.js.map
