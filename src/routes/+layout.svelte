<script>
	import '../app.css';
	import Analytics from '$lib/components/Analytics.svelte';

	let { children } = $props();
</script>

<header class="sticky top-0 z-40 border-b-2 border-neutral bg-base-100/90 backdrop-blur">
	<div class="navbar mx-auto max-w-6xl px-2 md:px-6">
		<div class="navbar-start gap-1">
			<div class="dropdown">
				<div tabindex="0" role="button" class="btn btn-ghost lg:hidden" aria-label="Open menu">
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
				<ul
					class="menu menu-sm dropdown-content mt-3 z-[1] w-52 rounded-box border-2 border-neutral bg-base-100 p-2 shadow-pop"
				>
					<li><a href="/blog">Blog</a></li>
					<li><a href="/about">About</a></li>
					<li>
						<a href="/projects" target="_blank" rel="noreferrer noopener">Projects</a>
					</li>
				</ul>
			</div>
			<a href="/" class="group flex items-center gap-2" aria-label="Pete McPherson, home">
				<span class="flex gap-0.5 transition-transform group-hover:-rotate-3" aria-hidden="true">
					<kbd class="kbd kbd-sm bg-accent text-accent-content">P</kbd><kbd
						class="kbd kbd-sm bg-secondary text-secondary-content">M</kbd
					>
				</span>
				<span class="special-font whitespace-nowrap text-base font-extrabold tracking-tight sm:text-lg md:text-xl">Pete McPherson</span>
			</a>
		</div>
		<div class="navbar-center hidden lg:flex">
			<ul class="menu menu-horizontal gap-1 px-1 text-base font-bold">
				<li><a href="/blog">Blog</a></li>
				<li><a href="/about">About</a></li>
				<li>
					<a href="/projects" target="_blank" rel="noreferrer noopener">Projects</a>
				</li>
			</ul>
		</div>

		<div class="navbar-end">
			<label class="swap swap-rotate btn btn-ghost btn-circle" aria-label="Toggle dark mode">
				<input type="checkbox" class="theme-controller" value="pete-night" />
				<!-- sun icon -->
				<svg class="swap-off h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><path
						d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
					/></svg
				>
				<!-- moon icon -->
				<svg class="swap-on h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><path
						d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
					/></svg
				>
			</label>
		</div>
	</div>
</header>
{@render children()}

<!-- fixed message -->
<a
	href="https://ez-site.pages.dev/"
	target="_blank"
	rel="noreferrer noopener"
	class="btn btn-sm btn-accent fixed bottom-4 right-4 z-30 -rotate-2 hover:rotate-0"
	>Steal this website template (free)</a
>

<!-- footer section -->

<footer
	class="footer mt-16 border-t-2 border-neutral bg-neutral p-10 pb-24 text-neutral-content sm:footer-horizontal md:px-[max(1.5rem,calc((100%-72rem)/2+1.5rem))]"
>
	<div class=" flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
		<div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-left">
			<h2 class="text-3xl font-extrabold">Pete McPherson</h2>
			<!-- <img src={asdf IMAGENAME} alt="asdf IMAGE NAME" class="h-11" /> -->

			<p class="mt-3 font-serif text-base text-neutral-content/80">
				Yo! Thanks for visiting. Go make the internet a little weirder today.
			</p>
			<p class="mt-3 text-sm text-neutral-content/60">Copyright © 2026 - All rights reserved</p>
		</div>
	</div>
	<nav>
		<h6 class="footer-title text-accent opacity-100 normal-case tracking-normal text-base">Links</h6>
		<a
			class="link link-hover hover:text-accent"
			href="mailto:pete@petemcpherson.com"
			target="_blank"
			rel="noreferrer noopener">Email Me</a
		>
		<a class="link link-hover hover:text-accent" href="/about" target="_blank" rel="noreferrer noopener">About</a>
		<a class="link link-hover hover:text-accent" href="/blog" target="_blank" rel="noreferrer noopener">Blog</a>
		<a class="link link-hover hover:text-accent" href="/projects" target="_blank" rel="noreferrer noopener"
			>Projects</a
		>
		<!-- <button class="link link-hover hover:text-accent" onclick="my_modal_1.showModal()">Pop-up!</button> -->
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
		<h6 class="footer-title text-accent opacity-100 normal-case tracking-normal text-base">Apps</h6>
		<a class="link link-hover hover:text-accent" href="https://peteclub.com/" target="_blank" rel="noferrer noopener"
			><span class="font-black">Pete Club</span> - 1 membership. All my apps.</a
		><a
			class="link link-hover hover:text-accent"
			href="https://bulletfinity.com/"
			target="_blank"
			rel="noferrer noopener"
			><span class="font-black">Bulletfinity</span> - Infinite Bullet Note‑Taking</a
		>
		
		<a
			class="link link-hover hover:text-accent"
			href="https://bananathumbs.peteclub.com/"
			target="_blank"
			rel="noferrer noopener"
			><span class="font-black">Banana Thumbs</span> - AI YouTube thumbnails.</a
		>
		<a
			class="link link-hover hover:text-accent"
			href="https://quik.events/"
			target="_blank"
			rel="noferrer noopener"
			><span class="font-black">Quik Events</span> - Lightning fast "add to cal" pages.</a
		>
		<a
			class="link link-hover hover:text-accent"
			href="https://listgadget.com/"
			target="_blank"
			rel="noferrer noopener"
			><span class="font-black">List Gadget</span> - Interactive newsletter widgets.</a
		>
	</nav>
	<nav>
		<h6 class="footer-title text-accent opacity-100 normal-case tracking-normal text-base">Brands of Mine</h6>
		<a
			class="link link-hover hover:text-accent"
			href="https://doyouevenblog.com/"
			target="_blank"
			rel="noferrer noopener"
		>
			Do You Even Blog
		</a>
		<a class="link link-hover hover:text-accent" href="https://keebnews.com/" target="_blank" rel="noferrer noopener"
			>KeebNews</a
		>
		<a
			class="link link-hover hover:text-accent"
			href="https://betternotetaking.com/"
			target="_blank"
			rel="noferrer noopener">Better Note Taking</a
		>
		<a
			class="link link-hover hover:text-accent"
			href="https://doyouevenpizza.com/"
			target="_blank"
			rel="noferrer noopener">Do You Even Pizza</a
		>
	</nav>
</footer>

<Analytics />
