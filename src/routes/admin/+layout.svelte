<script>
	/** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
	let props = $props();

	// Get the current path to highlight active nav items
	let currentPath = $state('');
	$effect(() => {
		currentPath = window.location.pathname;
	});
</script>

<div class="min-h-screen bg-base-100">
	<!-- Admin Navbar -->
	<div class="navbar bg-primary text-primary-content shadow-md">
		<div class="container mx-auto">
			<div class="flex-1">
				<a href="/admin" class="btn btn-ghost text-xl">Admin Dashboard</a>
			</div>
			<div class="flex-none">
				<ul class="menu menu-horizontal px-1">
					<li>
						<a href="/admin/posts"> Posts </a>
					</li>
					<li>
						<a href="/admin/tags"> Tags </a>
					</li>
					<li>
						<a href="/admin/categories"> Categories </a>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<!-- Main Content -->
	<main class="container mx-auto">
		{@render props.children()}
	</main>
</div>
