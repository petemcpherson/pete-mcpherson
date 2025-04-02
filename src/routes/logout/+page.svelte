<script>
	/** @type {{ data: import('./$types').PageData }} */
	// let { data } = $props();

	import { auth } from '$lib/firebase';
	import { signOutClient, signOutSSR } from '$lib/logout';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(async () => {
		console.log('logging out');

		await signOutSSR();
		await signOutClient(auth);

		setTimeout(() => {
			goto('/login');
		}, 2000);
	});
</script>

<div class="flex h-screen flex-col items-center justify-center">
	<h1>You're not logged in!</h1>

	<p>Redirecting to login page...</p>
</div>
