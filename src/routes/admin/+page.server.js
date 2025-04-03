import { adminDB } from '$lib/server/admin';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '$lib/firebase';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const uid = locals.userID;

	const userRef = adminDB.collection('users').doc(uid);
	const userSnapshot = await userRef.get();

	let user = userSnapshot.data();

	if (user.created?.toDate) {
		user.created = user.created.toDate().toISOString();
	}

	return { user, uid };
}
