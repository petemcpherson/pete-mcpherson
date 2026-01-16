<script>
	import Head from '$lib/components/Head.svelte';

	let email = $state('');
	let name = $state('');
	let category = $state('');
	let message = $state('');

	const categories = [
		{ value: 'Bug Report', label: 'Bug Report' },
		{ value: 'Feedback', label: 'Feedback' },
		{ value: 'App Idea', label: 'App Idea' }
	];

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!email) {
			alert('Please enter your email address.');
			return;
		}

		if (!category) {
			alert('Please select a category.');
			return;
		}

		if (!message) {
			alert('Please enter a message.');
			return;
		}

		const recipient = 'pete@doyouevenblog.com';
		const subject = `Scratchdown Contact: ${category}`;

		let body = '';
		if (name) {
			body += `From: ${name}\n\n`;
		}
		body += `Email: ${email}\n\n`;
		body += `Category: ${category}\n\n`;
		body += `Message:\n${message}`;

		const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		window.location.href = mailtoLink;
	};
</script>

<Head title="Scratchdown Contact" />

<!-- header -->
<div class="px-8 lg:px-48 py-4 lg:py-20 text-center m-4">
	<h1 class="mb-4 md:mb-8 font-black text-3xl lg:text-7xl">Scratchdown - Contact Support</h1>
	<p class="mb-3 text-primary italic">Have feedback, found a bug, or have an idea? Let me know!</p>
</div>

<!-- divider -->
<div class="flex flex-col w-full">
	<div class="divider divider-primary">contact 👇</div>
</div>

<!-- form -->
<div class="py-4 lg:py-12">
	<div class="mx-5 md:w-1/2 md:mx-auto">
		<form onsubmit={handleSubmit} class="space-y-6">
			<!-- Email (required) -->
			<div>
				<label for="email" class="block mb-2 text-sm font-medium">
					Email <span class="text-error">*</span>
				</label>
				<input
					type="email"
					id="email"
					name="email"
					bind:value={email}
					required
					placeholder="your@email.com"
					class="input input-bordered w-full"
				/>
			</div>

			<!-- Name (optional) -->
			<div>
				<label for="name" class="block mb-2 text-sm font-medium">Name</label>
				<input
					type="text"
					id="name"
					name="name"
					bind:value={name}
					placeholder="Your name (optional)"
					class="input input-bordered w-full"
				/>
			</div>

			<!-- Category dropdown -->
			<div>
				<label for="category" class="block mb-2 text-sm font-medium">
					Category <span class="text-error">*</span>
				</label>
				<select
					id="category"
					name="category"
					bind:value={category}
					required
					class="select select-bordered w-full"
				>
					<option value="" disabled selected>Select a category...</option>
					{#each categories as cat}
						<option value={cat.value}>{cat.label}</option>
					{/each}
				</select>
			</div>

			<!-- Message textarea -->
			<div>
				<label for="message" class="block mb-2 text-sm font-medium">
					Message <span class="text-error">*</span>
				</label>
				<textarea
					id="message"
					name="message"
					bind:value={message}
					required
					placeholder="Tell me what's on your mind..."
					rows="6"
					class="textarea textarea-bordered w-full"
				></textarea>
			</div>

			<!-- Submit button -->
			<div>
				<button type="submit" class="btn btn-primary w-full md:w-auto"> Send Email </button>
			</div>
		</form>
	</div>
</div>
