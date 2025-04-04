import { adminDB } from '$lib/server/admin';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    try {
        // Query the posts collection to find the post with matching slug
        const postsSnapshot = await adminDB.collection('posts')
            .where('slug', '==', params.postId)
            .where('status', '==', 'published')
            .limit(1)
            .get();

        if (postsSnapshot.empty) {
            throw error(404, 'Post not found');
        }

        const postDoc = postsSnapshot.docs[0];
        const postData = postDoc.data();

        // Convert Firestore timestamps to ISO strings
        const post = {
            id: postDoc.id,
            ...postData,
            created: postData.created?.toDate?.()?.toISOString(),
            updated: postData.updated?.toDate?.()?.toISOString()
        };

        return { post };
    } catch (err) {
        console.error('Error loading post:', err);
        throw error(500, 'Error loading post');
    }
} 