import { adminDB } from '$lib/server/admin';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    try {
        const tagsSnapshot = await adminDB.collection('tags').get();
        const tags = tagsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Sort tags alphabetically by name
        tags.sort((a, b) => a.name.localeCompare(b.name));

        return { tags };
    } catch (error) {
        console.error('Error loading tags:', error);
        return { tags: [] };
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    create: async ({ request }) => {
        const formData = await request.formData();
        const name = formData.get('name')?.toString().trim();

        if (!name) {
            return fail(400, { error: 'Tag name is required' });
        }

        try {
            // Check if tag already exists
            const existingTags = await adminDB.collection('tags')
                .where('name', '==', name)
                .get();

            if (!existingTags.empty) {
                return fail(400, { error: 'Tag already exists' });
            }

            // Format the ID with hyphens, keep the name with spaces
            const tagId = name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');

            // Use setDoc with the generated ID instead of addDoc
            await adminDB.collection('tags').doc(tagId).set({
                name
            });

            return { success: true };
        } catch (error) {
            console.error('Error creating tag:', error);
            return fail(500, { error: 'Failed to create tag' });
        }
    },

    edit: async ({ request }) => {
        const formData = await request.formData();
        const oldId = formData.get('oldId')?.toString();
        const newName = formData.get('newName')?.toString().trim();

        if (!oldId || !newName) {
            return fail(400, { error: 'Tag ID and new name are required' });
        }

        try {
            // Check if new tag name already exists (excluding the current tag)
            const existingTags = await adminDB.collection('tags')
                .where('name', '==', newName)
                .get();

            if (!existingTags.empty) {
                const existingTag = existingTags.docs[0];
                if (existingTag.id !== oldId) {
                    return fail(400, { error: 'Tag with this name already exists' });
                }
            }

            // Format the new ID
            const newId = newName
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');

            // Create new tag
            await adminDB.collection('tags').doc(newId).set({
                name: newName
            });

            // Delete old tag
            await adminDB.collection('tags').doc(oldId).delete();

            return { success: true };
        } catch (error) {
            console.error('Error editing tag:', error);
            return fail(500, { error: 'Failed to edit tag' });
        }
    },

    delete: async ({ request }) => {
        const formData = await request.formData();
        const tagId = formData.get('id');

        if (!tagId) {
            return fail(400, { error: 'Tag ID is required' });
        }

        try {
            await adminDB.collection('tags').doc(tagId).delete();
            return { success: true };
        } catch (error) {
            console.error('Error deleting tag:', error);
            return fail(500, { error: 'Failed to delete tag' });
        }
    }
};