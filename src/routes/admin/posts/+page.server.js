import { adminDB } from '$lib/server/admin';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    try {
        const postsSnapshot = await adminDB.collection('posts').get();
        const posts = await Promise.all(postsSnapshot.docs.map(async doc => {
            const data = doc.data();
            const postData = {
                id: doc.id,
                ...data,
                created: data.created?.toDate?.()?.toISOString(),
                updated: data.updated?.toDate?.()?.toISOString()
            };

            // If the post has a categoryId, fetch the category details
            if (data.categoryId) {
                const categoryDoc = await adminDB.collection('categories').doc(data.categoryId).get();
                if (categoryDoc.exists) {
                    postData.category = {
                        id: categoryDoc.id,
                        name: categoryDoc.data().name
                    };
                }
            }

            return postData;
        }));

        // Sort posts by updated date, most recent first
        posts.sort((a, b) => new Date(b.updated) - new Date(a.updated));

        return { posts };
    } catch (error) {
        console.error('Error loading posts:', error);
        return { posts: [] };
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    delete: async ({ request }) => {
        const formData = await request.formData();
        const postId = formData.get('id');

        if (!postId) {
            return fail(400, { error: 'Post ID is required' });
        }

        try {
            await adminDB.collection('posts').doc(postId).delete();
            return { success: true };
        } catch (error) {
            console.error('Error deleting post:', error);
            return fail(500, { error: 'Failed to delete post' });
        }
    }
};