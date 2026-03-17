# Admin CMS Spec — SvelteKit + Firebase + TipTap

> This document describes the **current** CMS architecture: a database-backed,
> admin-UI-driven content system using Firestore, Firebase Auth, Firebase Storage,
> and a TipTap rich-text editor. It mirrors the structure of `no-db-cms-spec.md`
> so the two approaches can be compared side-by-side.

---

## 1. Project Goal

A fully-featured, browser-based content management system where:

- All content is created and edited through a **web admin UI** at `/admin`
- Content is stored in **Firestore** (no files in the repo)
- Images are uploaded directly from the editor to **Firebase Storage**
- No Markdown files — content is rich HTML produced by TipTap
- The site is server-rendered (SvelteKit with `adapter-auto`)
- Authentication is handled via **magic link email** (no password)
- Publishing workflow: write in browser → click "Publish" → live immediately

---

## 2. Core Principles

1. **Content lives in the database**
   - Firestore is the source of truth
   - Git history does NOT track content changes
2. **Runtime database queries**
   - Firestore reads on every page load (no build-time generation)
   - Draft posts can be previewed at any time via `?preview=true`
3. **Rich HTML editing**
   - TipTap produces HTML stored in Firestore
   - Headings, lists, images, links, and raw-HTML mode all supported
4. **Immediate publishing**
   - Status field on each post: `draft` or `published`
   - No deploy needed to go live — just change the status in the admin UI
5. **Single-user, hardcoded admin**
   - One specific Firebase Auth UID is allowed into `/admin`
   - No role management, no multi-user support

---

## 3. Folder / Route Structure

```
src/
  routes/
    (public)/
      blog/
        +page.svelte          ← post listing
        +page.server.js       ← fetch published posts from Firestore
        +layout.svelte        ← blog layout
        [postId]/
          +page.svelte        ← individual post
          +page.server.js     ← fetch by slug; allows ?preview=true
        category/
          [categoryId]/
            +page.svelte      ← category archive
            +page.server.js   ← posts for category + subcategories
      about/
        +page.svelte
      (other marketing pages)
    admin/
      +layout.svelte          ← admin chrome (nav, sidebar)
      +layout.server.js       ← auth guard — hardcoded UID check
      +page.svelte            ← dashboard home
      posts/
        +page.svelte          ← post list with delete actions
        +page.server.js       ← load all posts; delete action
        new/
          +page.svelte        ← post editor (TipTap)
          +page.server.js     ← save/update actions; featured image upload
      tags/
        +page.svelte
        +page.server.js
      categories/
        +page.svelte
        +page.server.js
    login/
      +page.svelte            ← magic link form
      confirm/
        +page.svelte          ← email link handler
    logout/
      +page.svelte
    api/
      login/
        +server.js            ← creates __session cookie
  lib/
    firebase.js               ← client Firebase SDK, auth/doc stores
    config.js                 ← site title, domain, analytics ID
    logout.js
    components/
      Tiptap.svelte           ← rich-text editor
      Head.svelte             ← SEO meta component
      Post_meta.svelte        ← author, date, tags, category breadcrumb
      TagSelector.svelte
      CategorySelector.svelte
      Analytics.svelte
      Emailpopup.svelte
    server/
      admin.js                ← Firebase Admin SDK init
    stores/
      store.js                ← user, userData, docStore reactive stores
```

---

## 4. URL Structure

### Public Content

| Content                            | URL                              |
| ---------------------------------- | -------------------------------- |
| Blog listing                       | `/blog`                          |
| Individual post                    | `/blog/{slug}`                   |
| Category archive                   | `/blog/category/{category-slug}` |
| Tag pages                          | _(not yet implemented)_          |

Slugs are the Firestore **document IDs** — formatted at creation time. Changing
a slug requires recreating the document (no rename migration available).

### Admin UI

| Purpose           | URL                        |
| ----------------- | -------------------------- |
| Dashboard         | `/admin`                   |
| Post list         | `/admin/posts`             |
| New / edit post   | `/admin/posts/new`         |
| Tag management    | `/admin/tags`              |
| Category mgmt     | `/admin/categories`        |

---

## 5. Content Format

Each post is stored as a **Firestore document** with HTML body content. There is
no Markdown — everything goes through the TipTap WYSIWYG editor and is stored
as HTML.

### Post Document Schema

```javascript
{
  id: string,           // Document ID == slug (e.g. "how-to-do-x")
  title: string,        // Post title (H1 on the page)
  body: string,         // HTML from TipTap editor
  slug: string,         // Same as document ID
  description: string,  // 160-char SEO / OG description
  status: 'draft' | 'published',
  featuredImage: string,  // Firebase Storage public URL
  tags: string[],       // Array of tag document IDs
  categoryId: string,   // Single category document ID
  created: Timestamp,   // Set on first save
  updated: Timestamp,   // Updated on every save
  author: string        // Author display name
}
```

---

## 6. Required Content Fields

| Field          | Required | Purpose                          |
| -------------- | -------- | -------------------------------- |
| title          | yes      | Page title + H1                  |
| slug           | yes      | URL + Firestore document ID      |
| body           | yes      | Full post HTML                   |
| description    | yes      | Meta description + OG            |
| status         | yes      | Draft/published gate             |
| created        | yes      | Set automatically on first save  |
| updated        | yes      | Set automatically on every save  |
| featuredImage  | optional | OG image + post listing card     |
| tags           | optional | Tag filtering                    |
| categoryId     | optional | Category archive grouping        |
| author         | optional | Display in post metadata         |

---

## 7. Data Models

All models live in Firestore, not in TypeScript files.

### Category Entity (Hierarchical)

```javascript
// Collection: categories
{
  id: string,           // Document ID (slug)
  name: string,         // Display name
  parentId: string | null   // null = root category
}
```

Supports **3 levels** of nesting. The `children` array is assembled at query
time (server-side), not stored. Circular reference prevention is enforced in
the admin UI.

### Tag Entity

```javascript
// Collection: tags
{
  id: string,   // Document ID (slug)
  name: string  // Display name
}
```

### User Entity

```javascript
// Collection: users
{
  id: string,         // Firebase Auth UID
  email: string,
  displayName: string
}
```

---

## 8. Content Loading Strategy

No build-time generation. All content is fetched from Firestore at request time.

### Published Post Listing

```javascript
// Queries Firestore for all posts with status === 'published'
// Ordered by created date, descending
const q = query(
  collection(db, 'posts'),
  where('status', '==', 'published'),
  orderBy('created', 'desc')
)
```

### Single Post

```javascript
// Fetched by document ID (slug) from Firestore
const ref = doc(db, 'posts', params.postId)
const snap = await getDoc(ref)
// Preview mode: allow draft posts when ?preview=true is in URL
```

### Category Archive

- Fetches the category document and resolves its full ancestor chain
- Queries posts where `categoryId` matches the requested category OR any
  immediate subcategory
- Assembled server-side before rendering

### Draft Preview

- Any post can be previewed at `/blog/{slug}?preview=true`
- No auth required for preview — URL is the access control (not ideal, but simple)
- Yellow draft banner shown when in preview mode

---

## 9. Routing Architecture

### Admin Layout Guard

`src/routes/admin/+layout.server.js` — runs on every admin route:

```javascript
export async function load({ locals }) {
  const uid = locals.userID;
  if (!uid || uid !== 'OrYWauk35zSH2mQsXknPhxpjrxi1') {
    throw redirect(301, '/logout');
  }
}
```

A single hardcoded UID. Unauthorized requests are immediately redirected.

### Session Verification (Hooks)

`src/hooks.server.js` — runs on every request:

- Reads `__session` cookie
- Verifies it against Firebase Admin Auth
- Stores the decoded UID in `event.locals.userID`
- Silent no-op if cookie missing or invalid

### Blog Routes

Standard SvelteKit `+page.server.js` `load()` functions with Firestore queries.
No catch-all routes — each pattern (`/blog`, `/blog/[postId]`,
`/blog/category/[categoryId]`) is its own file.

---

## 10. Prerender Strategy

**No prerendering.** All pages are server-rendered on request.

- Pros: instant publish/unpublish, draft previews work without deploys
- Cons: each page load hits Firestore; page speed is DB-dependent

There is no `entries()` function or `export const prerender = true` anywhere in
the blog routes.

---

## 11. SEO Implementation

### Head Component (`src/lib/components/Head.svelte`)

Props: `title`, `description`, `author`, `ogImage`, `url`

Outputs:
- `<title>{title} | Pete McPherson</title>`
- `<meta name="description">`
- `<meta name="author">`
- `og:url`, `og:type`, `og:title`, `og:description`, `og:image`
- `twitter:card="summary_large_image"`
- `twitter:domain`, `twitter:url`, `twitter:title`, `twitter:description`, `twitter:image`

### Post SEO

- `description` field (max ~160 chars) written in admin editor
- `featuredImage` Storage URL used for `og:image`
- Canonical URL: `https://petemcpherson.com/blog/{slug}`

### Analytics

- Google Analytics (`G-1F60GQC4CJ`) loaded via `Analytics.svelte`
- Tracks all pageviews automatically

---

## 12. Image System

### Featured Image

- Uploaded via file input in the post editor form
- Handled **server-side** in `+page.server.js` using Firebase Admin Storage SDK
- Path: `posts/{imageId}.{extension}`
- Made public after upload via `makePublic()`
- URL stored in post document as a permanent Firebase Storage CDN URL:
  `https://storage.googleapis.com/pete-mcpherson-com.firebasestorage.app/posts/...`

### Body Images (Inline Content)

- Uploaded directly from the TipTap toolbar (or drag-and-drop / paste)
- Handled **client-side** using the Firebase client SDK
- Path: `blog-images/{timestamp}_{filename}`
- URL inserted automatically into editor HTML at cursor position
- Progress indicator shown during upload

### Storage Bucket

- `pete-mcpherson-com.firebasestorage.app`
- All uploaded images are made public (Google Cloud CDN handles delivery)
- URLs are permanent — no expiry

### Image Guidelines

- Featured images: 1200×630px for OG compatibility
- No server-side optimization or resizing
- Keep file sizes reasonable before uploading
- Basic styling applied by TipTap: `rounded-lg max-w-full h-auto`

---

## 13. Deployment Configuration

### Adapter

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-auto';
export default {
  kit: { adapter: adapter() }
};
```

`adapter-auto` is used. Cloudflare adapter is installed but unused:

```bash
# Available but not active:
@sveltejs/adapter-cloudflare: ^4.4.0
```

### Environment Variables

```bash
# Firebase Admin SDK (server-side)
FB_PROJECT_ID=pete-mcpherson-com
FB_CLIENT_EMAIL=[service account email]
FB_PRIVATE_KEY=[RSA private key]

# Other (unrelated to CMS)
STRIPE_SIGNING_SECRET=...
STRIPE_PUBLISHABLE_KEY=...
STRIPE_SECRET_KEY=...
```

No `SITE_URL` env var — domain is hardcoded in places.

### Build

```bash
bun run build
```

- Builds the SvelteKit app for deployment
- No static prerendering of content routes
- Firebase credentials must be present at build and runtime

---

## 14. Rich Text Editor — TipTap

### Component

`src/lib/components/Tiptap.svelte`

### Extensions

| Extension    | Purpose                                |
| ------------ | -------------------------------------- |
| `StarterKit` | Paragraphs, headings, bold, italic, lists, code, blockquotes |
| `Image`      | Image upload with Firebase Storage integration |
| `Link`       | Link insertion with auto-https         |

### Toolbar Features

- Bold, Italic
- Heading (H2)
- Bullet List, Ordered List
- Image upload button
- Link button (URL modal)
- Source code toggle (raw HTML editor)

### Input Modes

- **Visual (WYSIWYG)**: Standard rich-text editing
- **Source code**: Edit raw HTML directly, toggle back to visual

### Image Upload (Client-side)

```javascript
// Inside TipTap image upload handler
const storageRef = ref(storage, `blog-images/${Date.now()}_${file.name}`)
const snapshot = await uploadBytes(storageRef, file)
const url = await getDownloadURL(snapshot.ref)
editor.chain().focus().setImage({ src: url }).run()
```

---

## 15. Admin UI — Post Editor

Located at `src/routes/admin/posts/new/+page.svelte`

### Fields

| Field          | Input Type                       |
| -------------- | -------------------------------- |
| Title          | Text input                       |
| Slug           | Auto-generated from title        |
| Description    | Textarea (SEO)                   |
| Body           | TipTap editor                    |
| Featured Image | File input (server-side upload)  |
| Category       | Dropdown (hierarchical)          |
| Tags           | Multi-select (TagSelector)       |
| Status         | Draft / Published toggle         |

### Actions

- **Save Draft**: Persists to Firestore with `status: 'draft'`
- **Publish**: Sets `status: 'published'`, immediately live
- **Update**: Saves changes to existing post, sets new `updated` timestamp
- **Preview**: Opens `/blog/{slug}?preview=true` in a new tab

### Slug Generation

Auto-derived from title in the frontend:

```javascript
slug = title
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '')
  .replace(/\s+/g, '-')
  .trim()
```

Slug = Firestore document ID. Changing the title after first save does NOT
automatically update the slug.

---

## 16. Tag & Category Management

### Tags (`/admin/tags`)

- Create new tags (name → ID auto-slugified)
- List all existing tags
- Delete tags
- Tags are referenced by ID in post documents

### Categories (`/admin/categories`)

- Create root categories and nested subcategories (up to 3 levels)
- Set parent on create/edit
- Circular reference prevention (cannot set a descendant as a parent)
- Displayed as a nested tree in the admin UI
- Categories are referenced by single `categoryId` on each post

---

## 17. Implementation Phases (Historical Reference)

These phases were completed to build the current system:

- [x] Phase 1: Firebase project setup & credentials
- [x] Phase 2: Magic link auth + session cookie system
- [x] Phase 3: Admin layout + auth guard
- [x] Phase 4: Firestore data models (posts, categories, tags)
- [x] Phase 5: TipTap editor integration
- [x] Phase 6: Featured image upload (Firebase Storage, server-side)
- [x] Phase 7: Body image upload (Firebase Storage, client-side in TipTap)
- [x] Phase 8: Admin post list + delete
- [x] Phase 9: Category management (hierarchical)
- [x] Phase 10: Tag management
- [x] Phase 11: Public blog listing page
- [x] Phase 12: Public post detail page
- [x] Phase 13: Category archive page
- [x] Phase 14: SEO (Head component, OG tags, canonical)
- [x] Phase 15: Google Analytics integration
- [x] Phase 16: Draft preview mode (`?preview=true`)

---

## 18. Dependency Graph

```
Firebase Auth
    ↓
Session cookies (hooks.server.js)
    ↓
Admin guard (admin/+layout.server.js)
    ↓
Post editor (+page.svelte / +page.server.js)
    ↓                              ↓
TipTap editor               Featured image upload
    ↓                              ↓
Client-side image upload    Firebase Storage (server)
(Firebase Storage client)          ↓
    ↓                       URL stored in Firestore
HTML body stored in Firestore
    ↓
Public blog routes read from Firestore at request time
```

---

## 19. Non-Goals

This system does NOT:

- Store content as files in the git repo
- Prerender or statically generate content pages
- Support content versioning or rollback (no git history for content)
- Support multiple admin users (single hardcoded UID)
- Require a deploy to publish or unpublish content
- Support Markdown writing workflow
- Optimize images (no resize, crop, or format conversion)

---

## 20. Trade-off Comparison

| Concern                  | Admin CMS (current)                | File-Based CMS (no-db-cms-spec)   |
| ------------------------ | ---------------------------------- | --------------------------------- |
| **Write experience**     | Browser WYSIWYG editor             | IDE + Markdown                    |
| **Publish speed**        | Instant (no deploy)                | Requires deploy                   |
| **Content versioning**   | None (Firestore has no history)    | Full git history                  |
| **Draft previews**       | Any time via ?preview=true         | Dev server only                   |
| **Image co-location**    | Images in Firebase Storage         | Images next to the .md file       |
| **Image URLs**           | Firebase CDN (permanent)           | Static asset copy at build time   |
| **SEO / performance**    | Server-rendered, DB-dependent      | Fully prerendered static HTML     |
| **Operational overhead** | Firebase billing, credentials mgmt | None beyond hosting               |
| **Offline editing**      | No (browser + Firebase required)   | Yes (just a text editor)          |
| **Search indexing**      | Server-rendered (crawlable)        | Static HTML (crawlable)           |
| **Backup / portability** | Must export Firestore manually     | Content is in git                 |
| **Tech complexity**      | Higher (auth, DB, storage)         | Lower (files + build)             |
| **Deployment target**    | Any (adapter-auto)                 | Vercel, Cloudflare, Netlify, etc. |

---

End of specification.
