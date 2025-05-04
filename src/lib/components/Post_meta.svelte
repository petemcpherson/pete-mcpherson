<script>
	import pete_avatar from '$lib/assets/images/pete_avatar.png';

	let {
		author = 'Pete McPherson',
		updated = '',
		tags = [],
		category = '',
		categoryHierarchy = [],
		title = ''
	} = $props();

	// Format the date to be more readable
	const formattedDate = $derived(
		updated
			? new Date(updated).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})
			: ''
	);
</script>

<!-- Top section with author info and tags -->
<div class="flex flex-col space-y-4">
	<div class="flex flex-col md:flex-row flex-wrap gap-1 md:gap-4 items-start md:items-center">
		<p class="font-bold text-sm">Written by {author}</p>
		<img src={pete_avatar} alt="Pete McPherson" class="w-8 md:w-12 h-8 md:h-12 rounded-full" />
		<p class="text-sm text-gray-600">Updated: {formattedDate}</p>
		<!-- tags -->
		{#if tags.length > 0}
			<div class="flex flex-wrap items-center justify-start md:justify-end gap-2">
				<p class="text-sm">Tags:</p>
				{#each tags as tag}
					<span class="badge badge-primary">
						{tag}
					</span>
				{/each}
			</div>
		{/if}
	</div>

	<!-- breadcrumb -->
	{#if categoryHierarchy.length > 0}
		<div class="breadcrumbs text-sm !mt-0 !p-0">
			<ul class="!m-0 !p-0">
				<li class="!m-0 !p-0"><a href="/blog">Blog</a></li>
				{#each categoryHierarchy as category}
					<li class="!m-0 !p-0">
						<a href="/blog/category/{category.id}">{category.name}</a>
					</li>
				{/each}
				{#if title}
					<li>{title}</li>
				{/if}
			</ul>
		</div>
	{/if}
</div>
