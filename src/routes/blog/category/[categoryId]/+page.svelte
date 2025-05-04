<script>
	import Head from '$lib/components/Head.svelte';
	import { config } from '$lib/config';

	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();

	const { category, categoryHierarchy, subcategories, posts, subcategoryPosts } = data;
</script>

<Head
	title={`${category.name} - Blog Category - ${config.siteName}`}
	description={`Browse all blog posts in the ${category.name} category`}
/>

<div class="bg-base-100 min-h-screen">
	<main class="container mx-auto px-4 py-8">
		<!-- Breadcrumbs -->
		<div class="breadcrumbs text-sm mb-8">
			<ul>
				<li><a href="/blog">Blog</a></li>
				{#each categoryHierarchy as cat}
					<li>
						{#if cat.id === category.id}
							{cat.name}
						{:else}
							<a href="/blog/category/{cat.id}">{cat.name}</a>
						{/if}
					</li>
				{/each}
			</ul>
		</div>

		<div class="max-w-4xl mx-auto">
			<!-- Category Header -->
			<header class="mb-12">
				<h1 class="text-4xl md:text-5xl font-black mb-4">{category.name}</h1>
				{#if subcategories.length > 0}
					<div class="flex flex-wrap gap-2 mt-4">
						<h2 class="text-lg font-bold w-full">Subcategories:</h2>
						{#each subcategories as subcategory}
							<a href="/blog/category/{subcategory.id}" class="btn btn-outline btn-sm">
								{subcategory.name}
							</a>
						{/each}
					</div>
				{/if}
			</header>

			<!-- Direct Posts -->
			{#if posts.length > 0}
				<section class="mb-12">
					<h2 class="text-2xl font-bold mb-6">Posts in {category.name}</h2>
					<div class="grid gap-6">
						{#each posts as post}
							<article class="card bg-base-200">
								<div class="card-body">
									<h3 class="card-title text-xl">
										<a href="/blog/{post.id}" class="hover:text-primary">{post.title}</a>
									</h3>
									{#if post.description}
										<p class="text-base-content/70">{post.description}</p>
									{/if}
									<div class="card-actions justify-end mt-4">
										<a href="/blog/{post.id}" class="btn btn-primary btn-sm">Read More</a>
									</div>
								</div>
							</article>
						{/each}
					</div>
				</section>
			{/if}

			<!-- Subcategory Posts -->
			{#if subcategoryPosts.length > 0}
				<section>
					<h2 class="text-2xl font-bold mb-6">Posts in Subcategories</h2>
					<div class="grid gap-6">
						{#each subcategoryPosts as post}
							<article class="card bg-base-200">
								<div class="card-body">
									<h3 class="card-title text-xl">
										<a href="/blog/{post.id}" class="hover:text-primary">{post.title}</a>
									</h3>
									{#if post.description}
										<p class="text-base-content/70">{post.description}</p>
									{/if}
									<div class="card-actions justify-between items-center mt-4">
										<span class="badge badge-outline">{post.categoryId}</span>
										<a href="/blog/{post.id}" class="btn btn-primary btn-sm">Read More</a>
									</div>
								</div>
							</article>
						{/each}
					</div>
				</section>
			{/if}

			<!-- No Posts Message -->
			{#if posts.length === 0 && subcategoryPosts.length === 0}
				<div class="text-center py-12">
					<h2 class="text-2xl font-bold mb-4">No Posts Yet</h2>
					<p class="text-base-content/70">
						There are no posts in this category or its subcategories yet.
					</p>
				</div>
			{/if}
		</div>
	</main>
</div>
