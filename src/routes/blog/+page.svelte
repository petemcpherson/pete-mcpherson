<script>
	
	/**
	 * @typedef {Object} Props
	 * @property {import('./$types').PageData} data
	 */

	/** @type {Props} */
	let { data } = $props();

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

<div class="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
	<header class="mb-12 max-w-2xl md:mb-16">
		<h1 class="text-5xl font-extrabold md:text-7xl">The blog</h1>
		<p class="mt-4 text-xl text-base-content/75">
			Notes on building stuff, tech I'm nerding out on, and whatever else I can't stop thinking
			about.
		</p>
	</header>
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each posts as post}
			<a
				href={`/blog/${post.slug}`}
				class="group flex flex-col rounded-box border-2 border-neutral bg-base-100 p-6 shadow-key transition-[translate,box-shadow] duration-100 hover:-translate-y-1 hover:shadow-pop focus-visible:-translate-y-1 focus-visible:shadow-pop"
			>
				<p class="font-display text-sm font-bold text-base-content/60">
					{formatDate(post.created || post.updated)}
				</p>
				<h2 class="mt-2 text-2xl font-extrabold group-hover:text-primary md:text-3xl">
					{post.title}
				</h2>
				{#if post.description}
					<p class="mt-3 text-base-content/75">{post.description}</p>
				{/if}
				{#if post.tags && post.tags.length > 0}
					<div class="mt-auto flex flex-wrap gap-2 pt-6">
						{#each post.tags as tag}
							<span class="badge badge-secondary font-bold">{tag}</span>
						{/each}
					</div>
				{/if}
			</a>
		{/each}
	</div>
</div>
