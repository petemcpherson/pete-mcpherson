// Lazy-load the compiled Svelte component for file-based markdown posts.
// Runs on both server and client; Firestore posts pass server data straight through.
const modules = import.meta.glob('/src/content/**/index.md');

/** @type {import('./$types').PageLoad} */
export async function load({ data, params }) {
	if (data.source !== 'file') return data;

	const key = `/src/content/${params.postId}/index.md`;
	const loader = modules[key];
	if (!loader) return data;

	const mod = await loader();
	return { ...data, content: mod.default };
}
