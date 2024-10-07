<script>
	import pete_avatar from '$lib/assets/images/pete_avatar.png';

	export let author = 'Pete McPherson';
	export let updated = '';
	export let tags = [];
</script>

<div
	class="flex flex-col md:flex-row flex-wrap gap-1 md:gap-4 items-start md:items-center my-2 md:my-8"
>
	<p class="font-bold text-sm">Written by {author}</p>
	<img src={pete_avatar} alt="Pete McPherson" class="w-8 md:w-12 h-8 md:h-12 rounded-full" />

	<p class="text-sm text-gray-600">Updated: {updated}</p>
	<div class="md:text-right">
		{#if tags.length > 0}
			<div class="flex flex-wrap justify-start md:justify-end gap-2">
				{#each tags as tag}
					<span class="badge badge-primary">
						{tag}
					</span>
				{/each}
			</div>
		{/if}
	</div>
</div>
