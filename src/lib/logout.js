import { signOut } from 'firebase/auth';

export async function signOutSSR() {
	await fetch('/api/login', {
		method: 'DELETE'
	});
}

export async function signOutClient(auth) {
	await signOut(auth);
}
