<script>
	import { enhance } from '$app/forms';
	/** @type {{ data: import('./$types').PageData, form: { error?: string; success?: string } }} */
	let { data, form } = $props();

	let message = $state('');
	let messageType = $state('');
	let showCreateForm = $state(false);
	let editingTag = $state(null);

	$effect(() => {
		if (form?.error) {
			message = form.error;
			messageType = 'error';
		} else if (form?.success) {
			message = 'Operation completed successfully';
			messageType = 'success';
			showCreateForm = false;
			editingTag = null;
		}
	});

	function handleSubmit({ result }) {
		if (result?.success) {
			message = 'Tag created successfully';
			messageType = 'success';
		} else if (result?.error) {
			message = result.error;
			messageType = 'error';
		}
	}

	function handleEdit({ result }) {
		if (result?.success) {
			message = 'Tag updated successfully';
			messageType = 'success';
		} else if (result?.error) {
			message = result.error;
			messageType = 'error';
		}
	}

	function handleDelete({ result }) {
		if (result?.success) {
			message = 'Tag deleted successfully';
			messageType = 'success';
		} else if (result?.error) {
			message = result.error;
			messageType = 'error';
		}
	}

	function startEdit(tag) {
		editingTag = { ...tag };
	}

	function cancelEdit() {
		editingTag = null;
	}
</script>

<div class="container mx-auto p-4">
	<div class="flex justify-between items-center mb-8">
		<h1 class="text-3xl font-bold">Tags</h1>
		<button class="btn btn-primary" onclick={() => (showCreateForm = !showCreateForm)}>
			{showCreateForm ? 'Cancel' : 'New Tag'}
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
				<h2 class="card-title">Create New Tag</h2>
				<form method="POST" action="?/create" use:enhance={handleSubmit} class="space-y-4">
					<div class="form-control">
						<label class="label" for="name">
							<span class="label-text">Tag Name</span>
						</label>
						<input type="text" id="name" name="name" class="input input-bordered" required />
					</div>
					<div class="card-actions justify-end">
						<button type="submit" class="btn btn-primary">Create Tag</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

	{#if data.tags.length === 0}
		<div class="text-center py-8">
			<p class="text-gray-500">No tags found. Create your first tag!</p>
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
					{#each data.tags as tag, i}
						<tr>
							<th>{i + 1}</th>
							<td>
								{#if editingTag?.id === tag.id}
									<form
										method="POST"
										action="?/edit"
										use:enhance={handleEdit}
										class="flex gap-2 items-center"
									>
										<input type="hidden" name="oldId" value={tag.id} />
										<input
											type="text"
											name="newName"
											class="input input-sm input-bordered bg-primary-content text-primary"
											value={editingTag.name}
											required
										/>
										<button type="submit" class="btn btn-sm">Save</button>
										<button type="button" class="btn btn-sm btn-ghost" onclick={cancelEdit}>
											Cancel
										</button>
									</form>
								{:else}
									{tag.name}
								{/if}
							</td>
							<td>
								{#if !editingTag || editingTag.id !== tag.id}
									<div class="flex gap-2">
										<button class="btn btn-sm btn-ghost" onclick={() => startEdit(tag)}>
											Edit
										</button>
										<form method="POST" action="?/delete" use:enhance={handleDelete} class="inline">
											<input type="hidden" name="id" value={tag.id} />
											<button
												type="submit"
												class="btn btn-sm btn-error"
												onclick={(e) => {
													if (!confirm('Are you sure you want to delete this tag?')) {
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
				</tbody>
			</table>
		</div>
	{/if}
</div>
