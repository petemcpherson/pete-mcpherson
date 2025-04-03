<script>
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();

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

		<!-- Categories Card -->
		<div class="card bg-base-200 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">Categories</h2>
				<p>Manage post categories</p>
				<div class="card-actions justify-end">
					<a href="/admin/categories" class="btn btn-primary">View Categories</a>
				</div>
			</div>
		</div>

		<!-- Settings Card -->
		<div class="card bg-base-200 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">Settings</h2>
				<p>Configure your site settings</p>
				<div class="card-actions justify-end">
					<a href="/admin/settings" class="btn btn-primary">View Settings</a>
				</div>
			</div>
		</div>
	</div>
</div>
