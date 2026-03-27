# File-Based CMS Spec for SvelteKit + mdsvex (Current Implementation)

This document reflects the CMS behavior currently implemented in this repo, with file-based markdown posts as a first-class content source.

---

## 1. Scope

This spec covers:

- file-based markdown content in `src/content/`
- the mdsvex/preprocessor setup used to compile and style markdown
- blog listing/detail behavior for file posts
- SEO/sitemap/image behavior for file posts

This repo also contains Firestore-backed posts and an admin UI. That database layer is optional for projects that only need file-based content.

---

## 2. Core Model

### Content source

- Markdown files live at `src/content/**/index.md`
- Slug is derived from folder path relative to `src/content/`
- Example: `src/content/nas/index.md` -> slug `nas` -> URL `/blog/nas`

### Publish behavior

- Development: all file posts are visible (including drafts)
- Production: only posts where `published: true` are visible
- Missing `published` is treated as not published in production

---

## 3. Frontmatter Schema

### Required

- `title: string`
- `date: YYYY-MM-DD`
- `description: string`

### Optional

- `updated: YYYY-MM-DD` (last meaningful revision date)
- `tags: string[]`
- `published: boolean`
- `featuredImage: string` (typically `/images/...`)
- `featuredImageAlt: string`

### Date semantics

- `date` = original publish date
- `updated` = most recent substantive revision date
- display + SEO + sitemap use `updated ?? date` when available

### Example

```md
---
title: Network Attached Storage (NAS), explained in 100 seconds.
date: 2026-03-19
updated: 2026-03-19
description: Beginner-friendly NAS overview and practical setup options.
tags: [tech]
published: true
featuredImage: /images/nas/what_is_a_nas_2.png
featuredImageAlt: What is network attached storage?
---

# Heading

Post body...
```

---

## 4. Markdown Processing

Configured in `svelte.config.js`:

- `extensions: ['.svelte', '.md']`
- mdsvex enabled for `.md`
- `smartypants: true`
- `rehype-external-links` adds `target="_blank"` and `rel="noopener noreferrer"` for external links

### Callout directive support

Custom preprocessor (`calloutPreprocessor`) runs before mdsvex and converts this syntax:

```md
:::callout
Primary callout text.
:::

:::warning
Warning callout text.
:::
```

Supported variants:

- `callout`/`primary`
- `secondary`
- `accent`
- `info`
- `success`
- `warning`
- `error`

Generated classes:

- color pair: `bg-* text-*-content` (based on variant)
- shared utility classes: `p-2 md:p-4 rounded-lg my-4 not-prose`

Tailwind safelisting is handled in `src/app.css` via:

```css
@source inline("{bg,text}-{primary,secondary,accent,info,success,warning,error}{,-content} p-2 p-4 rounded-lg my-4");
```

---

## 5. File Layout and URL Convention

### Recommended post layout

```
src/content/
  my-post/
    index.md
    image-a.png
  another-post/
    index.md
    featured.jpg
```

### URL convention in current app

- Blog list: `/blog`
- Blog detail: `/blog/[postId]`
- File-based detail example: `/blog/my-post`

Note: the current route is single-segment `[postId]`, not a catch-all route. If you need deep nested slugs (like `guides/svelte/intro`), switch to `[...slug]` in your target project.

---

## 6. Content Loading Utilities

Implemented in `src/lib/content.js`.

### `getAllFilePosts()`

- eager-globs `/src/content/**/index.md`
- returns `{ slug, metadata }[]`
- filters drafts in production (`metadata.published === true`)
- sorts descending by `metadata.date`

### `getFilePostMetadata(slug)`

- resolves `/src/content/${slug}/index.md`
- returns `metadata` or `null`
- returns `null` for unpublished posts in production

---

## 7. Blog Route Behavior

### `/blog` (listing)

- merges published Firestore posts and file-based posts
- file-based posts are mapped from frontmatter:
  - `created <- metadata.date`
  - `title`, `description`, `tags`, `slug`, `featuredImage`
- unified list sorted newest-first

If you are building a pure file-based site in another project, remove Firestore reads and use only `getAllFilePosts()`.

### `/blog/[postId]` (detail)

Load order:

1. try file-based metadata via `getFilePostMetadata(slug)`
2. if found, render markdown component from `/src/content/${slug}/index.md`
3. otherwise, fall back to Firestore post lookup

For file posts, page rendering includes:

- `Post_meta` with `updated={metadata.updated ?? metadata.date}`
- featured image rendering when `featuredImage` is present
- `<svelte:component this={data.content} />` for markdown body

---

## 8. SEO and Structured Data

The detail page uses `Head.svelte` plus JSON-LD (`Article`) for both file and Firestore posts.

For file posts:

- canonical URL: `${config.siteUrl}/blog/${slug}`
- OG/Twitter image uses absolute URL from `new URL(featuredImage, config.siteUrl)`
- `datePublished` = `metadata.date`
- `dateModified` = `metadata.updated ?? metadata.date`

Site metadata currently comes from `src/lib/config.js` (`siteUrl`, `domain`, etc.).

---

## 9. Image Pipeline

Images are colocated with markdown inside `src/content/`.

### Development serving

Custom Vite middleware serves `/images/*` from `src/content/*` directly during dev.

### Build output serving

`vite-plugin-static-copy` copies:

- source: `src/content/**/*.{jpg,jpeg,png,gif,webp,svg,avif}`
- destination root: `images`
- rename preserves path under `src/content/`

Result:

- `src/content/nas/what_is_a_nas_2.png` -> `/images/nas/what_is_a_nas_2.png`

---

## 10. Sitemap (Current Behavior)

Route: `src/routes/sitemap.xml/+server.js`

Includes:

- homepage (`/`)
- blog index (`/blog`)
- published Firestore blog posts
- published file-based blog posts

For file posts:

- `<loc>` uses `${baseUrl}/blog/${slug}`
- `<lastmod>` uses `updated ?? date` when present
- optional image entry uses absolute URL `${baseUrl}${featuredImage}`

Current `baseUrl` is hardcoded in the route as `https://petemcpherson.com`.

---

## 11. Deliberate Omissions in File-Based Layer

Not currently implemented for file-based markdown posts:

- file-based tag index pages (`/tags`, `/tags/[tag]`)
- RSS feed route
- automatic tag normalization in content utilities
- catch-all nested markdown route (`[...slug]`)

These can be added in the target project if needed.

---

## 12. Porting Checklist for Another SvelteKit Blog

When reusing this architecture in another project:

1. Copy mdsvex + callout preprocessor setup from `svelte.config.js`
2. Copy image pipeline from `vite.config.js` and Tailwind safelist from `src/app.css`
3. Implement `src/lib/content.(ts|js)` with `getAllFilePosts()` and `getFilePostMetadata()`
4. Create `/blog` list and `/blog/[postId]` detail routes (or `[...slug]` if you want nested paths)
5. Ensure detail page uses:
   - `updated ?? date` for display + metadata
   - absolute OG image URL generation from site base URL
6. Add sitemap generation from file posts (and any other content sources)

If the new project is file-only (no Firestore), remove merge/fallback code and keep blog routes purely markdown-driven.

---

End of specification.
