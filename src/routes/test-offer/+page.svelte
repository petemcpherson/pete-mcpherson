<script>
	import { onMount } from 'svelte';
	import Head from '$lib/components/Head.svelte';

	/** @type {import('./$types').PageData} */
	let { data } = $props();

	let timerSnippetContainer;

	onMount(() => {
		if (typeof window === 'undefined' || !data.timerSnippet) return;

		// Parse the HTML snippet
		const parser = new DOMParser();
		const doc = parser.parseFromString(data.timerSnippet, 'text/html');

		// Find the container div and script
		const containerDiv = doc.querySelector('.lg-timer');
		const scriptTag = doc.querySelector('script');

		if (!containerDiv || !scriptTag) {
			console.error('Could not parse timer snippet');
			return;
		}

		// Inject the container div into the DOM
		timerSnippetContainer.innerHTML = containerDiv.outerHTML;

		// Get the actual container element from the DOM (needed for the script)
		const actualContainer = timerSnippetContainer.querySelector('.lg-timer');

		// Extract and execute the script
		// The script uses document.currentScript.previousElementSibling, so we need to simulate that
		// by creating a script element and inserting it right after the container
		const script = document.createElement('script');
		script.textContent = scriptTag.textContent;

		// Insert the script right after the container so previousElementSibling works
		actualContainer.parentNode.insertBefore(script, actualContainer.nextSibling);

		// The script will execute immediately
	});
</script>

<Head title="Test Offer" />

<!-- Hero Section -->
<div class="bg-gradient-to-br from-primary to-secondary text-primary-content py-20 lg:py-32">
	<div class="container mx-auto px-8 lg:px-48 text-center">
		<h1 class="text-4xl lg:text-7xl font-black mb-6">Special Test Offer</h1>
		<p class="text-xl lg:text-2xl mb-8 opacity-90">Discover something amazing today</p>
		<button class="btn btn-lg btn-accent mt-4">Get Started Now</button>
	</div>
</div>

<!-- List Gadget Timer Display -->
<!-- This container will be populated with the HTML from timer-snippet.html -->
<div bind:this={timerSnippetContainer}></div>
<!-- End List Gadget Display -->
<!-- Features Section -->
<div class="py-12 lg:py-20 bg-base-100">
	<div class="container mx-auto px-8 lg:px-48">
		<div class="grid md:grid-cols-3 gap-8 mb-12">
			<div class="card bg-base-200 shadow-xl">
				<div class="card-body">
					<h3 class="card-title text-2xl mb-4">Feature One</h3>
					<p class="text-base-content/70">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua.
					</p>
				</div>
			</div>
			<div class="card bg-base-200 shadow-xl">
				<div class="card-body">
					<h3 class="card-title text-2xl mb-4">Feature Two</h3>
					<p class="text-base-content/70">
						Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
						commodo consequat.
					</p>
				</div>
			</div>
			<div class="card bg-base-200 shadow-xl">
				<div class="card-body">
					<h3 class="card-title text-2xl mb-4">Feature Three</h3>
					<p class="text-base-content/70">
						Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
						nulla pariatur.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Main Content -->
<div class="py-12 lg:py-20">
	<div class="container mx-auto px-8 lg:px-48">
		<div class="max-w-3xl mx-auto prose prose-lg">
			<h2 class="text-3xl font-bold mb-6">Why Choose This Offer?</h2>
			<p class="text-lg leading-relaxed mb-6">
				Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
				anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem
				accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
				veritatis et quasi architecto beatae vitae dicta sunt explicabo.
			</p>
			<p class="text-lg leading-relaxed mb-6">
				Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
				consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
				est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
				numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
			</p>
			<p class="text-lg leading-relaxed mb-6">
				At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
				voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
				cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id
				est laborum et dolorum fuga.
			</p>
		</div>
	</div>
</div>

<!-- Final CTA -->
<div class="bg-gradient-to-br from-accent to-primary text-accent-content py-16 lg:py-24">
	<div class="container mx-auto px-8 lg:px-48 text-center">
		<h2 class="text-3xl lg:text-5xl font-bold mb-6">Ready to Get Started?</h2>
		<p class="text-lg mb-8 max-w-2xl mx-auto opacity-90">
			Don't miss out on this exclusive opportunity. Join thousands of satisfied customers today.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<button class="btn btn-lg btn-secondary">Claim Your Offer</button>
			<button class="btn btn-lg btn-outline btn-secondary">Learn More</button>
		</div>
	</div>
</div>
