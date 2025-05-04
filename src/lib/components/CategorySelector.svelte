<script>
	/** @type {Array<{id: string, name: string, children?: Array<{id: string, name: string, children?: Array<{id: string, name: string}>}>}>} */

	let { categories, selectedCategoryId = $bindable('') } = $props();

	// Create a flattened list of categories with proper indentation for the select element
	let flattenedCategories = $derived(
		categories.reduce((acc, category) => {
			// Add root category
			acc.push({ id: category.id, name: category.name, level: 0 });

			// Add level 1 subcategories
			if (category.children?.length) {
				category.children.forEach((subcat) => {
					acc.push({ id: subcat.id, name: subcat.name, level: 1 });

					// Add level 2 subcategories
					if (subcat.children?.length) {
						subcat.children.forEach((subsubcat) => {
							acc.push({ id: subsubcat.id, name: subsubcat.name, level: 2 });
						});
					}
				});
			}
			return acc;
		}, [])
	);

	function getIndentation(level) {
		switch (level) {
			case 1:
				return '└─ ';
			case 2:
				return '└── ';
			default:
				return '';
		}
	}
</script>

<div class="form-control w-full">
	<label class="label" for="category">
		<span class="label-text">Category</span>
	</label>
	<select id="category" class="select select-bordered w-full" bind:value={selectedCategoryId}>
		<option value="">Select a category</option>
		{#each flattenedCategories as category}
			<option value={category.id}>
				{getIndentation(category.level)}{category.name}
			</option>
		{/each}
	</select>
</div>
