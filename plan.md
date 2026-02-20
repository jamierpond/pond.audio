# Plan: Add madea.blog to /blog using madea-blog-core

## Context

- pond.audio is a standalone Next.js app (app router, no pnpm workspace yet)
- `madea-blog-core/` is a monorepo already sitting in the project root (untracked)
- We need to make `madea-blog-core/packages/madea-blog-core` available as a workspace dependency
- The blog should live at `/blog` and `/blog/[...slug]` in the pond.audio app
- Content comes from GitHub: `jamierpond/madea.blog`

## Steps

### 1. Create `pnpm-workspace.yaml` at pond.audio root

```yaml
packages:
  - "madea-blog-core/packages/*"
```

This brings `madea-blog-core` (the package) into the workspace without treating the whole monorepo as one. The root pond.audio app becomes the workspace root.

### 2. Add `madea-blog-core` as a workspace dependency in `package.json`

Add to dependencies:

```json
"madea-blog-core": "workspace:*",
"react-markdown": "^10.1.0",
"rehype-highlight": "^7.0.2",
"remark-gfm": "^4.0.1"
```

These are the markdown rendering deps used by the blog views (matching blog.pond.audio consumer).

### 3. Update `next.config.js` to transpile madea-blog-core

Add `transpilePackages: ['madea-blog-core']` so Next.js can compile the workspace package.

### 4. Create `app/blog/lib/madea-config.tsx`

Adapted from `madea-blog-core/apps/blog.pond.audio/app/lib/madea-config.tsx`:

- Use `GitHubDataProvider` with `username: 'jamierpond'`, `repo: 'madea.blog'`
- Set `basePath: '/blog'`
- Set SEO config with `baseUrl: 'https://pond.audio'`
- The views (ArticleView, FileBrowserView, etc.) will be adapted from the blog.pond.audio app, with links adjusted to use `/blog/` prefix

### 5. Replace `app/blog/page.tsx` (index)

Use `renderMadeaBlogPage(CONFIG)` — same pattern as blog.pond.audio.

### 6. Create `app/blog/[...slug]/page.tsx` (article pages)

Use `renderMadeaBlogPage(CONFIG, params)` — same pattern as blog.pond.audio.

### 7. Remove `app/blog/hello/page.tsx`

This placeholder is no longer needed.

### 8. Build madea-blog-core and install

- Run `pnpm install` (workspace linking)
- Build `madea-blog-core` (`pnpm --filter madea-blog-core build`)
- Verify `pnpm dev` works
