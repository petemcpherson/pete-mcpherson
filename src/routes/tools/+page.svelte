<script>
	import Head from '$lib/components/Head.svelte';
	let { data } = $props();

	const post = data.post;
	const title = post.title;
	const description = post.description;
</script>

<Head {title} {description} />

<!-- start content -->
