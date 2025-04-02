<script>
	import { config } from '$lib/config';
	// you can optionally import a share image here for the entire site?
	import socialImage from '$lib/assets/images/socialImage.png';

	// export let rtl = false;
	// let titleFromUrl = url.split('/').pop().replace('-', ' ');
	
	/**
	 * @typedef {Object} Props
	 * @property {string} [title]
	 * @property {any} [description]
	 * @property {any} [author]
	 * @property {any} [url]
	 * @property {any} [domain]
	 * @property {any} [img] - export let img = `${url}/og?message=${rtl ? titleFromUrl : title}`;
	 */

	/** @type {Props} */
	let {
		title = 'Pete McPherson',
		description = config.description,
		author = config.author,
		url = config.siteUrl,
		domain = config.domain,
		img = socialImage
	} = $props();
</script>

<svelte:head>
	<title>{title} | {config.title}</title>
	<meta name="description" content={description} />
	<meta name="author" content={author} />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content={url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={img} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={domain} />
	<meta property="twitter:url" content={url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={img} />
</svelte:head>
