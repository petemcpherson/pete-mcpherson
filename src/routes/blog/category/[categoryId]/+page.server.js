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
export async function load({ params }) {
    const categoryId = params.categoryId;

    try {
        // Get current category
        const categoryDoc = await adminDB.collection('categories').doc(categoryId).get();
        if (!categoryDoc.exists) {
            throw error(404, 'Category not found');
        }

        const category = {
            id: categoryDoc.id,
            ...categoryDoc.data()
        };

        // Get category hierarchy
        const categoryHierarchy = await getCategoryHierarchy(categoryId);

        // Get direct subcategories
        const subcategoriesSnapshot = await adminDB.collection('categories')
            .where('parentId', '==', categoryId)
            .get();

        const subcategories = subcategoriesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Get all posts in this category
        const postsSnapshot = await adminDB.collection('posts')
            .where('categoryId', '==', categoryId)
            .where('status', '==', 'published')
            .orderBy('created', 'desc')
            .get();

        const posts = postsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            created: doc.data().created?.toDate?.()?.toISOString(),
            updated: doc.data().updated?.toDate?.()?.toISOString()
        }));

        // Get posts from immediate subcategories
        const subcategoryIds = subcategories.map(sub => sub.id);
        let subcategoryPosts = [];
        
        if (subcategoryIds.length > 0) {
            const subPostsSnapshot = await adminDB.collection('posts')
                .where('categoryId', 'in', subcategoryIds)
                .where('status', '==', 'published')
                .orderBy('created', 'desc')
                .get();

            subcategoryPosts = subPostsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                created: doc.data().created?.toDate?.()?.toISOString(),
                updated: doc.data().updated?.toDate?.()?.toISOString()
            }));
        }

        return {
            category,
            categoryHierarchy,
            subcategories,
            posts,
            subcategoryPosts
        };
    } catch (err) {
        console.error('Error loading category:', err);
        throw error(404, 'Category not found');
    }
}