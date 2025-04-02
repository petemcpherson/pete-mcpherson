<script>
	import { preventDefault } from 'svelte/legacy';

	let email = $state('');
	let modal = $state();

	const handleSubmit = async () => {
		const zapierUrl = 'https://hooks.zapier.com/hooks/catch/1152094/37x1vsq/';

		console.log('popup zap email', email);

		const res = await fetch('/api/zapier', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, zapierUrl })
		});

		if (res.ok) {
			alert('Thanks for subscribing!');
			modal.close();
			email = '';
		} else {
			console.error('Failed to submit email');
			alert('Failed to submit email');
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
