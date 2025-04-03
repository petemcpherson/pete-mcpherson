<script>
	import { enhance } from '$app/forms';
	/** @type {{ data: import('./$types').PageData, form: { error?: string; success?: string } }} */
	let { data, form } = $props();

	let message = $state('');
	let messageType = $state('');

	$effect(() => {
		if (form?.error) {
			message = form.error;
			messageType = 'error';
		} else if (form?.success) {
			message = 'Post deleted successfully';
			messageType = 'success';
		}
	});

	function formatDate(dateString) {
		if (!dateString) return '';
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function handleDelete({ result }) {
		if (result?.success) {
			message = 'Post deleted successfully';
			messageType = 'success';
		} else if (result?.error) {
			message = result.error;
			messageType = 'error';
		}
	}
</script>

<div class="container mx-auto p-4">
	<div class="flex justify-between items-center mb-8">
		<h1 class="text-3xl font-bold">Posts</h1>
		<a href="/admin/posts/new" class="btn btn-primary">New Post</a>
	</div>

	{#if message}
		<div class="alert {messageType === 'error' ? 'alert-error' : 'alert-success'} mb-6">
			<span>{message}</span>
		</div>
	{/if}

	{#if data.posts.length === 0}
		<div class="text-center py-8">
			<p class="text-gray-500">No posts found. Create your first post!</p>
		</div>
	{:else}
		<div class="overflow-x-auto">
			<table class="table w-full">
				<thead>
					<tr>
						<th>Title</th>
						<th>Category</th>
						<th>Status</th>
						<th>Last Updated</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each data.posts as post}
						<tr>
							<td>
								<div class="font-medium">{post.title}</div>
							</td>
							<td>{post.category}</td>
							<td>
								<span class="badge badge-{post.status === 'published' ? 'success' : 'warning'}">
									{post.status}
								</span>
							</td>
							<td>{formatDate(post.updated)}</td>
							<td>
								<div class="flex gap-2">
									<a href="/admin/posts/new?edit={post.id}" class="btn btn-sm btn-ghost"> Edit </a>
									<a href="/{post.slug}" class="btn btn-sm btn-ghost" target="_blank"> View </a>
									<form method="POST" action="?/delete" use:enhance={handleDelete} class="inline">
										<input type="hidden" name="id" value={post.id} />
										<button
											type="submit"
											class="btn btn-sm btn-ghost text-error"
											onclick={(e) => {
												if (!confirm('Are you sure you want to delete this post?')) {
													e.preventDefault();
												}
											}}
										>
											Delete
										</button>
									</form>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
