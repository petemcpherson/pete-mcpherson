<script>
	/** @type {{ data: import('./$types').PageData }} */
	// let { data } = $props();

	// import { sendWelcomeEmail } from '$lib/components/emails/WelcomeEmail.js';

	import {
		GoogleAuthProvider,
		getAuth,
		isSignInWithEmailLink,
		signInWithEmailLink
	} from 'firebase/auth';
	import { db, userData } from '$lib/firebase';
	import {
		doc,
		setDoc,
		getDoc,
		collection,
		query,
		where,
		getDocs,
		increment
	} from 'firebase/firestore';

	// import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	// export let data;

	const auth = getAuth();

	if (browser) {
		if (isSignInWithEmailLink(auth, window.location.href)) {
			let email = window.localStorage.getItem('emailForSignIn');

			if (!email) {
				email = window.prompt('Please enter your email for confirmation');
			}

			signInWithEmailLink(auth, email, window.location.href)
				.then(async (result) => {
					console.log(result, 'signed in');
					window.localStorage.removeItem('emailForSignIn');

					// Get the ID token
					const idToken = await result.user.getIdToken();

					// Send the ID token to the server-side API route
					const response = await fetch('/api/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ idToken })
					});

					if (response.ok) {
						console.log('Signed in successfully');

						// Find the user document by email and update it with the auth UID
						const usersRef = collection(db, 'users');
						const q = query(usersRef, where('email', '==', email));
						const querySnapshot = await getDocs(q);

						if (!querySnapshot.empty) {
							const userDoc = querySnapshot.docs[0];
							console.log('Found user document:', userDoc.id);

							// Only migrate if the document ID doesn't match the Auth UID
							if (userDoc.id !== result.user.uid) {
								console.log('Migrating user document to match Auth UID');

								// Get the current user data
								const userData = userDoc.data();

								// Create new document with Auth UID as ID
								await setDoc(doc(db, 'users', result.user.uid), userData, { merge: true });

								// Delete the old document
								await setDoc(userDoc.ref, { deleted: true });

								console.log('User document migrated successfully');
							} else {
								console.log('User document already matches Auth UID');
							}
						}

						setTimeout(() => {
							goto('/admin');
						}, 1000);
					} else {
						// Handle error
						console.error('Error signing in');
					}

					// save to db
				})
				.catch((error) => {
					console.log(error, 'error');
				});
		}
	}
</script>

<div class="my-10 text-center">
	<h1 class="my-9 text-center text-4xl">You're signed in!</h1>
	<p class="text-center text-2xl">Wait a moment while we redirect you to the app...</p>
</div>
