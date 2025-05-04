<script>
	import { enhance } from '$app/forms';
	/** @type {{ data: import('./$types').PageData, form: { error?: string; success?: string } }} */
	let { data, form } = $props();

	let message = $state('');
	let messageType = $state('');
	let showCreateForm = $state(false);
	let editingCategory = $state(null);
	let selectedParentId = $state(null);

	$effect(() => {
		if (form?.error) {
			message = form.error;
			messageType = 'error';
		} else if (form?.success) {
			message = 'Operation completed successfully';
			messageType = 'success';
			showCreateForm = false;
			editingCategory = null;
			selectedParentId = null;
		}
	});

	function handleSubmit({ result }) {
		if (result?.success) {
			message = 'Category created successfully';
			messageType = 'success';
		} else if (result?.error) {
			message = result.error;
			messageType = 'error';
		}
	}

	function handleEdit({ result }) {
		if (result?.success) {
			message = 'Category updated successfully';
			messageType = 'success';
		} else if (result?.error) {
			message = result.error;
			messageType = 'error';
		}
	}

	function handleDelete({ result }) {
		if (result?.success) {
			message = 'Category deleted successfully';
			messageType = 'success';
		} else if (result?.error) {
			message = result.error;
			messageType = 'error';
		}
	}

	function startEdit(category) {
		editingCategory = { ...category };
		selectedParentId = category.parentId;
	}

	function cancelEdit() {
		editingCategory = null;
		selectedParentId = null;
	}

	function getAvailableParents(currentCategoryId = null) {
		// Filter out the current category and its children to prevent circular references
		return data.allCategories.filter((cat) => {
			if (cat.id === currentCategoryId) return false;
			if (!currentCategoryId) return true;

			function isDescendant(parentId, childId) {
				if (parentId === childId) return true;
				const children = data.allCategories.filter((c) => c.parentId === childId);
				return children.some((child) => isDescendant(parentId, child.id));
			}

			return !isDescendant(currentCategoryId, cat.id);
		});
	}

	function getIndentClass(level) {
		switch (level) {
			case 1:
				return 'pl-8';
			case 2:
				return 'pl-12';
			default:
				return '';
		}
	}

	function getPrefix(level) {
		switch (level) {
			case 1:
				return '└─';
			case 2:
				return '└──';
			default:
				return '';
		}
	}
</script>

<div class="container mx-auto p-4">
	<div class="flex justify-between items-center mb-8">
		<h1 class="text-3xl font-bold">Categories</h1>
		<button class="btn btn-primary" onclick={() => (showCreateForm = !showCreateForm)}>
			{showCreateForm ? 'Cancel' : 'New Category'}
		</button>
	</div>

	{#if message}
		<div class="alert {messageType === 'error' ? 'alert-error' : 'alert-success'} mb-6">
			<span>{message}</span>
		</div>
	{/if}

	{#if showCreateForm}
		<div class="card bg-base-200 mb-8">
			<div class="card-body">
				<h2 class="card-title">Create New Category</h2>
				<form method="POST" action="?/create" use:enhance={handleSubmit} class="space-y-4">
					<div class="form-control">
						<label class="label" for="name">
							<span class="label-text">Category Name</span>
						</label>
						<input type="text" id="name" name="name" class="input input-bordered" required />
					</div>
					<div class="form-control">
						<label class="label" for="parentId">
							<span class="label-text">Parent Category (optional)</span>
						</label>
						<select id="parentId" name="parentId" class="select select-bordered">
							<option value="">None (Root Category)</option>
							{#each getAvailableParents() as category}
								<option value={category.id}>{category.name}</option>
							{/each}
						</select>
					</div>
					<div class="card-actions justify-end">
						<button type="submit" class="btn btn-primary">Create Category</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

	{#if data.categories.length === 0}
		<div class="text-center py-8">
			<p class="text-gray-500">No categories found. Create your first category!</p>
		</div>
	{:else}
		<div
			class="overflow-x-auto rounded-box border border-base-content/5 bg-primary text-primary-content"
		>
			<table class="table">
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each data.categories as category, i}
						<!-- Root category -->
						<tr>
							<th>{i + 1}</th>
							<td>
								{#if editingCategory?.id === category.id}
									<form
										method="POST"
										action="?/edit"
										use:enhance={handleEdit}
										class="flex gap-2 items-center"
									>
										<input type="hidden" name="oldId" value={category.id} />
										<div class="flex flex-col gap-2 w-full">
											<input
												type="text"
												name="newName"
												class="input input-sm input-bordered bg-primary-content text-primary"
												value={editingCategory.name}
												required
											/>
											<select
												name="newParentId"
												class="select select-sm select-bordered bg-primary-content text-primary"
												bind:value={selectedParentId}
											>
												<option value="">None (Root Category)</option>
												{#each getAvailableParents(category.id) as parent}
													<option value={parent.id}>{parent.name}</option>
												{/each}
											</select>
										</div>
										<div class="flex gap-2">
											<button type="submit" class="btn btn-sm">Save</button>
											<button type="button" class="btn btn-sm btn-ghost" onclick={cancelEdit}>
												Cancel
											</button>
										</div>
									</form>
								{:else}
									<span class="font-semibold">{category.name}</span>
								{/if}
							</td>
							<td>
								{#if !editingCategory || editingCategory.id !== category.id}
									<div class="flex gap-2">
										<button class="btn btn-sm btn-ghost" onclick={() => startEdit(category)}>
											Edit
										</button>
										<form method="POST" action="?/delete" use:enhance={handleDelete} class="inline">
											<input type="hidden" name="id" value={category.id} />
											<button
												type="submit"
												class="btn btn-sm btn-error"
												onclick={(e) => {
													if (!confirm('Are you sure you want to delete this category?')) {
														e.preventDefault();
													}
												}}
											>
												Delete
											</button>
										</form>
									</div>
								{/if}
							</td>
						</tr>

						<!-- Level 1 subcategories -->
						{#if category.children?.length}
							{#each category.children as subcategory}
								<tr>
									<th></th>
									<td class={getIndentClass(1)}>
										{#if editingCategory?.id === subcategory.id}
											<form
												method="POST"
												action="?/edit"
												use:enhance={handleEdit}
												class="flex gap-2 items-center"
											>
												<input type="hidden" name="oldId" value={subcategory.id} />
												<div class="flex flex-col gap-2 w-full">
													<input
														type="text"
														name="newName"
														class="input input-sm input-bordered bg-primary-content text-primary"
														value={editingCategory.name}
														required
													/>
													<select
														name="newParentId"
														class="select select-sm select-bordered bg-primary-content text-primary"
														bind:value={selectedParentId}
													>
														<option value="">None (Root Category)</option>
														{#each getAvailableParents(subcategory.id) as parent}
															<option value={parent.id}>{parent.name}</option>
														{/each}
													</select>
												</div>
												<div class="flex gap-2">
													<button type="submit" class="btn btn-sm">Save</button>
													<button type="button" class="btn btn-sm btn-ghost" onclick={cancelEdit}>
														Cancel
													</button>
												</div>
											</form>
										{:else}
											<span class="text-sm">{getPrefix(1)} {subcategory.name}</span>
										{/if}
									</td>
									<td>
										{#if !editingCategory || editingCategory.id !== subcategory.id}
											<div class="flex gap-2">
												<button class="btn btn-sm btn-ghost" onclick={() => startEdit(subcategory)}>
													Edit
												</button>
												<form
													method="POST"
													action="?/delete"
													use:enhance={handleDelete}
													class="inline"
												>
													<input type="hidden" name="id" value={subcategory.id} />
													<button
														type="submit"
														class="btn btn-sm btn-error"
														onclick={(e) => {
															if (!confirm('Are you sure you want to delete this category?')) {
																e.preventDefault();
															}
														}}
													>
														Delete
													</button>
												</form>
											</div>
										{/if}
									</td>
								</tr>

								<!-- Level 2 subcategories (subsubcategories) -->
								{#if subcategory.children?.length}
									{#each subcategory.children as subsubcategory}
										<tr>
											<th></th>
											<td class={getIndentClass(2)}>
												{#if editingCategory?.id === subsubcategory.id}
													<form
														method="POST"
														action="?/edit"
														use:enhance={handleEdit}
														class="flex gap-2 items-center"
													>
														<input type="hidden" name="oldId" value={subsubcategory.id} />
														<div class="flex flex-col gap-2 w-full">
															<input
																type="text"
																name="newName"
																class="input input-sm input-bordered bg-primary-content text-primary"
																value={editingCategory.name}
																required
															/>
															<select
																name="newParentId"
																class="select select-sm select-bordered bg-primary-content text-primary"
																bind:value={selectedParentId}
															>
																<option value="">None (Root Category)</option>
																{#each getAvailableParents(subsubcategory.id) as parent}
																	<option value={parent.id}>{parent.name}</option>
																{/each}
															</select>
														</div>
														<div class="flex gap-2">
															<button type="submit" class="btn btn-sm">Save</button>
															<button
																type="button"
																class="btn btn-sm btn-ghost"
																onclick={cancelEdit}
															>
																Cancel
															</button>
														</div>
													</form>
												{:else}
													<span class="text-sm">{getPrefix(2)} {subsubcategory.name}</span>
												{/if}
											</td>
											<td>
												{#if !editingCategory || editingCategory.id !== subsubcategory.id}
													<div class="flex gap-2">
														<button
															class="btn btn-sm btn-ghost"
															onclick={() => startEdit(subsubcategory)}
														>
															Edit
														</button>
														<form
															method="POST"
															action="?/delete"
															use:enhance={handleDelete}
															class="inline"
														>
															<input type="hidden" name="id" value={subsubcategory.id} />
															<button
																type="submit"
																class="btn btn-sm btn-error"
																onclick={(e) => {
																	if (!confirm('Are you sure you want to delete this category?')) {
																		e.preventDefault();
																	}
																}}
															>
																Delete
															</button>
														</form>
													</div>
												{/if}
											</td>
										</tr>
									{/each}
								{/if}
							{/each}
						{/if}
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
