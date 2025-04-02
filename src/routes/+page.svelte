<script>
	import pete_is_cool from '$lib/assets/images/pete_is_cool.jpeg';
	import pete_drinks_espresso from '$lib/assets/images/pete_drinks_espresso.jpeg';
	import Head from '$lib/components/Head.svelte';

	let email = $state('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(email);

		const zapierUrl = 'https://hooks.zapier.com/hooks/catch/1152094/37x1vsq/';

		const res = await fetch('/api/zapier', {
			method: 'POST',

			headers: {
				'Content-Type': 'application/json'
			},

			body: JSON.stringify({ email, zapierUrl })
		});

		if (res.ok) {
			// goto('/thank-you-page-you-need-to-create');
			alert('Thanks for subscribing!');
		} else {
			console.error('Failed to submit email');
			alert('Failed to submit email');
		}
	};

	const featuredOnImages = [
		{
			src: 'https://doyouevenblog.com/wp-content/uploads/2020/09/forbes-logo-black-transparent-1536x402.png',
			alt: 'Forbes'
		},
		{
			src: 'https://doyouevenblog.com/wp-content/uploads/2020/09/npr.png',
			alt: 'NPR'
		},
		{
			src: 'https://doyouevenblog.com/wp-content/uploads/2020/09/BI-1536x700.png',
			alt: 'Business Insider'
		},
		{
			src: 'https://doyouevenblog.com/wp-content/uploads/2020/09/lifeh.png',
			alt: 'Lifehacker'
		}
		// {
		// 	src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/544px-Google_2015_logo.svg.png',
		// 	alt: 'Google'
		// }
	];
	// just a note
</script>

<Head />

<div>
	<!-- hero -->
	<div class="m-5 lg:m-7 items-start space-y-4 lg:w-5/6 lg:mx-auto lg:flex lg:gap-4 lg:py-8">
		<div class="lg:self-center w-full">
			<h1 class="text-3xl lg:text-7xl font-black">I build things that make the internet better.</h1>
			<p class="py-6">
				Hi, I'm Pete McPherson! I'm a former accountant turned entrepreneur, indie developer,
				blogger, podcaster, YouTuber. My mission is to make the internet fun (and useful) again.
			</p>
			<a href="/about" class="btn btn-primary">story time</a>
			<!-- social icons -->
			<div class="flex gap-4 mt-8">
				<!-- twitter -->
				<a href="https://twitter.com/doyouevenblog/" target="_blank" rel="noreferrer noopener">
					<svg
						viewBox="0 0 24 24"
						aria-hidden="true"
						class="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
						><path
							d="M13.3174 10.7749L19.1457 4H17.7646L12.7039 9.88256L8.66193 4H4L10.1122 12.8955L4 20H5.38119L10.7254 13.7878L14.994 20H19.656L13.3171 10.7749H13.3174ZM11.4257 12.9738L10.8064 12.0881L5.87886 5.03974H8.00029L11.9769 10.728L12.5962 11.6137L17.7652 19.0075H15.6438L11.4257 12.9742V12.9738Z"
						></path></svg
					>
				</a>
				<!-- instagram -->
				<a href="https://www.instagram.com/bloggerpete" target="_blank" rel="noreferrer noopener">
					<svg
						viewBox="0 0 24 24"
						aria-hidden="true"
						class="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
						><path
							d="M12 3c-2.444 0-2.75.01-3.71.054-.959.044-1.613.196-2.185.418A4.412 4.412 0 0 0 4.51 4.511c-.5.5-.809 1.002-1.039 1.594-.222.572-.374 1.226-.418 2.184C3.01 9.25 3 9.556 3 12s.01 2.75.054 3.71c.044.959.196 1.613.418 2.185.23.592.538 1.094 1.039 1.595.5.5 1.002.808 1.594 1.038.572.222 1.226.374 2.184.418C9.25 20.99 9.556 21 12 21s2.75-.01 3.71-.054c.959-.044 1.613-.196 2.185-.419a4.412 4.412 0 0 0 1.595-1.038c.5-.5.808-1.002 1.038-1.594.222-.572.374-1.226.418-2.184.044-.96.054-1.267.054-3.711s-.01-2.75-.054-3.71c-.044-.959-.196-1.613-.419-2.185A4.412 4.412 0 0 0 19.49 4.51c-.5-.5-1.002-.809-1.594-1.039-.572-.222-1.226-.374-2.184-.418C14.75 3.01 14.444 3 12 3Zm0 1.622c2.403 0 2.688.009 3.637.052.877.04 1.354.187 1.67.31.421.163.72.358 1.036.673.315.315.51.615.673 1.035.123.317.27.794.31 1.671.043.95.052 1.234.052 3.637s-.009 2.688-.052 3.637c-.04.877-.187 1.354-.31 1.67-.163.421-.358.72-.673 1.036a2.79 2.79 0 0 1-1.035.673c-.317.123-.794.27-1.671.31-.95.043-1.234.052-3.637.052s-2.688-.009-3.637-.052c-.877-.04-1.354-.187-1.67-.31a2.789 2.789 0 0 1-1.036-.673 2.79 2.79 0 0 1-.673-1.035c-.123-.317-.27-.794-.31-1.671-.043-.95-.052-1.234-.052-3.637s.009-2.688.052-3.637c.04-.877.187-1.354.31-1.67.163-.421.358-.72.673-1.036.315-.315.615-.51 1.035-.673.317-.123.794-.27 1.671-.31.95-.043 1.234-.052 3.637-.052Z"
						></path><path
							d="M12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-7.622a4.622 4.622 0 1 0 0 9.244 4.622 4.622 0 0 0 0-9.244Zm5.884-.182a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0Z"
						></path></svg
					>
				</a>
				<!-- github -->
				<a href="https://github.com/petemcpherson" target="_blank" rel="noreferrer noopener">
					<svg
						viewBox="0 0 24 24"
						aria-hidden="true"
						class="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
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
				>
					<svg
						viewBox="0 0 24 24"
						aria-hidden="true"
						class="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
						><path
							d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"
						></path></svg
					>
				</a>
			</div>
		</div>
		<div>
			<img src={pete_is_cool} alt="pete" class="w-full rounded-lg shadow-2xl" />
		</div>
	</div>

	<!-- featured on images -->
	<div class="bg-gray-200 p-10">
		<div class=" flex lg:mx-16 gap-5 flex-wrap justify-between items-center">
			{#each featuredOnImages as image}
				<img
					src={image.src}
					alt={image.alt}
					class="h-4 md:h-8 w-auto object-contain filter grayscale"
				/>
			{/each}
		</div>
	</div>

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
	<!-- <div class="bg-gradient-to-br from-neutral to-neutral-700 py-8 lg:py-24 text-neutral-content">
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
	<div class="bg-gradient-to-br from-neutral to-neutral-700 py-8 lg:py-24 text-neutral-content">
		<div class="md:w-1/2 mx-2 md:mx-auto leading-loose text-center">
			<h1 class="my-10 font-black text-3xl lg:text-7xl">
				Each week, I send a simple round-up email with cool stuff.
			</h1>
			<p class="mb-3">
				Enter your email below to join the newsletter. It's free, not salesy at all.
			</p>

			<!-- email form that submits a function (at the top of this file) -->
			<!-- you could use that and fire off a Zapier webhook, or just send an email to your ESP -->
			<form class="my-8">
				<div class="flex flex-col md:flex-row md:flex-wrap gap-2">
					<input
						type="email"
						placeholder="Enter your email"
						bind:value={email}
						class="input input-bordered md:flex-auto"
					/>
					<button type="submit" class="btn md:flex-initial" onclick={handleSubmit}>
						Sign me up!
					</button>
				</div>
			</form>
			<!-- <div class="flex justify-center">
				<a href="/" class="my-4 md:my-8 btn btn-lg btn-secondary">BUY NOW WITH A BUTTON</a>
			</div> -->
		</div>
	</div>
</div>
