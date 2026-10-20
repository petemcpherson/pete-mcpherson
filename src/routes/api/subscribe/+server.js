import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

// Each opt-in form sends a `source`; it maps to the tags applied in Cyber Mail 9000.
// Keeping this list server-side stops visitors from applying arbitrary tags.
const SOURCE_TAGS = {
	newsletter: ['optin - petemcpherson'],
	sixfecta: ['optin - petemcpherson', 'sixfecta']
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	if (!env.CM9000_WEBHOOK_URL) {
		console.error('CM9000_WEBHOOK_URL env var not set');
		return json({ message: 'Signup is temporarily unavailable. Please try again later.' }, { status: 500 });
	}

	let data;
	try {
		data = await request.json();
	} catch {
		return json({ message: 'Invalid request payload' }, { status: 400 });
	}

	const email = data.email?.trim();
	if (!email || !EMAIL_PATTERN.test(email)) {
		return json({ message: 'Please enter a valid email address.' }, { status: 400 });
	}

	const tags = SOURCE_TAGS[data.source] ?? SOURCE_TAGS.newsletter;

	let res;
	try {
		res = await fetch(env.CM9000_WEBHOOK_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, tags })
		});
	} catch (error) {
		console.error('Cyber Mail 9000 request failed', error);
		return json({ message: 'Failed to submit email. Please try again.' }, { status: 502 });
	}

	if (!res.ok) {
		const bodyText = await res.text().catch(() => '');
		console.error('Cyber Mail 9000 error', { status: res.status, body: bodyText });
		return json({ message: 'Failed to submit email. Please try again.' }, { status: 502 });
	}

	return json({ success: true });
};
