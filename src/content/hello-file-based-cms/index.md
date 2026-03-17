---
title: Hello, File-Based CMS
date: 2026-03-17
description: A test post written in plain Markdown to verify the file-based CMS is working alongside the existing system.
tags: [meta, test]
published: true
---

This post was written in **Markdown** in the IDE — no TipTap editor, no database, no admin UI.

## How it works

Content lives in `src/content/` as `.md` files. Each post gets its own folder:

```
src/content/
  hello-file-based-cms/
    index.md        ← this file
    featured.jpg    ← images go right here
```

Commit it, push it, and it goes live after the Vercel build.

## What Markdown gives you

- Clean, distraction-free writing
- Full git history for every edit
- Images co-located with the post
- No vendor lock-in — it's just files

### Code blocks work too

```js
const post = {
  title: 'Hello, File-Based CMS',
  published: true
}
```

## Adding a new post

1. Create a folder in `src/content/`
2. Add `index.md` with frontmatter
3. Write in Markdown
4. Commit and push

That's the entire publishing workflow.
