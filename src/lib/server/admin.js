import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { FB_CLIENT_EMAIL, FB_PRIVATE_KEY, FB_PROJECT_ID } from '$env/static/private';
import pkg from 'firebase-admin';

try {
	pkg.initializeApp({
		credential: pkg.credential.cert({
			projectId: FB_PROJECT_ID,
			clientEmail: FB_CLIENT_EMAIL,
			privateKey: FB_PRIVATE_KEY.replace(/\\n/g, '\n')
		}),
		storageBucket: 'pete-mcpherson-com.firebasestorage.app'
		// gs://pete-mcpherson-com.firebasestorage.app
	});
} catch (e) {
	if (!/already exists/u.test(e.message)) {
		console.error('Firebase admin initialization error', e.stack);
	}
}

export const adminDB = getFirestore();
export const adminAuth = getAuth();
export const adminStorage = getStorage();
