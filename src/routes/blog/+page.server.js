import { adminDB } from '$lib/server/admin';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    try {
        const postsSnapshot = await adminDB
            .collection('posts')
            .where('status', '==', 'published')
            .orderBy('created', 'desc')
            .get();

        const posts = postsSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                title: data.title,
                description: data.description,
                author: data.author,
                created: data.created?.toDate?.()?.toISOString()?.split('T')[0],
                tags: data.tags || [],
                slug: data.slug,
                featuredImage: data.featuredImage || null
            };
        });

        return { posts };
    } catch (err) {
        console.error('Error fetching blog posts:', err);
        throw error(500, {
            message: 'Failed to load blog posts'
        });
    }
} 