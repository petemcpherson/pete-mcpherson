import Stripe from 'stripe';
import { STRIPE_API_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private';

const SENDY_LIST_ID = 'lsn9kpX13TM9tkeSU5HHTQ';
const SENDY_OPTIN_URL = 'https://sendy-optin.pete-85b.workers.dev/';

const stripe = new Stripe(STRIPE_API_KEY, { apiVersion: '2017-01-27' });

export const POST = async ({ request }) => {
	if (!STRIPE_API_KEY || !STRIPE_WEBHOOK_SECRET) {
		return new Response('Stripe env vars not set', { status: 500 });
	}

	const signature = request.headers.get('stripe-signature');
	if (!signature) {
		return new Response('Missing stripe-signature header', { status: 400 });
	}

	const payload = await request.text();
	let event;
	try {
		event = stripe.webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET);
	} catch (error) {
		console.error('Stripe webhook signature verification failed', error);
		return new Response('Webhook signature verification failed', { status: 400 });
	}

	if (event.type !== 'checkout.session.completed') {
		return new Response('Event ignored', { status: 200 });
	}

	/** @type {import('stripe').Stripe.Checkout.Session} */
	const session = event.data.object;
	if (session.payment_status !== 'paid') {
		return new Response('Payment not completed', { status: 200 });
	}

	const email = session.customer_details?.email || session.customer_email;
	if (!email) {
		console.warn('Stripe checkout session missing email', { sessionId: session.id });
		return new Response('Missing customer email', { status: 200 });
	}

	let sendyResponse;
	try {
		sendyResponse = await fetch(SENDY_OPTIN_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, listId: SENDY_LIST_ID })
		});
	} catch (error) {
		console.error('Sendy opt-in request failed', error);
		return new Response('Sendy opt-in failed', { status: 500 });
	}

	if (!sendyResponse.ok) {
		const bodyText = await sendyResponse.text().catch(() => '');
		console.error('Sendy opt-in error', {
			status: sendyResponse.status,
			body: bodyText
		});
		return new Response('Sendy opt-in failed', { status: 500 });
	}

	return new Response('ok', { status: 200 });
};
