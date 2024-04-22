<script>
	/** @type {import('./$types').LayoutData} */
	import '../app.css';
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
				<li><a href="/about">About</a></li>
				<li>
					<a href="/">Parent</a>
					<ul class="p-2">
						<li><a href="/">Submenu 1</a></li>
						<li><a href="/">Submenu 2</a></li>
					</ul>
				</li>
				<li><a href="/speaking">Speaking</a></li>
			</ul>
		</div>
		<a href="/" class="btn btn-ghost text-xl">EZ SITE</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/about">About</a></li>
			<li>
				<details>
					<summary>Parent</summary>
					<ul class="p-2">
						<li><a href="/">Submenu 1</a></li>
						<li><a href="/">Submenu 2</a></li>
					</ul>
				</details>
			</li>
			<li><a href="/speaking">Speaking</a></li>
		</ul>
	</div>
	<div class="navbar-end">
		<a href="/" class="btn">Click me</a>
	</div>
</div>
<slot />

<!-- footer section -->

<footer class="footer mt-10 p-10 bg-neutral text-neutral-content">
	<div class=" flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
		<div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-left">
			<h2>EZ-SITE</h2>
			<!-- <img src={asdf IMAGENAME} alt="asdf IMAGE NAME" class="h-11" /> -->

			<p class="mt-3 text-sm text-neutral-content/80">This is a super short tagline.</p>
			<p class="mt-3 text-sm text-neutral-content/60">Copyright © 2024 - All rights reserved</p>
		</div>
	</div>
	<nav>
		<h6 class="footer-title">Links</h6>
		<a
			class="link link-hover"
			href="mailto:youremail@example.com"
			target="_blank"
			rel="noreferrer noopener">Email Us</a
		>
		<a class="link link-hover" href="/" target="_blank" rel="noreferrer noopener">Docs</a>
		<button class="link link-hover" onclick="my_modal_1.showModal()">Pop-up!</button>
		<dialog id="my_modal_1" class="modal">
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
		</dialog>
		<a class="link link-hover" href="/#pricing">Pricing</a>
	</nav>
	<nav>
		<h6 class="footer-title">Legal</h6>
		<a class="link link-hover" href="/">Terms of Service</a>
		<a class="link link-hover" href="/">Privacy Policy</a>
	</nav>
	<nav>
		<h6 class="footer-title">Other Stuff</h6>
		<a class="link link-hover" href="/" target="_blank" rel="noferrer noopener">
			Some other link
		</a>
		<a class="link link-hover" href="/" target="_blank" rel="noferrer noopener">Yet another link</a>
	</nav>
</footer>
