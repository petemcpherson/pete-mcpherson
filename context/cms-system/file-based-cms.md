# File-Based CMS Spec for SvelteKit + mdsvex

---

## ⚠️ Questions to Answer Before Creating an Implementation Plan

Please fill in the answers below before handing this spec to Claude Code.

**Q1 — Language:** TypeScript or JavaScript?

> Answer:

**Q2 — Deployment target:** Vercel, Cloudflare Pages, Netlify, or other?

> Answer:

**Q3 — Design system:** Which UI/component library is this project using (e.g. Skeleton UI, shadcn-svelte, DaisyUI, plain Tailwind)?

> Answer:

**Q4 — Content structure:** What are the top-level content categories/sections for this project? List them and describe what they contain.

> Answer:

**Q5 — Project state:** Is this a fresh SvelteKit project, or does it already have existing routes, layouts, and components? If existing, describe what's already in place.

> Answer:

**Q6 — Site URL:** What is the production URL for this site? (Used for canonical tags, OG URLs, and sitemap.)

> Answer:

**Q7 — Blog prefix:** Should content URLs be prefixed (e.g. `/blog/category/post`) or live at the root (e.g. `/category/post`)?

> Answer:

---

## 1. Project Goal

Build a scalable, high-performance, SEO-friendly content system using
**SvelteKit + mdsvex**, where:

- All content is written in the IDE as Markdown `.md` files
- Content is stored in `src/content/` — no `.svx` files
- No database is required
- No authentication is required
- The site is statically prerendered
- The architecture scales to 250+ posts
- Deployment is simple: push → build → publish

---

## 2. Core Principles

1. **Content lives in the repo**
   - Markdown files inside `src/content/`
   - Git history acts as version control
2. **No runtime database**
   - No CMS backend
   - No API calls at runtime
3. **Build-time content loading**
   - Use `import.meta.glob` to discover all `.md` files
   - Generate all content routes at build time
4. **Full static prerendering**
   - Each content page becomes a static HTML file
   - Excellent performance and SEO compatibility
5. **Simple publishing workflow**
   - Write `.md`
   - Commit
   - Deploy

---

## 3. Folder Structure

Each post is a folder containing `index.md` and any images for that post — everything co-located.

```
src/
  content/
    [section-a]/
      post-one/
        index.md        ← the article
        featured.jpg    ← images live right here
        diagram.png
      sub-section/
        nested-post/
          index.md
          featured.jpg
    [section-b]/
      overview/
        index.md
        featured.jpg
  lib/
    content.ts          # or content.js
  routes/
    (content)/
      [...slug]/
        +page.svelte
        +page.server.ts  # or +page.server.js
        +layout.svelte
    (marketing)/
      +page.svelte
      about/
        +page.svelte

static/
  # No images/ folder — images live in src/content/ alongside posts
  # vite-plugin-static-copy serves them at /images/[section]/[post]/[file]
```

Replace `[section-a]` and `[section-b]` with the actual content categories for this project (see Q4 above).

---

## 4. URL Structure

### Hierarchical Content Paths

URLs mirror the `src/content/` folder structure, with `/index` stripped from slugs. Apply a prefix only if Q7 specifies one.

| Content File                                    | URL (no prefix)         | URL (with `/blog` prefix)    |
| ----------------------------------------------- | ----------------------- | ---------------------------- |
| `src/content/section-a/post-one/index.md`       | `/section-a/post-one`   | `/blog/section-a/post-one`   |
| `src/content/section-a/sub/nested/index.md`     | `/section-a/sub/nested` | `/blog/section-a/sub/nested` |

No trailing slashes on canonical URLs.

### Route Groups

SvelteKit route groups (parentheses) separate layouts without affecting URLs:

- `(content)` — catch-all `[...slug]` route for all content pages (article layout)
- `(marketing)` — homepage, about, content index, tag pages, etc. (site layout)

---

## 5. Markdown Format

Each post is a `.md` file with YAML frontmatter. mdsvex processes it at build time — no `.svx` extension needed.

### Example Post

```md
---
title: Post Title Here
date: 2026-01-15
description: A one-sentence summary for SEO and post listings.
tags: [tag-one, tag-two]
published: true
featuredImage: /images/section-a/post-one/featured.webp
featuredImageAlt: Descriptive alt text for the featured image
---

# Post Title Here

Content written in Markdown.
```

---

## 6. Required Metadata Fields

| Field            | Required | Purpose                          |
| ---------------- | -------- | -------------------------------- |
| title            | yes      | Page title + H1                  |
| date             | yes      | Sorting + display                |
| description      | yes      | Meta description + OG            |
| tags             | optional | Tag pages + filtering            |
| published        | optional | Draft control                    |
| featuredImage    | optional | OG image + post listings         |
| featuredImageAlt | optional | Accessibility for featured image |

Default behavior:

- `published: false` hides the post in production
- Missing `published` field = treated as unpublished
- `date` format: `YYYY-MM-DD`
- Tags are normalized to lowercase and hyphenated (e.g., `My Tag` → `my-tag`)
- Use the frontmatter `title` as the rendered H1

---

## 7. TypeScript vs JavaScript Notes

> Applies based on Q1 answer.

**If TypeScript:** Create `src/lib/types.ts` with `PostMetadata` and `Post` interfaces. Create `src/mdsvex.d.ts` to type `.md` module imports. Use `.ts` extensions for all server files.

**If JavaScript:** Skip `types.ts` and `mdsvex.d.ts`. Use `.js` extensions for all server files. JSDoc comments are optional but welcome.

### TypeScript interfaces (if applicable)

```ts
export interface PostMetadata {
  title: string
  date: string
  description: string
  tags?: string[]
  published?: boolean
  featuredImage?: string
  featuredImageAlt?: string
}

export interface Post {
  slug: string
  metadata: PostMetadata
  content: ConstructorOfATypedSvelteComponent
}
```

---

## 8. Content Loading Strategy

Use `import.meta.glob` to load all `.md` files at build time.

### Slug Generation

Slugs derive from the file path relative to `src/content/`, with `/index` stripped:

| File Path                                     | Slug                   |
| --------------------------------------------- | ---------------------- |
| `src/content/section-a/post/index.md`         | `section-a/post`       |
| `src/content/section-a/sub/nested/index.md`   | `section-a/sub/nested` |

Stripping logic: after removing the `src/content/` prefix and `.md` extension, replace any trailing `/index` with an empty string.

If Q7 specifies a URL prefix (e.g. `/blog`), prepend it to slugs only in link generation — not in content file paths.

### Core functions in `src/lib/content.ts` (or `.js`)

- `getAllPosts()` — returns all published posts with metadata, sorted by date descending
- `getPostBySlug(slug)` — returns single post by slug (component + metadata)
- `getAllTags()` — returns all unique tags across published posts
- `getPostsByTag(tag)` — returns published posts matching a tag

Draft mode: show unpublished posts only when `NODE_ENV === 'development'`.

---

## 9. Routing Architecture

### Catch-All Route

Route: `src/routes/(content)/[...slug]/`

Handles all content pages at any depth. Responsibilities:

- Parse slug from URL params
- Call `getPostBySlug(slug)` to load content
- Inject metadata into `<svelte:head>`
- Render the compiled Svelte component inside an `<article>`
- Export `entries()` for static prerendering of all slugs
- Return 404 (via SvelteKit `error()`) when no matching content is found

### Blog Layout

`src/routes/(content)/+layout.svelte` provides article-specific styling separate from the marketing layout.

### Marketing Pages

`src/routes/(marketing)/` contains:

- `+page.svelte` — homepage (`/`)
- `about/+page.svelte` — about page (`/about`)
- `blog/+page.svelte` + `+page.server.ts` — content index listing all posts
- `tags/+page.svelte` — all tags overview
- `tags/[tag]/+page.svelte` + `+page.server.ts` — posts filtered by tag

---

## 10. Prerender Strategy

All content and tag pages must be statically generated.

```ts
// In catch-all route
export const prerender = true

export async function entries() {
  const posts = await getAllPosts()
  return posts.map(post => ({ slug: post.slug.split('/') }))
}
```

---

## 11. SEO Requirements

Each content page must set:

- `<title>` — post title
- `<meta name="description">` — post description
- `<meta property="og:title">`
- `<meta property="og:description">`
- `<meta property="og:image">` — from `featuredImage`
- `<meta property="og:url">` — canonical URL from `SITE_URL` env var
- `<meta name="twitter:card">` — `summary_large_image`
- `<link rel="canonical">` — absolute URL

Create a reusable `src/lib/components/SEO.svelte` component that accepts title, description, image, and url props.

---

## 12. Image System

### Co-location

Images live **in the same folder as the post** — no separate `static/images/` tree to maintain.

```
src/content/
  section-a/
    post-one/
      index.md          ← article
      featured.jpg      ← drop images right here
      diagram.png
      screenshot.gif
```

Any image format works: jpg, jpeg, png, gif, webp, svg, avif.

### How images get served

`vite-plugin-static-copy` (already installed) copies all image files from `src/content/` to the build output at `/images/[section]/[post]/[filename]`. This runs at build time in production and is handled by Vite's dev server in development. No manual file copying needed.

Install: `bun add -D vite-plugin-static-copy`

Configure in `vite.config.ts` (or `.js`):

```ts
import { viteStaticCopy } from 'vite-plugin-static-copy'

viteStaticCopy({
  targets: [
    {
      src: 'src/content/**/*.{jpg,jpeg,png,gif,webp,svg,avif}',
      dest: 'images'
    }
  ]
})
```

### Guidelines

- Featured images: 1200×630px (OG image compatible)
- In-content images: max 1600px width
- Always include alt text
- No optimization is built in — keep file sizes reasonable before committing

### Referencing in Markdown

Images are referenced as absolute `/images/...` paths (matching where vite-plugin-static-copy outputs them):

```md
<!-- In frontmatter -->
featuredImage: /images/section-a/post-one/featured.jpg

<!-- Inline in content -->
![Alt text](/images/section-a/post-one/diagram.png)
```

### CDN

Cloudflare Pages and Vercel automatically CDN-serve all static assets — no extra configuration needed.

---

## 13. Deployment Configuration

### Adapter (based on Q2)

**Cloudflare Pages:**

```bash
bun add -D @sveltejs/adapter-cloudflare
```

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-cloudflare';
```

**Vercel:**

```bash
bun add -D @sveltejs/adapter-vercel
```

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-vercel';
```

**Static (universal):**

```bash
bun add -D @sveltejs/adapter-static
```

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-static';
export default { kit: { adapter: adapter() } };
```

### Environment Variables

Create `.env.example`:

```
SITE_URL=https://yourdomain.com
```

Use `SITE_URL` for canonical tags and sitemap absolute URLs. Never hardcode the domain.

---

## 14. RSS Feed

Route: `src/routes/rss.xml/+server.ts` (or `.js`)

- Valid RSS 2.0 XML
- All published posts included
- `title`, `link`, `description`, `pubDate` per item
- Set `Content-Type: application/xml` header
- Export `prerender = true`

---

## 15. Sitemap

Route: `src/routes/sitemap.xml/+server.ts` (or `.js`)

- Include all published content pages
- Include marketing pages (`/`, `/about`, `/blog`)
- Include all tag pages
- `lastmod` from post date where available
- Export `prerender = true`

---

## 16. Code Syntax Highlighting

Use Shiki via mdsvex's `highlight` option in `svelte.config.js`.

```js
import { createHighlighter } from 'shiki'

const highlighter = await createHighlighter({ themes: ['github-dark'], langs: [...] })

mdsvex({
  highlight: {
    highlighter: async (code, lang) => { ... }
  }
})
```

Choose a Shiki theme that matches the project's design system.

---

## 17. Implementation Phases

Work through these phases in order. Each phase can be committed and tested independently.

### Progress Checklist

- [ ] Phase 1: mdsvex Configuration for `.md` files
- [ ] Phase 2: Types & Content Structure
- [ ] Phase 3: Sample/Dummy Test Content
- [ ] Phase 4: Design System Alignment
- [ ] Phase 5: Content Loading Utilities
- [ ] Phase 6: Content Catch-All Route
- [ ] Phase 7: Content Layout & Article Styling
- [ ] Phase 8: SEO Component & Meta Tags
- [ ] Phase 9: Marketing Route Group & Pages
- [ ] Phase 10: Content Index Page
- [ ] Phase 11: Tag System
- [ ] Phase 12: RSS Feed
- [ ] Phase 13: Sitemap
- [ ] Phase 14: Code Syntax Highlighting
- [ ] Phase 15: Adapter & Environment Config
- [ ] Phase 16: Final Polish & Production Readiness

---

### Phase 1: mdsvex Configuration

**Goal:** Configure mdsvex to process `.md` files.

- Update `svelte.config.js` to list `.md` in `extensions`
- Configure mdsvex options (smartypants: true)
- If TypeScript: create `src/mdsvex.d.ts` with module declaration

**Acceptance criteria:**

- `.md` files in `src/content/` compile without error
- Frontmatter is extractable
- Build and type check pass

---

### Phase 2: Types & Content Structure

**Goal:** Define types (if TS) and create the content folder structure.

- If TypeScript: create `src/lib/types.ts` with `PostMetadata` and `Post`
- Create `src/content/` folder with subdirectories matching Q4

**Acceptance criteria:**

- Type check passes with 0 errors (TS only)
- Content directories exist and match planned URL hierarchy

---

### Phase 3: Sample/Dummy Test Content

**Goal:** Create 3–5 dummy `.md` posts to validate the system throughout development.

- Span multiple sections and nesting levels
- Include at least one draft post (`published: false`)
- Include variety: tags, featured images, plain posts
- Include various Markdown elements (headings, lists, code, tables, images)
- Create each post as a folder with `index.md` (e.g. `src/content/section/post-name/index.md`)
- Place placeholder images alongside `index.md` in the same folder

**Acceptance criteria:**

- 3+ posts exist with valid frontmatter
- At least one post is unpublished
- Build passes, type check passes

---

### Phase 4: Design System Alignment

**Goal:** Ensure the content system integrates with the project's existing design system (see Q3 and Q5).

- If fresh project: install and configure the design system chosen in Q3
- If existing project: identify existing layout, color tokens, typography classes, and component patterns to reuse
- Create or confirm these components exist: `PostCard.svelte`, `Tag.svelte`
- Ensure `Header.svelte` and `Footer.svelte` exist (create if needed)
- Set up typography/prose styles for markdown article content

**Acceptance criteria:**

- PostCard and Tag components exist and are styled
- Header and Footer present in root layout
- Prose/article typography styles defined

---

### Phase 5: Content Loading Utilities

**Goal:** Build `src/lib/content.ts` (or `.js`) with all content loading functions.

- `getAllPosts()` — sorted by date, filters unpublished in production
- `getPostBySlug(slug)` — loads component + metadata for a slug
- `getAllTags()` — unique normalized tags
- `getPostsByTag(tag)` — filtered list

**Acceptance criteria:**

- Slugs match file paths per Section 8
- Draft posts hidden in production
- All functions importable with no errors

---

### Phase 6: Content Catch-All Route

**Goal:** Create `src/routes/(content)/[...slug]/` to render any content post.

- `+page.server.ts` (or `.js`): `load()` fetches post by slug, returns 404 on miss
- `+page.svelte`: renders compiled component inside `<article>`
- `entries()` function enables static prerendering
- `export const prerender = true`

**Acceptance criteria:**

- Posts load at their expected URLs
- Nonexistent slugs show a proper 404
- `bun run build` prerenders all posts

---

### Phase 7: Content Layout & Article Styling

**Goal:** Create `src/routes/(content)/+layout.svelte` for article pages.

- Semantic `<article>` structure
- Display post title, date, tags from metadata
- Apply prose/typography classes for markdown content
- Matches design system from Phase 4

**Acceptance criteria:**

- Article pages render readable, styled content
- Headings, lists, code blocks, links all styled correctly

---

### Phase 8: SEO Component & Meta Tags

**Goal:** Comprehensive SEO on every content page.

- Create `src/lib/components/SEO.svelte`
- Props: title, description, image, url
- Outputs: `<title>`, description meta, OG tags, Twitter card, canonical link
- Uses `SITE_URL` env var for absolute URLs
- Include SEO component in `(content)/[...slug]/+page.svelte`

**Acceptance criteria:**

- Each post has unique title/description in `<head>`
- OG image tag populated from `featuredImage`
- Canonical URL correct per `SITE_URL`

---

### Phase 9: Marketing Route Group & Pages

**Goal:** Create marketing pages with their own layout.

- `src/routes/(marketing)/+layout.svelte` — wraps all marketing pages
- `+page.svelte` — homepage at `/`
- `about/+page.svelte` — about page at `/about`
- Homepage should feature recent posts using `getAllPosts()`

**Acceptance criteria:**

- `/` and `/about` render with marketing layout
- Marketing layout is distinct from article layout
- Navigation links work between marketing and content pages

---

### Phase 10: Content Index Page

**Goal:** A listing page showing all published posts.

- `src/routes/(marketing)/blog/+page.server.ts` — loads all posts
- `src/routes/(marketing)/blog/+page.svelte` — displays PostCard grid
- Sorted newest first
- Adjust route if Q7 specifies a URL prefix

**Acceptance criteria:**

- Content index shows all published posts
- Each card links to the correct post URL
- Draft posts not shown in production

---

### Phase 11: Tag System

**Goal:** Tag-based filtering and navigation.

- `/tags` — list of all tags
- `/tags/[tag]` — posts filtered by tag
- Tag pages are prerendered
- Tag pills on post cards and article pages link to tag pages

**Files:**

- `src/routes/(marketing)/tags/+page.svelte` + `+page.server.ts`
- `src/routes/(marketing)/tags/[tag]/+page.svelte` + `+page.server.ts`

**Acceptance criteria:**

- All tags discoverable at `/tags`
- Tag filter pages show correct posts
- Tags normalized (lowercase, hyphenated)

---

### Phase 12: RSS Feed

**Goal:** Static RSS feed at `/rss.xml`.

- Valid RSS 2.0
- All published posts
- Prerendered

**Acceptance criteria:**

- `/rss.xml` returns valid RSS
- Validates with an RSS validator

---

### Phase 13: Sitemap

**Goal:** Static sitemap at `/sitemap.xml`.

- All content pages, marketing pages, and tag pages
- Absolute URLs using `SITE_URL`
- Prerendered

**Acceptance criteria:**

- `/sitemap.xml` returns valid XML
- All public URLs present

---

### Phase 14: Code Syntax Highlighting

**Goal:** Syntax-highlighted code blocks in Markdown.

- Install and configure Shiki
- Integrate via mdsvex's `highlight` option in `svelte.config.js`
- Choose theme matching design system

**Acceptance criteria:**

- Code blocks render with syntax highlighting
- At least JS, TS, and Bash supported

---

### Phase 15: Adapter & Environment Config

**Goal:** Configure for production static deployment.

- Install and configure appropriate adapter (per Q2)
- Set up `SITE_URL` env var handling
- Configure prerender error handling
- Create `.env.example`

**Acceptance criteria:**

- `bun run build` produces a deployable output
- All routes prerendered
- Draft posts visible in dev, hidden in production

---

### Phase 16: Final Polish & Production Readiness

**Goal:** End-to-end testing and cleanup.

- Verify all links work
- Check SEO tags render correctly
- Run Lighthouse audit (target: 90+ performance)
- Confirm responsive layout on mobile/tablet/desktop
- Fix any TypeScript/lint errors
- Replace dummy content with real content or keep for demo

**Acceptance criteria:**

- Site fully functional, all links valid
- Lighthouse 90+ performance
- Clean build with 0 type/lint errors

---

## 18. Dependency Graph

```
Phase 1 (mdsvex config)
    ↓
Phase 2 (Types & structure)
    ↓
Phase 3 (Dummy content) ──────────────────────────────┐
    ↓                                                 │
Phase 4 (Design system) ──────────────────────────────┤
    ↓                                                 │
Phase 5 (Content loading) ────────────────────────────┤
    ↓                                                 │
Phase 6 (Catch-all route) ←───────────────────────────┤
    ↓                                                 │
Phase 7 (Content layout) ← uses design system         │
    ↓                                                 │
Phase 8 (SEO component)                               │
    ↓                                                 │
Phase 9 (Marketing pages) ← uses design system        │
    ↓                                                 │
Phase 10 (Content index) ←────────────────────────────┤
    ↓                                                 │
Phase 11 (Tag system) ←───────────────────────────────┤
    ↓                                                 │
Phase 12 (RSS feed) ←─────────────────────────────────┤
    ↓                                                 │
Phase 13 (Sitemap) ←──────────────────────────────────┘
    ↓
Phase 14 (Syntax highlighting)
    ↓
Phase 15 (Adapter & env config)
    ↓
Phase 16 (Final polish)
```

---

## 19. Non-Goals

This system does NOT aim to support:

- Multi-author editing
- Web-based admin UI
- WYSIWYG content editor
- Live publishing without a deploy
- User comments (use a third-party tool if needed)
- Flat URL structure (hierarchical only)

---

## 20. Why This Architecture

| File-Based CMS           | Database-Backed CMS     |
| ------------------------ | ----------------------- |
| Zero runtime cost        | Requires DB             |
| Zero auth system         | Requires auth           |
| Version control built-in | Manual versioning       |
| Simpler mental model     | More moving parts       |
| Faster page loads        | Data fetched at runtime |
| Hierarchical URLs free   | Requires custom routing |

Ideal for: solo developers, technical blogs, content sites, high-SEO requirements, low operational overhead.

---

End of specification.
