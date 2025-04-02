import { adminDB } from '$lib/server/admin';
import { redirect } from '@sveltejs/kit';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '$lib/firebase';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const uid = locals.userID;

	if (!uid || uid !== 'OrYWauk35zSH2mQsXknPhxpjrxi1') {
		throw redirect(301, '/logout');
	
	}

	const userRef = adminDB.collection('users').doc(uid);
	const userSnapshot = await userRef.get();

	let user = userSnapshot.data();

	if (user.created?.toDate) {
		user.created = user.created.toDate().toISOString();
	}

	

	return { user, uid };
}
