<script>
	import Head from '$lib/components/Head.svelte';
	export let data;

	const post = data.post;
	const title = post.title;
	const description = post.description;
</script>

<Head {title} {description} />

<!-- start content -->
