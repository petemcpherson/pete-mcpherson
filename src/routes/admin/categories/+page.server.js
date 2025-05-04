import { adminDB } from '$lib/server/admin';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    try {
        const categoriesSnapshot = await adminDB.collection('categories').get();
        const categories = categoriesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Organize categories into hierarchy
        const rootCategories = categories.filter(cat => !cat.parentId);
        const subCategories = categories.filter(cat => cat.parentId);

        // Add children to their parents
        rootCategories.forEach(root => {
            root.children = subCategories.filter(sub => sub.parentId === root.id);
            
            // Add children to subcategories (third level)
            root.children?.forEach(subCat => {
                subCat.children = subCategories.filter(sub => sub.parentId === subCat.id);
            });
        });

        // Sort categories at all levels alphabetically
        rootCategories.sort((a, b) => a.name.localeCompare(b.name));
        rootCategories.forEach(root => {
            root.children?.sort((a, b) => a.name.localeCompare(b.name));
            root.children?.forEach(subCat => {
                subCat.children?.sort((a, b) => a.name.localeCompare(b.name));
            });
        });

        return { 
            categories: rootCategories,
            allCategories: categories // Useful for parent selection dropdown
        };
    } catch (error) {
        console.error('Error loading categories:', error);
        return { categories: [], allCategories: [] };
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    create: async ({ request }) => {
        const formData = await request.formData();
        const name = formData.get('name')?.toString().trim();
        const parentId = formData.get('parentId')?.toString() || null;

        if (!name) {
            return fail(400, { error: 'Category name is required' });
        }

        try {
            // Check if category already exists at the same level
            const existingCategories = await adminDB.collection('categories')
                .where('name', '==', name)
                .where('parentId', '==', parentId)
                .get();

            if (!existingCategories.empty) {
                return fail(400, { error: 'Category already exists at this level' });
            }

            // If it's a subcategory, verify parent exists
            if (parentId) {
                const parentDoc = await adminDB.collection('categories').doc(parentId).get();
                if (!parentDoc.exists) {
                    return fail(400, { error: 'Parent category does not exist' });
                }
            }

            // Format the ID with hyphens, keep the name with spaces
            const categoryId = name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');

            // Use setDoc with the generated ID instead of addDoc
            await adminDB.collection('categories').doc(categoryId).set({
                name,
                parentId
            });

            return { success: true };
        } catch (error) {
            console.error('Error creating category:', error);
            return fail(500, { error: 'Failed to create category' });
        }
    },

    edit: async ({ request }) => {
        const formData = await request.formData();
        const oldId = formData.get('oldId')?.toString();
        const newName = formData.get('newName')?.toString().trim();
        const newParentId = formData.get('newParentId')?.toString() || null;

        if (!oldId || !newName) {
            return fail(400, { error: 'Category ID and new name are required' });
        }

        try {
            // Get current category data first
            const currentCategoryDoc = await adminDB.collection('categories').doc(oldId).get();
            if (!currentCategoryDoc.exists) {
                return fail(400, { error: 'Category not found' });
            }
            const currentCategoryData = currentCategoryDoc.data();

            // Check if new category name already exists at the same level (excluding current)
            const existingCategories = await adminDB.collection('categories')
                .where('name', '==', newName)
                .where('parentId', '==', newParentId)
                .get();

            if (!existingCategories.empty) {
                const existingCategory = existingCategories.docs[0];
                if (existingCategory.id !== oldId) {
                    return fail(400, { error: 'Category with this name already exists at this level' });
                }
            }

            // If moving to a new parent, verify it exists and prevent circular reference
            if (newParentId) {
                const parentDoc = await adminDB.collection('categories').doc(newParentId).get();
                if (!parentDoc.exists) {
                    return fail(400, { error: 'Parent category does not exist' });
                }
                
                // Check if new parent is not a child of current category
                const allCategories = await adminDB.collection('categories').get();
                const categories = allCategories.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                function isDescendant(parentId, childId) {
                    if (parentId === childId) return true;
                    const children = categories.filter(c => c.parentId === childId);
                    return children.some(child => isDescendant(parentId, child.id));
                }
                
                if (isDescendant(oldId, newParentId)) {
                    return fail(400, { error: 'Cannot move category to one of its descendants' });
                }
            }

            // Format the new ID
            const newId = newName
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');

            // Start a batch write
            const batch = adminDB.batch();

            // If the ID is changing, we need to create new and delete old
            if (oldId !== newId) {
                // Create new category document
                const newCategoryRef = adminDB.collection('categories').doc(newId);
                batch.set(newCategoryRef, {
                    name: newName,
                    parentId: newParentId
                });

                // Delete old category document
                const oldCategoryRef = adminDB.collection('categories').doc(oldId);
                batch.delete(oldCategoryRef);

                // Update all child categories to point to new parent ID
                const childCategories = await adminDB.collection('categories')
                    .where('parentId', '==', oldId)
                    .get();

                childCategories.docs.forEach(doc => {
                    batch.update(doc.ref, { parentId: newId });
                });
            } else {
                // Just update the existing category
                const categoryRef = adminDB.collection('categories').doc(oldId);
                batch.update(categoryRef, {
                    name: newName,
                    parentId: newParentId
                });
            }

            // Commit all the changes
            await batch.commit();

            return { success: true };
        } catch (error) {
            console.error('Error editing category:', error);
            return fail(500, { error: 'Failed to edit category' });
        }
    },

    delete: async ({ request }) => {
        const formData = await request.formData();
        const categoryId = formData.get('id');

        if (!categoryId) {
            return fail(400, { error: 'Category ID is required' });
        }

        try {
            // Check for child categories
            const childCategories = await adminDB.collection('categories')
                .where('parentId', '==', categoryId)
                .get();

            if (!childCategories.empty) {
                return fail(400, { error: 'Cannot delete category with subcategories. Please delete or move subcategories first.' });
            }

            await adminDB.collection('categories').doc(categoryId).delete();
            return { success: true };
        } catch (error) {
            console.error('Error deleting category:', error);
            return fail(500, { error: 'Failed to delete category' });
        }
    }
};