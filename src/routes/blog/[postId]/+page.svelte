<script>
	import Head from '$lib/components/Head.svelte';
	import Post_meta from '$lib/components/Post_meta.svelte';
	import Emailpopup from '$lib/components/Emailpopup.svelte';
	import { config } from '$lib/config';
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();

	const post = data.post;
	console.log(post);
	const title = post.title;
	const description = post.description;
	// Ensure featuredImage is a complete URL
	const featuredImage = post.featuredImage
		? new URL(post.featuredImage, config.siteUrl).toString()
		: undefined;
</script>

<Head {title} {description} img={featuredImage} />

<div class="bg-base-100 min-h-screen">
	<main class="container mx-auto px-4 py-8">
		{#if post.status === 'draft'}
			<div class="max-w-3xl mx-auto mb-8">
				<div class="alert alert-info">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="stroke-current shrink-0 w-6 h-6"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path></svg
					>
					<span>You are previewing a draft post. This post is not publicly visible.</span>
				</div>
			</div>
		{/if}
		<header class="max-w-3xl mx-auto md:prose md:prose-lg my-8 md:my-12">
			<Post_meta author={post.author} updated={post.updated} tags={post.tags} />
		</header>
		<article class="max-w-3xl mx-auto">
			<div class="prose prose-lg max-w-none">
				<h1 class="text-4xl md:text-6xl font-black mb-4 md:mb-8">{post.title}</h1>

				{#if featuredImage}
					<img src={featuredImage} alt={post.title} class="w-full h-auto rounded-lg mb-8" />
				{/if}

				{@html post.body}
			</div>
		</article>
	</main>
</div>

<Emailpopup />

<style>
	:global(.sticky-note) {
		background-color: #ffffe0;
	}
</style>
