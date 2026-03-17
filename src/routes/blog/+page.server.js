import { adminDB } from '$lib/server/admin';
import { error } from '@sveltejs/kit';
import { getAllFilePosts } from '$lib/content';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
		// Load Firestore posts
		const postsSnapshot = await adminDB
			.collection('posts')
			.where('status', '==', 'published')
			.orderBy('created', 'desc')
			.get();

		const firestorePosts = postsSnapshot.docs.map((doc) => {
			const data = doc.data();
			return {
				title: data.title,
				description: data.description,
				author: data.author,
				created: data.created?.toDate?.()?.toISOString()?.split('T')[0],
				tags: data.tags || [],
				slug: data.slug,
				featuredImage: data.featuredImage || null,
				source: 'firestore'
			};
		});

		// Load file-based posts
		const filePosts = getAllFilePosts().map(({ slug, metadata }) => ({
			title: metadata.title,
			description: metadata.description,
			author: null,
			created: metadata.date,
			tags: metadata.tags || [],
			slug,
			featuredImage: metadata.featuredImage || null,
			source: 'file'
		}));

		// Merge and sort newest first
		const posts = [...firestorePosts, ...filePosts].sort(
			(a, b) => new Date(b.created) - new Date(a.created)
		);

		return { posts };
	} catch (err) {
		console.error('Error fetching blog posts:', err);
		throw error(500, { message: 'Failed to load blog posts' });
	}
}
