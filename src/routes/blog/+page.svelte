<script>
	/** @type {import('./$types').PageData} */
	export let data;

	// Sort posts by created date in descending order (newest first)
	const posts = data.posts.sort((a, b) => {
		const dateA = new Date(a.created || a.updated);
		const dateB = new Date(b.created || b.updated);
		return dateB - dateA;
	});

	const formatDate = (date) => {
		if (!date) return 'Date unavailable';
		const parsedDate = new Date(date);
		if (isNaN(parsedDate.getTime())) return 'Invalid date';
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return parsedDate.toLocaleDateString('en-US', options);
	};

	// console.log('Posts data:', posts); // For debugging
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-4xl font-bold mb-8">Pete's Blog</h1>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each posts as post}
			<a
				href={`/blog/${post.slug}`}
				class="block border border-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
			>
				<div class="p-6">
					<h2 class="text-xl md:text-3xl font-black mb-2">{post.title}</h2>
					<p class="mb-4">{formatDate(post.created || post.updated)}</p>
					<p class="text-base-content/70 mb-4">{post.description}</p>
					{#if post.tags && post.tags.length > 0}
						<div class="flex flex-wrap justify-start md:justify-end gap-2">
							{#each post.tags as tag}
								<span class="badge badge-primary">
									{tag}
								</span>
							{/each}
						</div>
					{/if}
				</div>
			</a>
		{/each}
	</div>
</div>
