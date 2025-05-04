<script>
	/** @type {{ data: import('./$types').PageData }} */
	// let { data } = $props();

	// console.log('data: ', data.user);
</script>

<div class="p-4">
	<h1 class="text-3xl font-bold mb-8">Admin Dashboard</h1>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		<!-- Posts Card -->
		<div class="card bg-base-200 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">Posts</h2>
				<p>Manage your blog posts</p>
				<div class="card-actions justify-end">
					<a href="/admin/posts" class="btn btn-primary">View Posts</a>
				</div>
			</div>
		</div>
	</div>
</div>
