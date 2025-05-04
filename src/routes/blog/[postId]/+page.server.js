import { adminDB } from '$lib/server/admin';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, url }) {
    const postId = params.postId;
    const isPreview = url.searchParams.get('preview') === 'true';

    try {
        const postDoc = await adminDB.collection('posts').doc(postId).get();
        
        if (!postDoc.exists) {
            throw error(404, 'Post not found');
        }

        const post = {
            id: postDoc.id,
            ...postDoc.data(),
            created: postDoc.data().created?.toDate?.()?.toISOString(),
            updated: postDoc.data().updated?.toDate?.()?.toISOString()
        };

        // If not in preview mode and post is a draft, return 404
        if (!isPreview && post.status === 'draft') {
            throw error(404, 'Post not found');
        }

        return {
            post
        };
    } catch (err) {
        console.error('Error loading post:', err);
        throw error(404, 'Post not found');
    }
} 