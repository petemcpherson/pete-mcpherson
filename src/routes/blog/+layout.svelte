<script>
	import Emailpopup from '$lib/components/Emailpopup.svelte';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

{@render children()}

<Emailpopup />
