<script>
	import Post_meta from '$lib/components/Post_meta.svelte';
	import { page } from '$app/stores';
	import Emailpopup from '$lib/components/Emailpopup.svelte';
	// Check if we're on the blog index page
	$: isBlogIndex = $page.url.pathname === '/blog' || $page.url.pathname === '/blog/';
	// let email = '';
</script>

{#if isBlogIndex}
	<slot />
{:else}
	<div class="bg-base-100 min-h-screen">
		<main class="container mx-auto px-4 py-8">
			<header class="mx-w-3xl mx-auto md:prose md:prose-lg my-8 md:my-12">
				<Post_meta
					author={$page.data.post?.author}
					updated={$page.data.post?.updated}
					tags={$page.data.post?.tags}
				/>
			</header>
			<article class="max-w-3xl mx-auto">
				<div class="prose prose-lg max-w-none">
					<h1 class="text-4xl md:text-6xl font-black mb-4 md:mb-8">{$page.data.post?.title}</h1>

					<slot />
				</div>
			</article>
		</main>
	</div>
{/if}

<Emailpopup />

<style>
	:global(.sticky-note) {
		background-color: #ffffe0;
	}
</style>
