import { adminDB, adminStorage } from '$lib/server/admin';
import { fail, redirect } from '@sveltejs/kit';

function formatSlugForId(slug) {
    return slug
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

// Generate a unique ID based on timestamp
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    const postId = url.searchParams.get('edit');
    
    if (postId) {
        try {
            const postDoc = await adminDB.collection('posts').doc(postId).get();
            if (postDoc.exists) {
                const postData = postDoc.data();
                return {
                    post: { 
                        id: postDoc.id, 
                        ...postData,
                        created: postData.created?.toDate?.()?.toISOString(),
                        updated: postData.updated?.toDate?.()?.toISOString()
                    }
                };
            }
        } catch (error) {
            console.error('Error loading post:', error);
        }
    }
    
    return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
    save: async ({ request, locals }) => {
        const formData = await request.formData();
        const title = formData.get('title');
        const body = formData.get('body');
        let slug = formData.get('slug');
        const category = formData.get('category');
        const status = formData.get('status');
        const oldPostId = formData.get('id');
        const featuredImageFile = formData.get('featuredImage');

        if (!title || !body || !category) {
            return fail(400, {
                error: 'Title, body, and category are required',
                title, body, category
            });
        }

        // If slug is empty, generate it from title
        if (!slug) {
            slug = title;
        }

        try {
            const postData = {
                title,
                body,
                slug, // Keep original slug with spaces
                category,
                status,
                updated: new Date(),
                author: locals.userData?.name || 'Pete McPherson'
            };

            // Handle featured image upload if provided
            if (featuredImageFile && featuredImageFile instanceof File && featuredImageFile.size > 0) {
                console.log('Starting image upload process...');
                
                const imageId = generateId();
                const fileExtension = featuredImageFile.name.split('.').pop();
                const filePath = `posts/${imageId}.${fileExtension}`;
                
                console.log('Getting storage bucket...');
                const bucket = adminStorage.bucket();
                console.log('Bucket name:', bucket.name);
                
                const file = bucket.file(filePath);
                
                console.log('Converting file to buffer...');
                const buffer = Buffer.from(await featuredImageFile.arrayBuffer());
                
                console.log('Uploading file to Firebase Storage...');
                try {
                    // Upload the file
                    await file.save(buffer, {
                        metadata: {
                            contentType: featuredImageFile.type
                        }
                    });
                    console.log('File successfully uploaded to Firebase Storage');
                    
                    // Make the file publicly accessible
                    await file.makePublic();
                    
                    // Get the public URL
                    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
                    postData.featuredImage = publicUrl;
                    console.log('Generated image URL:', publicUrl);
                } catch (uploadError) {
                    console.error('Error during file upload:', uploadError);
                    throw uploadError;
                }
            }

            const documentId = formatSlugForId(slug);

            // If this is a new post or the slug hasn't changed, just create/update normally
            if (!oldPostId || oldPostId === documentId) {
                if (!oldPostId) {
                    postData.created = new Date();
                }
                await adminDB.collection('posts').doc(documentId).set(postData, { merge: true });
            } else {
                // If the slug has changed, we need to:
                // 1. Create a new document with the new slug as ID
                // 2. Copy all data to the new document
                // 3. Delete the old document
                const oldDoc = await adminDB.collection('posts').doc(oldPostId).get();
                if (oldDoc.exists) {
                    const oldData = oldDoc.data();
                    postData.created = oldData.created; // Preserve original creation date
                    
                    // Create new document with new slug
                    await adminDB.collection('posts').doc(documentId).set(postData);
                    
                    // Delete old document
                    await adminDB.collection('posts').doc(oldPostId).delete();
                }
            }

            if (status === 'published') {
                throw redirect(303, '/admin/posts');
            }

            return {
                success: true,
                message: 'Post saved successfully',
                id: documentId, // Return the formatted slug as the ID
                featuredImage: postData.featuredImage
            };
        } catch (error) {
            if (error instanceof Response) throw error;
            
            console.error('Error saving post:', error);
            return fail(500, {
                error: 'Failed to save post',
                title, body, slug, category
            });
        }
    },

    saveDraft: async ({ request, locals }) => {
        const formData = await request.formData();
        const title = formData.get('title');
        const body = formData.get('body');
        let slug = formData.get('slug');
        const category = formData.get('category');
        const oldPostId = formData.get('id');
        const featuredImageFile = formData.get('featuredImage');

        try {
            // If slug is empty, generate it from title
            if (!slug) {
                slug = title;
            }

            const postData = {
                title,
                body,
                slug, // Keep original slug with spaces
                category,
                status: 'draft',
                updated: new Date(),
                author: locals.userData?.name || 'Pete McPherson'
            };

            // Handle featured image upload if provided
            if (featuredImageFile && featuredImageFile instanceof File && featuredImageFile.size > 0) {
                console.log('Starting image upload process...');
                
                const imageId = generateId();
                const fileExtension = featuredImageFile.name.split('.').pop();
                const filePath = `posts/${imageId}.${fileExtension}`;
                
                console.log('Getting storage bucket...');
                const bucket = adminStorage.bucket();
                console.log('Bucket name:', bucket.name);
                
                const file = bucket.file(filePath);
                
                console.log('Converting file to buffer...');
                const buffer = Buffer.from(await featuredImageFile.arrayBuffer());
                
                console.log('Uploading file to Firebase Storage...');
                try {
                    // Upload the file
                    await file.save(buffer, {
                        metadata: {
                            contentType: featuredImageFile.type
                        }
                    });
                    console.log('File successfully uploaded to Firebase Storage');
                    
                    // Make the file publicly accessible
                    await file.makePublic();
                    
                    // Get the public URL
                    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
                    postData.featuredImage = publicUrl;
                    console.log('Generated image URL:', publicUrl);
                } catch (uploadError) {
                    console.error('Error during file upload:', uploadError);
                    throw uploadError;
                }
            }

            const documentId = formatSlugForId(slug);

            // If this is a new post or the slug hasn't changed, just create/update normally
            if (!oldPostId || oldPostId === documentId) {
                if (!oldPostId) {
                    postData.created = new Date();
                }
                await adminDB.collection('posts').doc(documentId).set(postData, { merge: true });
            } else {
                // If the slug has changed, we need to:
                // 1. Create a new document with the new slug as ID
                // 2. Copy all data to the new document
                // 3. Delete the old document
                const oldDoc = await adminDB.collection('posts').doc(oldPostId).get();
                if (oldDoc.exists) {
                    const oldData = oldDoc.data();
                    postData.created = oldData.created; // Preserve original creation date
                    
                    // Create new document with new slug
                    await adminDB.collection('posts').doc(documentId).set(postData);
                    
                    // Delete old document
                    await adminDB.collection('posts').doc(oldPostId).delete();
                }
            }

            return {
                success: true,
                message: 'Draft saved',
                id: documentId, // Return the formatted slug as the ID
                featuredImage: postData.featuredImage
            };
        } catch (error) {
            console.error('Error saving draft:', error);
            return fail(500, {
                error: 'Failed to save draft'
            });
        }
    }
};