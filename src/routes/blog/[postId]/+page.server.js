import { adminDB } from '$lib/server/admin';
import { error } from '@sveltejs/kit';

async function getCategoryHierarchy(categoryId) {
    if (!categoryId) return [];
    
    const hierarchy = [];
    let currentCategoryId = categoryId;
    
    while (currentCategoryId) {
        const categoryDoc = await adminDB.collection('categories').doc(currentCategoryId).get();
        if (!categoryDoc.exists) break;
        
        const categoryData = categoryDoc.data();
        hierarchy.unshift({
            id: categoryDoc.id,
            name: categoryData.name
        });
        
        currentCategoryId = categoryData.parentId;
    }
    
    return hierarchy;
}

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

        // Get category hierarchy
        const categoryHierarchy = await getCategoryHierarchy(post.categoryId);

        return {
            post,
            categoryHierarchy
        };
    } catch (err) {
        console.error('Error loading post:', err);
        throw error(404, 'Post not found');
    }
} 