import { adminAuth } from '$lib/server/admin';
/** @type {import('@sveltejs/kit').Handle} */

export async function handle({ event, resolve }) {
	const sessionCookie = event.cookies.get('__session');

	try {
		const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
		event.locals.userID = decodedClaims.uid;
	} catch (error) {
		event.locals.userID = null;
		return resolve(event);
	}

	return resolve(event);
}
