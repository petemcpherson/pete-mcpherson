<script>
	import pete_is_cool from '$lib/assets/images/pete_is_cool.jpeg';
	// import pete_drinks_espresso from '$lib/assets/images/pete_drinks_espresso.jpeg';
	import Head from '$lib/components/Head.svelte';

	let email = $state('');

	const handleSubmit = async (event) => {
		event.preventDefault();

		let res;
		try {
			res = await fetch('/api/subscribe', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, source: 'newsletter' })
			});
		} catch (e) {
			console.error('Opt-in request failed', e);
			alert('Failed to submit email. Please try again.');
			return;
		}

		if (res.ok) {
			alert('Thanks for subscribing!');
		} else {
			const bodyText = await res.text().catch(() => '');
			let message = 'Failed to submit email. Please try again.';
			try {
				const parsed = JSON.parse(bodyText);
				message = parsed?.message || message;
			} catch {
				message = bodyText || message;
			}
			console.error('Failed to submit email', { status: res.status, body: bodyText });
			alert(message);
		}
	};

	// Original logo images (doyouevenblog.com uploads) 404'd, so these render as type
	// "Placeholder N" entries are stand-ins — swap for real outlets
	const featuredOn = [
		'Forbes',
		'NPR',
		'Business Insider',
		'Lifehacker',
		'The FinCon main stage',
		'Github',
		'a mechanical keyboard YouTube channel with 5M views',
		'The Atlantic',
		'The Side Hustle Show',
		'my pizza blog',
		'Smart Passive Income',
		'Making Sense of Cents',
		'This website',
		'My AI YouTube channel',
		'Product Hunt',
		'Costco on 28th street'
	];
	// just a note
</script>

<Head />

<div>
	<!-- hero -->
	<section class="mx-auto max-w-6xl px-4 pt-10 pb-16 md:px-6 lg:pt-20 lg:pb-24">
		<div class="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
			<div>
				<h1 class="text-5xl font-extrabold leading-[0.95] md:text-7xl lg:text-8xl">
					I build things that make the internet better.
				</h1>
				<p class="mt-8 max-w-xl text-xl leading-relaxed text-base-content/80">
					Hi, I'm Pete McPherson! I'm a former accountant turned entrepreneur, indie developer,
					blogger, podcaster, YouTuber. My mission is to make the internet fun (and useful) again.
				</p>
				<div class="mt-10 flex flex-wrap gap-4">
					<a href="/about" class="btn btn-primary btn-lg">Read my story</a>
					<a href="/blog" class="btn btn-lg">Browse the blog</a>
				</div>
			<!-- social icons -->
			<div class="mt-10 flex gap-5">
				<!-- twitter -->
				<a
					href="https://twitter.com/doyouevenblog/"
					target="_blank"
					rel="noreferrer noopener"
					class="text-base-content/60 transition-colors hover:text-primary"
					aria-label="Pete on Twitter"
				>
					<svg
						viewBox="0 0 24 24"
						aria-hidden="true"
						class="h-7 w-7 fill-current"
						><path
							d="M13.3174 10.7749L19.1457 4H17.7646L12.7039 9.88256L8.66193 4H4L10.1122 12.8955L4 20H5.38119L10.7254 13.7878L14.994 20H19.656L13.3171 10.7749H13.3174ZM11.4257 12.9738L10.8064 12.0881L5.87886 5.03974H8.00029L11.9769 10.728L12.5962 11.6137L17.7652 19.0075H15.6438L11.4257 12.9742V12.9738Z"
						></path></svg
					>
				</a>
				<!-- instagram -->
				<a
					href="https://www.instagram.com/bloggerpete"
					target="_blank"
					rel="noreferrer noopener"
					class="text-base-content/60 transition-colors hover:text-primary"
					aria-label="Pete on Instagram"
				>
					<svg
						viewBox="0 0 24 24"
						aria-hidden="true"
						class="h-7 w-7 fill-current"
						><path
							d="M12 3c-2.444 0-2.75.01-3.71.054-.959.044-1.613.196-2.185.418A4.412 4.412 0 0 0 4.51 4.511c-.5.5-.809 1.002-1.039 1.594-.222.572-.374 1.226-.418 2.184C3.01 9.25 3 9.556 3 12s.01 2.75.054 3.71c.044.959.196 1.613.418 2.185.23.592.538 1.094 1.039 1.595.5.5 1.002.808 1.594 1.038.572.222 1.226.374 2.184.418C9.25 20.99 9.556 21 12 21s2.75-.01 3.71-.054c.959-.044 1.613-.196 2.185-.419a4.412 4.412 0 0 0 1.595-1.038c.5-.5.808-1.002 1.038-1.594.222-.572.374-1.226.418-2.184.044-.96.054-1.267.054-3.711s-.01-2.75-.054-3.71c-.044-.959-.196-1.613-.419-2.185A4.412 4.412 0 0 0 19.49 4.51c-.5-.5-1.002-.809-1.594-1.039-.572-.222-1.226-.374-2.184-.418C14.75 3.01 14.444 3 12 3Zm0 1.622c2.403 0 2.688.009 3.637.052.877.04 1.354.187 1.67.31.421.163.72.358 1.036.673.315.315.51.615.673 1.035.123.317.27.794.31 1.671.043.95.052 1.234.052 3.637s-.009 2.688-.052 3.637c-.04.877-.187 1.354-.31 1.67-.163.421-.358.72-.673 1.036a2.79 2.79 0 0 1-1.035.673c-.317.123-.794.27-1.671.31-.95.043-1.234.052-3.637.052s-2.688-.009-3.637-.052c-.877-.04-1.354-.187-1.67-.31a2.789 2.789 0 0 1-1.036-.673 2.79 2.79 0 0 1-.673-1.035c-.123-.317-.27-.794-.31-1.671-.043-.95-.052-1.234-.052-3.637s.009-2.688.052-3.637c.04-.877.187-1.354.31-1.67.163-.421.358-.72.673-1.036.315-.315.615-.51 1.035-.673.317-.123.794-.27 1.671-.31.95-.043 1.234-.052 3.637-.052Z"
						></path><path
							d="M12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-7.622a4.622 4.622 0 1 0 0 9.244 4.622 4.622 0 0 0 0-9.244Zm5.884-.182a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0Z"
						></path></svg
					>
				</a>
				<!-- github -->
				<a
					href="https://github.com/petemcpherson"
					target="_blank"
					rel="noreferrer noopener"
					class="text-base-content/60 transition-colors hover:text-primary"
					aria-label="Pete on GitHub"
				>
					<svg
						viewBox="0 0 24 24"
						aria-hidden="true"
						class="h-7 w-7 fill-current"
						><path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z"
						></path></svg
					>
				</a>
				<!-- linkedIn -->
				<a
					href="https://www.linkedin.com/in/petemcpherson/"
					target="_blank"
					rel="noreferrer noopener"
					class="text-base-content/60 transition-colors hover:text-primary"
					aria-label="Pete on LinkedIn"
				>
					<svg
						viewBox="0 0 24 24"
						aria-hidden="true"
						class="h-7 w-7 fill-current"
						><path
							d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"
						></path></svg
					>
				</a>
			</div>
			</div>
			<figure class="relative mx-auto w-full max-w-md lg:max-w-none">
				<img
					src={pete_is_cool}
					alt="Pete McPherson"
					class="w-full rotate-2 rounded-box border-2 border-neutral shadow-pop-lg"
				/>
				<span
					class="absolute -bottom-5 -left-4 -rotate-6 rounded-full border-2 border-neutral bg-accent px-5 py-2 font-display text-lg font-extrabold text-accent-content shadow-key"
					>Hi, I'm Pete!</span
				>
			</figure>
		</div>
	</section>

	<!-- featured on marquee -->
	<section class="overflow-hidden border-y-2 border-neutral bg-accent py-8 text-accent-content">
		<p class="mx-auto max-w-6xl px-4 text-center font-display text-lg font-extrabold md:px-6">
			You may have seen me in
		</p>
		<!-- list is rendered twice; the track slides -50% so the loop is seamless -->
		<div class="marquee mt-6">
			<div class="marquee-track">
				{#each [0, 1] as copy}
					<ul class="flex shrink-0 items-center" aria-hidden={copy === 1}>
						{#each featuredOn as outlet}
							<li
								class="flex items-center font-display text-2xl font-extrabold tracking-tight whitespace-nowrap opacity-80 md:text-3xl"
							>
								<span class="px-6 md:px-10">{outlet}</span>
								<span aria-hidden="true" class="text-xl opacity-60">✦</span>
							</li>
						{/each}
					</ul>
				{/each}
			</div>
		</div>
	</section>

	<!-- various cards -->
	<!-- <div class="py-8 lg:py-24">
		<h2 class="my-10 text-center font-black text-3xl lg:text-7xl">Stuff I'm building right meow</h2>
		<div class="w-5/6 mx-auto flex flex-wrap gap-4">
			<div class="card w-96 bg-base-100 shadow-xl flex-auto">
				<figure>
					<img
						src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
						alt="Shoes"
					/>
				</figure>
				<div class="card-body">
					<h2 class="card-title">Shoes!</h2>
					<p>If a dog chews shoes whose shoes does he choose?</p>
					<div class="card-actions justify-end">
						<button class="btn btn-primary">Buy Now</button>
					</div>
				</div>
			</div>
			<div class="card w-96 bg-base-100 shadow-xl flex-auto">
				<figure>
					<img
						src="https://images.pexels.com/photos/4651259/pexels-photo-4651259.jpeg"
						alt="Shoes"
					/>
				</figure>
				<div class="card-body">
					<h2 class="card-title">Raccoons!</h2>
					<p>Because who doesn't like racooons???</p>
					<div class="card-actions justify-end">
						<button class="btn btn-primary">Read More</button>
					</div>
				</div>
			</div>
			<div class="card w-96 bg-base-100 shadow-xl flex-auto">
				<figure>
					<img
						src="https://images.pexels.com/photos/17965550/pexels-photo-17965550/free-photo-of-adorable-kitten-on-tree.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
						alt="Shoes"
					/>
				</figure>
				<div class="card-body">
					<h2 class="card-title">Awwwwww!</h2>
					<p>I'm also awwwwwwwww!!</p>
					<div class="card-actions justify-end">
						<button class="link">This one's a link</button>
					</div>
				</div>
			</div>
		</div>
	</div> -->

	<!-- copy bullets -->
	<!-- <div class="bg-neutral py-8 lg:py-24 text-neutral-content">
		<div class="md:w-1/2 mx-2 md:mx-auto leading-loose">
			<h2 class="my-10 text-center font-black text-3xl lg:text-7xl">Oh look, a headline.</h2>
			<p class="mb-3">
				Ok, fine. I'll use this space for something useful. Let's utlize this space to tell you what
				this <span class="text-secondary">FREE</span> template includes:
			</p>
			<ol>
				<li>✅️ This entire website as a template</li>
				<li>✅️ SEO-friendly</li>
				<li>✅️ Google Analytics support</li>
				<li>✅️ Google Fonts support</li>
				<li>✅️ Lots of color themes</li>
				<li>✅️ 100% Customizable</li>
				<li>✅️ Mini-course with detailed setup + customization guide</li>
				<li>✅️ Free hosting (Cloudflare Pages, Vercel, or Netlify)</li>
				<li>✅️ 100% free</li>
			</ol>
		</div>
	</div> -->

	<!-- bio section -->

	<!-- <div class="py-8 lg:py-24">
		<div class="m-5 lg:m-7 items-start space-y-4 lg:w-5/6 lg:mx-auto lg:flex lg:gap-8 lg:py-8">
			<div>
				<img src={pete_drinks_espresso} alt="pete" class="w-full rounded-lg shadow-2xl" />
			</div>
			<div class="lg:self-center w-full">
				<h1 class="text-3xl lg:text-7xl font-black mb-3">Hi, I'm a bio section 👋️</h1>
				<p class="mb-3">
					My name is Pete, and hot damn I'm awesome. You should hire me. Pay me money for things.
				</p>
				<p class="mb-3">Follow me on OnlyDads. Subscribe to my newsletter, twice.</p>
				<a href="/" class="btn btn-primary">Learn more</a>
			</div>
		</div>
	</div> -->

	<!-- CTA  -->
	<section class="px-4 pt-20 md:px-6">
		<div
			class="mx-auto max-w-5xl rounded-box border-2 border-neutral bg-primary px-6 py-12 text-primary-content shadow-pop-lg md:px-16 md:py-20"
		>
			<h2 class="max-w-3xl text-4xl font-extrabold md:text-6xl">
				Each week, I send a simple round-up email with cool stuff.
			</h2>
			<p class="mt-6 max-w-xl text-xl text-primary-content/85">
				Enter your email below to join the newsletter. It's free, not salesy at all.
			</p>

			<!-- email form that submits a function (at the top of this file) -->
			<form class="mt-10 flex max-w-xl flex-col gap-3 sm:flex-row" onsubmit={handleSubmit}>
				<label class="sr-only" for="newsletter-email">Email address</label>
				<input
					id="newsletter-email"
					type="email"
					required
					placeholder="you@example.com"
					bind:value={email}
					class="input input-lg w-full border-2 sm:flex-1 border-neutral bg-base-100 text-base-content"
				/>
				<button type="submit" class="btn btn-accent btn-lg">Sign me up!</button>
			</form>
		</div>
	</section>
</div>

<style>
	.marquee {
		mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
	}

	.marquee-track {
		display: flex;
		width: max-content;
		animation: marquee 40s linear infinite;
	}

	.marquee:hover .marquee-track {
		animation-play-state: paused;
	}

	@keyframes marquee {
		to {
			translate: -50% 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee-track {
			animation: none;
		}
	}
</style>
