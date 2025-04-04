<script>
	import Head from '$lib/components/Head.svelte';
	import Post_meta from '$lib/components/Post_meta.svelte';
	import Emailpopup from '$lib/components/Emailpopup.svelte';
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();

	const post = data.post;
	console.log(post);
	const title = post.title;
	const description = post.description;
	const featuredImage = post.featuredImage;
</script>

<Head {title} {description} {featuredImage} />

<div class="bg-base-100 min-h-screen">
	<main class="container mx-auto px-4 py-8">
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
