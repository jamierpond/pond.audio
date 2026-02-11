import type {
  DataProvider,
  ArticleViewProps,
  FileBrowserViewProps,
  NoRepoFoundViewProps,
  LandingViewProps,
} from "./data-provider.js";
import type { SeoConfig, MadeaMetadata } from "./metadata.js";
/**
 * A generic type for view components being injected.
 * The component receives props P and returns a renderable element.
 * Since the core must be SSR-only and decoupled from React,
 * we use a generic function signature that returns unknown.
 * The actual React types are enforced in the consumer app.
 */
export type MadeaView<P> = (props: P) => any;
/**
 * Configuration object for the madea-blog system.
 * This is the central configuration that provides both
 * the data provider instance and the user-defined view components.
 */
export interface Config {
  /** The data provider instance (GitHub, LocalFs, or custom) */
  dataProvider: DataProvider;
  /** The username/identifier for the blog owner */
  username: string;
  /** Component to render the file browser / article list */
  fileBrowserView: MadeaView<FileBrowserViewProps>;
  /** Component to render an individual article */
  articleView: MadeaView<ArticleViewProps>;
  /** Component to render when no repo is found */
  noRepoFoundView: MadeaView<NoRepoFoundViewProps>;
  /** Component to render the landing page (no subdomain) */
  landingView: MadeaView<LandingViewProps>;
  /** SEO configuration for metadata generation */
  seo?: SeoConfig;
  /** Base path for this content (e.g., '/blog' or '/docs') */
  basePath?: string;
}
/**
 * Result of the renderMadeaBlog controller function.
 * This is a discriminated union that tells the caller
 * which view to render and with what props.
 */
export type RenderedView =
  | {
      type: "article";
      View: MadeaView<ArticleViewProps>;
      props: ArticleViewProps;
    }
  | {
      type: "file-browser";
      View: MadeaView<FileBrowserViewProps>;
      props: FileBrowserViewProps;
    }
  | {
      type: "no-repo-found";
      View: MadeaView<NoRepoFoundViewProps>;
      props: NoRepoFoundViewProps;
    }
  | {
      type: "landing";
      View: MadeaView<LandingViewProps>;
      props: LandingViewProps;
    }
  | {
      type: "404";
    };
/**
 * Renders a RenderedView result to a React element.
 * Handles all view types internally so user code stays clean.
 *
 * @param result - The result from renderMadeaBlog
 * @param notFound - Optional custom notFound handler (defaults to throwing NotFoundError)
 * @returns The rendered view element
 */
export declare function renderPage(
  result: RenderedView,
  notFound?: () => never,
): ReturnType<MadeaView<unknown>>;
/** Params shape for Next.js dynamic routes */
type SlugParams =
  | {
      slug?: string[];
    }
  | Promise<{
      slug?: string[];
    }>;
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
export declare function renderMadeaBlogPage(
  config: Config,
  params?: SlugParams,
  options?: {
    hasUsername?: boolean;
  },
): Promise<ReturnType<MadeaView<unknown>>>;
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
export declare function renderMadeaBlog(
  config: Config,
  path: string,
  options?: {
    hasUsername: boolean;
  },
): Promise<RenderedView>;
/**
 * Config with required SEO fields for metadata generation
 */
export type MadeaConfigWithSeo = Config & {
  seo: SeoConfig;
  basePath: string;
};
export interface IndexMetadataParams {
  title: string;
  description: string;
}
/**
 * Generate metadata for an index/listing page using config.
 */
export declare function generateMetadataForIndex(
  config: MadeaConfigWithSeo,
  params: IndexMetadataParams,
): MadeaMetadata;
/**
 * Generate metadata for an article page using config.
 * Fetches the article and returns metadata, or null if not found.
 */
export declare function generateMetadataForArticle(
  config: MadeaConfigWithSeo,
  slug: string[],
): Promise<MadeaMetadata | null>;
export {};
//# sourceMappingURL=config.d.ts.map
