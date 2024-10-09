<script>
	/** @type {import('./$types').PageData} */
	export let data;

	const posts = data.posts;
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-4xl font-bold mb-8">Pete's Blog</h1>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each posts as post}
			<a
				href={`/blog/${post.slug}`}
				class="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
			>
				<div class="p-6">
					<h2 class="text-xl font-semibold mb-2">{post.title}</h2>
					<p class="text-gray-600 mb-4">{post.updated}</p>
					<p class="text-gray-700">{post.description}</p>
				</div>
			</a>
		{/each}
	</div>
</div>
