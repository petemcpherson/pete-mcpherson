import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	const uid = locals.userID;

	if (!uid || uid !== 'OrYWauk35zSH2mQsXknPhxpjrxi1') {
		throw redirect(301, '/logout');
        // console.log('NOT PETE: ', uid);
	}

	return {
		uid
	};
} 