<script>
	import '../app.css';
	import Analytics from '$lib/components/Analytics.svelte';

	let { children } = $props();
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<div class="dropdown">
			<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</div>
			<ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
				<li><a href="/blog">Blog</a></li>
				<li><a href="/about">About</a></li>
				<!-- <li><a href="/salesy-mcsales-landing-page">LNDNG PGE</a></li> -->
				<li>
					<a href="https://indiepa.ge/pete" target="_blank" rel="noreferrer noopener">Projects</a>
				</li>
			</ul>
		</div>
		<a href="/" class="mx-1 md:mx-5 text-xl special-font">Pete McPherson</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/blog">Blog</a></li>
			<li><a href="/about">About</a></li>
			<!-- <li><a href="/salesy-mcsales-landing-page">LNDNG PGE</a></li> -->
			<li>
				<a href="https://indiepa.ge/pete" target="_blank" rel="noreferrer noopener">Projects</a>
			</li>
		</ul>
	</div>

	<div class="navbar-end">
		<div class="mx-1 md:mx-5 flex self-center">
			<label class="swap swap-rotate">
				<!-- this hidden checkbox controls the state -->
				<!-- ASDF theme to switch to in the "value" below!! I.else. light mode/dark mode -->
				<input type="checkbox" class="theme-controller" value="cupcake" />
				<!-- sun icon -->
				<svg
					class="swap-off fill-current h-5 md:h-10"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					><path
						d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
					/></svg
				>
				<!-- moon icon -->
				<svg
					class="swap-on fill-current h-5 md:h-10"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					><path
						d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
					/></svg
				>
			</label>
		</div>
		<!-- <a href="/" class="btn btn-primary">I'm a button</a> -->
	</div>
</div>
{@render children()}

<!-- fixed message -->
<div class="fixed bottom-3 right-3 p-2 border border-dotted bg-neutral text-neutral-content">
	<p>
		<a href="https://ez-site.pages.dev/" target="_blank" rel="noferrer noopener"
			>Steal this website template for free.</a
		>
	</p>
</div>

<!-- footer section -->

<footer class="footer mt-10 p-10 bg-neutral text-neutral-content">
	<div class=" flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
		<div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-left">
			<h2>Pete McPherson</h2>
			<!-- <img src={asdf IMAGENAME} alt="asdf IMAGE NAME" class="h-11" /> -->

			<p class="mt-3 text-sm text-neutral-content/80">Yo! Thanks for visiting my page ;)</p>
			<p class="mt-3 text-sm text-neutral-content/60">Copyright © 2024 - All rights reserved</p>
		</div>
	</div>
	<nav>
		<h6 class="footer-title">Links</h6>
		<a
			class="link link-hover"
			href="mailto:pete@doyouevenblog.com"
			target="_blank"
			rel="noreferrer noopener">Email Me</a
		>
		<a class="link link-hover" href="/about" target="_blank" rel="noreferrer noopener">About</a>
		<!-- <button class="link link-hover" onclick="my_modal_1.showModal()">Pop-up!</button> -->
		<!-- <dialog id="my_modal_1" class="modal">
			<div class="modal-box text-neutral">
				<h3 class="font-bold text-lg mb-2">This is a pop-up message!</h3>
				<p class="mb-2">I'm not sure what else to say.</p>
				<p class="mb-2">So I suppose I'll stop now. ;)</p>

				<div class="modal-action">
					<form method="dialog">
						<button class="btn">Close</button>
					</form>
				</div>
			</div>
		</dialog> -->
	</nav>
	<nav>
		<h6 class="footer-title">Apps</h6>
		<a class="link link-hover" href="https://fabb.ai/" target="_blank" rel="noferrer noopener"
			>FABB.ai</a
		>
		<a class="link link-hover" href="https://topicalmap.ai/" target="_blank" rel="noferrer noopener"
			>TopicalMap.ai</a
		>
		<a
			class="link link-hover"
			href="https://promptimizer.com/"
			target="_blank"
			rel="noferrer noopener">Promptimizer</a
		>
		<a
			class="link link-hover"
			href="https://ez-site.pages.dev/"
			target="_blank"
			rel="noferrer noopener">EZ-SITE</a
		>
		<a class="link link-hover" href="https://ezcour.se/" target="_blank" rel="noferrer noopener"
			>EZ-COURSE</a
		>
	</nav>
	<nav>
		<h6 class="footer-title">Brands of Mine</h6>
		<a
			class="link link-hover"
			href="https://doyouevenblog.com/"
			target="_blank"
			rel="noferrer noopener"
		>
			Do You Even Blog
		</a>
		<a class="link link-hover" href="https://keebnews.com/" target="_blank" rel="noferrer noopener"
			>KeebNews</a
		>
		<a
			class="link link-hover"
			href="https://betternotetaking.com/"
			target="_blank"
			rel="noferrer noopener">Better Note Taking</a
		>
		<a
			class="link link-hover"
			href="https://doyouevenpizza.com/"
			target="_blank"
			rel="noferrer noopener">Do You Even Pizza</a
		>
	</nav>
</footer>

<Analytics />

<style>
	:global(body) {
		font-family: 'Synonym', sans-serif;
	}

	:global(h1, h2, h3, h4, h5, h6, .special-font) {
		font-family: 'Chillax', sans-serif;
	}
</style>
