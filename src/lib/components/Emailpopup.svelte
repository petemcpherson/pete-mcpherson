<script>
	import { preventDefault } from 'svelte/legacy';

	let email = $state('');
	let modal = $state();

	const handleSubmit = async () => {
		let res;
		try {
			res = await fetch('https://sendy-optin.pete-85b.workers.dev/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, listId: 'vRfjCXivzFqd8OwKQM7CPQ' })
			});
		} catch (e) {
			console.error('Opt-in request failed', e);
			alert('Failed to submit email. Please try again.');
			return;
		}

		if (res.ok) {
			alert('Thanks for subscribing!');
			modal.close();
			email = '';
		} else {
			const bodyText = await res.text().catch(() => '');
			let message = 'Failed to submit email. Please try again.';
			try {
				const parsed = JSON.parse(bodyText);
				message = parsed?.message || message;
			} catch {
				message = bodyText || message;
			}
			console.error('Failed to submit email', { status: res.status, body: bodyText });
			alert(message);
		}
	};
</script>

<button class="underline fixed bottom-4 left-4" onclick={() => modal.showModal()}>
	weekly roundup 👋
</button>

<dialog bind:this={modal} class="modal">
	<div class="modal-box bg-primary text-primary-content">
		<h3 class="text-3xl font-bold">
			Each week, I send a simple roundup newsletter for creators & entrepreneurs.
		</h3>
		<p class="py-4">No salesy stuff. No spam.</p>

		<form onsubmit={preventDefault(handleSubmit)} class="form-control w-full">
			<label class="label" for="email">
				<span class="label-text text-primary-content">Email address</span>
			</label>
			<input
				type="email"
				id="email"
				bind:value={email}
				placeholder="your@email.com"
				class="input input-bordered w-full text-neutral-content"
				required
			/>

			<div class="modal-action">
				<button type="button" class="btn btn-outline" onclick={() => modal.close()}
					>no thanks</button
				>
				<button type="submit" class="btn">I'm in!</button>
			</div>
		</form>
	</div>
</dialog>
