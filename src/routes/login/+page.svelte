<script>
	/** @type {{ data: import('./$types').PageData }} */
	// let { data } = $props();

	import { goto } from '$app/navigation';
	import { auth, db, userData } from '$lib/firebase';
	import { dev } from '$app/environment';

	import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
	import { collection, query, where, getDocs } from 'firebase/firestore';
	import Head from '$lib/components/Head.svelte';

	let email = $state('');
	let showConfirmation = $state(false);
	let hasError = $state(false);

	const actionCodeSettings = {
		url: dev ? 'http://localhost:5173/login/confirm' : 'https://petemcpherson.com/login/confirm',
		handleCodeInApp: true
	};
	const handleEmailSubmit = async () => {
		// check the firestore 'users' collection to see if the user exists

		const usersRef = collection(db, 'users');
		const q = query(usersRef, where('email', '==', email));
		const querySnapshot = await getDocs(q);
		const userExists = !querySnapshot.empty;

		if (!userExists) {
			hasError = true;
			console.log('no existing user found');
			return;
		}

		const auth = getAuth();

		sendSignInLinkToEmail(auth, email, actionCodeSettings)
			.then(() => {
				showConfirmation = true;
				window.localStorage.setItem('emailForSignIn', email);

				console.log('sent');
			})
			.catch((error) => {
				console.log(error, 'error');
			});
	};
</script>

<Head title="Login to Pete McPherson" />

<div class="my-24 text-center">
	{#if $userData}
		<p>Hey there welcome {$userData.displayName}! You're already logged in.</p>
	{:else}
		<h1 class="my-7 text-4xl font-black">Welcome back!</h1>

		<p class="my-9">Login with email</p>
		<!-- magic link sign -->
		<input
			type="email"
			placeholder="Enter your email"
			bind:value={email}
			class="input input-bordered neo-box mr-1 w-full max-w-xs rounded-none md:mr-2"
		/>
		<button class="btn btn-primary border-4 border-black" onclick={handleEmailSubmit}>Submit</button
		>

		<!-- confirmation message -->
		{#if showConfirmation}
			<div class="bg-accent text-accent-content mx-auto my-7 w-1/2 p-6 text-center">
				<h1 class="text-2xl">Sweet! Check your email and click the magic signin link!</h1>
			</div>
		{/if}

		{#if hasError}
			<div class=" bg-warning text-warning-content mx-auto my-12 w-1/2 p-12" role="alert">
				<h4 class="my-2 text-center text-5xl font-bold">Error</h4>
				<p>We couldn't find your account.</p>
			</div>
		{/if}
	{/if}
</div>
