/**
 * File-based content loading utilities.
 * Uses import.meta.glob to load all .md files from src/content/ at build time.
 *
 * Slug = folder name (e.g. src/content/my-post/index.md → slug "my-post")
 * URLs  = /blog/{slug}
 */

/**
 * Returns all file-based posts (metadata only), sorted newest first.
 * In production, only posts with published: true are included.
 * In development, all posts including drafts are returned.
 *
 * @returns {Array<{slug: string, metadata: object}>}
 */
export function getAllFilePosts() {
	const modules = import.meta.glob('/src/content/**/index.md', { eager: true });

	return Object.entries(modules)
		.map(([path, mod]) => ({
			slug: path.replace('/src/content/', '').replace('/index.md', ''),
			metadata: mod.metadata
		}))
		.filter(({ metadata }) => (import.meta.env.DEV ? true : metadata.published === true))
		.sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date));
}

/**
 * Returns metadata for a single file-based post by slug, or null if not found.
 * In production, returns null for unpublished posts.
 *
 * @param {string} slug
 * @returns {object|null}
 */
export function getFilePostMetadata(slug) {
	const modules = import.meta.glob('/src/content/**/index.md', { eager: true });
	const key = `/src/content/${slug}/index.md`;
	const mod = modules[key];

	if (!mod) return null;
	if (!import.meta.env.DEV && mod.metadata.published !== true) return null;

	return mod.metadata;
}
