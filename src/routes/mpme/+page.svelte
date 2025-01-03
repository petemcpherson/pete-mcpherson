<script>
	/** @type {{ data: import('./$types').PageData }} */

	import Head from '$lib/components/Head.svelte';

	let email = '';
	let buyLink = 'https://doyouevenblog.com/';

	// const handleSubmit = () => {
	// 	alert(
	// 		'You submitted the email: ' +
	// 			email +
	// 			'. This could totally go to a Zapier webhook and to your ESP--or you could just drop an embedded form here.'
	// 	);
	// };

	const handleSubmit = async (event) => {
		event.preventDefault();

		console.log('firing function with email: ', email);

		const zapierUrl = 'https://hooks.zapier.com/hooks/catch/1152094/37hwee8/';

		const res = await fetch('/api/zapier', {
			method: 'POST',

			headers: {
				'Content-Type': 'application/json'
			},

			body: JSON.stringify({ email, zapierUrl })
		});

		if (res.ok) {
			// goto('/thank-you-page-you-need-to-create');
			alert('Successfully signed up!');
		} else {
			console.error('Failed to submit email');
			alert('Failed to submit email');
		}
	};

	let countdown;

	const calculateCountdown = () => {
		const endDate = new Date('2025-01-12T23:59:00-05:00');
		const now = new Date();
		const timeRemaining = endDate - now;

		const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
		const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

		countdown = `Registration closes in ${days} days, ${hours} hours, ${minutes} mins, and ${seconds} seconds`;
	};

	calculateCountdown();
	setInterval(calculateCountdown, 1000);
</script>

<Head title="Most Productive Month Ever" />

<div>
	<!-- jumbotron -->
	<div class=" py-8 lg:py-24 text-center">
		<div class="md:w-1/2 mx-2 md:mx-auto leading-loose">
			<h1 class=" mb-4 md:mb-8 font-black text-2xl lg:text-3xl">Most Productive Month Ever</h1>
			<p class="leading-loose mb-4 md:mb-8 font-black text-3xl lg:text-5xl">
				A 30-day accountability program with weekly Zoom calls and personal text check-ins with Pete
				McPherson.
			</p>

			<h2 class="mb-4 md:mb-8 text-lg text-primary italic">
				We’re going to set a stretch goal for your business or creative project, and crush it
				together.
			</h2>

			<div class="flex justify-center">
				<a href={buyLink} class="my-4 md:my-8 btn btn-lg btn-primary">Sign Up Now - only $99</a>
			</div>
		</div>
	</div>
	<!-- </div> -->

	<!-- Countdown Timer -->
	<div class="bg-accent text-accent-content text-xl py-4 md:py-8 text-center text-lg space-y-4">
		<p class="mb-2 md:mb-4 font-bold">MPME runs from Jan 13, 2025 to Feb 14, 2025</p>

		{countdown}
	</div>

	<!-- copy 1 -->

	<div class="bg-gradient-to-br from-neutral to-neutral-700 py-8 lg:py-24 text-neutral-content">
		<div class="md:w-1/2 mx-2 md:mx-auto leading-loose">
			<h2 class="my-10 font-black text-3xl lg:text-7xl text-center">
				Wanna get more stuff done? (with <i class="text-primary">clarity</i> and
				<i class="text-primary">motivation</i>?!)
			</h2>

			<div class="p-3 md:p-6 prose text-neutral-content text-lg">
				<!-- copy -->
				<p class="mb-4">Have you ever made it to the end of your day and thought:</p>
				<ul class="list-disc list-inside mb-8">
					<li>“UGH. I could’ve done more. Why didn’t I?”</li>
					<li>
						“I wish I had more motivation this week. I don’t have much to show for my effort.”
					</li>
					<li>
						“I want to feel great about my work. I want to knock out these to-dos and feel proud of
						what I’m creating!”
					</li>
				</ul>
				<p class="mb-8">If that sounds familiar, this program is for you.</p>
			</div>
		</div>
	</div>

	<!-- testimonials -->
	<div class="py-8 lg:py-24">
		<h2 class="my-10 text-center font-black text-3xl lg:text-7xl">
			Here’s what the month will look like:
		</h2>
		<div class="h-6 md:h-12"></div>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 lg:mx-20">
			<!-- col 1 -->
			<div class="prose">
				<div class="flex justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-16 text-primary/50"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
						/>
					</svg>
				</div>

				<p class="italic text-center mb-2 md:mb-4 text-primary text-xl md:text-3xl">
					Set a Stretch Goal
				</p>
				<p class="text-lg md:text-xl">
					Maybe it's "write consistently," "create that product", or "finally start the YouTube
					channel". The only rules? It must be well-defined, actionable, and achievable (but
					ambitious!).
				</p>
				<p class="text-primary font-bold text-lg md:text-xl">
					I’ll work with you to nail down your goal before the program starts.
				</p>
			</div>
			<!-- col 2 -->
			<div class="prose">
				<div class="flex justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-16 text-secondary/50"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
						/>
					</svg>
				</div>

				<p class="italic text-center mb-2 md:mb-4 text-secondary text-xl md:text-3xl">
					Weekly Live Calls
				</p>
				<p class="text-lg md:text-xl">
					Every week, we’ll meet on Zoom to check in as a group. We’ll celebrate wins, provide
					accountability, and share strategies to keep you on track.
				</p>
				<p class="text-secondary font-bold text-lg md:text-xl">
					Calls will be scheduled in the evenings (Eastern Time) based on group availability, and
					replays will be available.
				</p>
			</div>
			<!-- col 3 -->
			<div class="prose">
				<div class="flex justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-16 text-accent/50"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
						/>
					</svg>
				</div>

				<p class="italic text-center mb-2 md:mb-4 text-accent text-xl md:text-3xl">
					Pete texts you
				</p>
				<p class="text-lg md:text-xl">
					Throughout the month, I’ll check in with you via text to help you stay on track and
					motivated. You can choose daily, 2x weekly, or weekly texts.
				</p>
				<p class="text-accent font-bold text-lg md:text-xl">
					Think of it as having a coach in your pocket—keeping you accountable and giving you a
					little nudge when needed.
				</p>
			</div>
		</div>
		<div class="h-6 md:h-12"></div>

		<div class="flex justify-center">
			<a href={buyLink} class="my-4 md:my-8 btn btn-lg btn-primary">Sign Up Now - only $99</a>
		</div>
	</div>

	<!-- faqs -->

	<div class="py-8 lg:py-24">
		<div class="md:w-1/2 mx-2 md:mx-auto leading-loose">
			<h1 class="my-10 font-black text-3xl lg:text-7xl text-center">FAQS</h1>

			<div class="collapse collapse-arrow bg-base-200">
				<input type="radio" name="my-accordion-2" checked="checked" />
				<div class="collapse-title text-xl font-medium">
					Click to open this one and close others
				</div>
				<div class="collapse-content">
					<p>hello</p>
				</div>
			</div>
			<div class="collapse collapse-arrow bg-base-200">
				<input type="radio" name="my-accordion-2" />
				<div class="collapse-title text-xl font-medium">
					Click to open this one and close others
				</div>
				<div class="collapse-content">
					<p>hello</p>
				</div>
			</div>
			<div class="collapse collapse-arrow bg-base-200">
				<input type="radio" name="my-accordion-2" />
				<div class="collapse-title text-xl font-medium">
					Click to open this one and close others
				</div>
				<div class="collapse-content">
					<p>hello</p>
				</div>
			</div>
		</div>
	</div>

	<!-- divider -->
	<div class="flex flex-col w-full">
		<div class="divider">Default Divider</div>
		<div class="divider divider-neutral">Neutral Divider</div>
		<div class="divider divider-primary">Primary Divider</div>
		<div class="divider divider-secondary">Secondary Divider</div>
		<!-- <div class="divider divider-accent">Accent</div> -->
		<!-- <div class="divider divider-success">Success</div>
	<div class="divider divider-warning">Warning</div>
	<div class="divider divider-info">Info</div>
	<div class="divider divider-error">Error</div> -->
	</div>

	<!-- text -->

	<div class="py-4 lg:py-12">
		<div class="mx-5 md:w-1/2 md:mx-auto prose">
			<p>
				This is could be some amazing content! We're going to start with talking about ourselves,
				and then maybe add some more copywriting relating to our services, projects, etc.
			</p>

			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Imperdiet sed euismod nisi porta lorem mollis aliquam ut
				porttitor. Purus in massa tempor nec feugiat nisl. Metus aliquam eleifend mi in nulla
				posuere sollicitudin aliquam. Volutpat maecenas volutpat blandit aliquam etiam erat velit
				scelerisque. Pharetra magna ac placerat vestibulum lectus mauris.
			</p>
			<ol>
				<li>asdf asdf asdf asdf asdf asdf</li>
				<li>asdf asdf asdf asdf asdf asdf</li>
				<li>asdf asdf asdf asdf asdf asdf</li>
			</ol>
			<p>
				Tempor commodo ullamcorper a lacus vestibulum sed arcu non odio. Pretium nibh ipsum
				consequat nisl vel pretium. Sapien pellentesque habitant morbi tristique senectus et netus.
				Facilisis sed odio morbi quis commodo odio aenean sed adipiscing. Nulla porttitor massa id
				neque aliquam. Sapien faucibus et molestie ac. <a href="/" class="link"
					>I'm a link, beotch.</a
				>
				Leo in vitae turpis massa. Mattis vulputate enim nulla aliquet porttitor lacus. Mattis molestie
				a iaculis at erat pellentesque adipiscing commodo elit. Eget velit aliquet sagittis id consectetur.
				Lectus proin nibh nisl condimentum id venenatis a condimentum vitae. Viverra orci sagittis eu
				volutpat. Sagittis orci a scelerisque purus semper eget duis at.
			</p>
			<p>
				Ac placerat vestibulum lectus mauris ultrices eros. Massa tincidunt nunc pulvinar sapien et
				ligula ullamcorper malesuada proin. Morbi enim nunc faucibus a pellentesque sit. Gravida
				rutrum quisque non tellus orci ac.
			</p>
			<h2>Oh look, a subheader!</h2>
			<p>
				Morbi enim nunc faucibus a pellentesque sit amet porttitor eget. Cursus turpis massa
				tincidunt dui. Mus mauris vitae ultricies leo integer. Ipsum nunc aliquet bibendum enim
				facilisis gravida. Pharetra diam sit amet nisl suscipit. Ornare massa eget egestas purus.
				Faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Sit amet luctus
				venenatis lectus magna fringilla urna. Mattis pellentesque id nibh tortor id aliquet lectus.
				A cras semper auctor neque vitae tempus quam pellentesque. Lorem sed risus ultricies
				tristique nulla aliquet enim. Feugiat in ante metus dictum.
			</p>
			<img
				src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
				alt="dogs"
			/>
			<p>
				Pretium lectus quam id leo in vitae turpis massa sed. Nullam non nisi est sit amet facilisis
				magna etiam tempor. Neque ornare aenean euismod elementum nisi. Natoque penatibus et magnis
				dis parturient montes nascetur ridiculus mus. Eget duis at tellus at urna condimentum. Vitae
				elementum curabitur vitae nunc sed. Eget mi proin sed libero. Scelerisque viverra mauris in
				aliquam. Massa vitae tortor condimentum lacinia quis vel eros donec. Vitae tempus quam
				pellentesque nec nam aliquam sem et tortor. Nunc lobortis mattis aliquam faucibus. Tellus
				elementum sagittis vitae et leo duis ut diam quam. Suspendisse faucibus interdum posuere
				lorem ipsum dolor. Sociis natoque penatibus et magnis dis parturient. Quis viverra nibh cras
				pulvinar mattis nunc. Sit amet est placerat in egestas erat imperdiet. Donec et odio
				pellentesque diam volutpat. Tellus id interdum velit laoreet id donec ultrices tincidunt. Mi
				ipsum faucibus vitae aliquet nec. Convallis posuere morbi leo urna molestie at elementum eu
				facilisis.
			</p>
		</div>
	</div>

	<!-- CTA  -->
	<div class="bg-gradient-to-br from-neutral to-neutral-700 py-8 lg:py-24 text-neutral-content">
		<div class="md:w-1/2 mx-2 md:mx-auto leading-loose text-center">
			<h1 class="my-10 font-black text-3xl lg:text-7xl">Oh look, a CTA section.</h1>
			<p class="mb-3">
				You give me your email, I'll <span class="text-secondary">sell you things.</span>
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
					<button type="submit" class="btn btn-secondary md:flex-initial" on:click={handleSubmit}>
						Sign me up!
					</button>
				</div>
			</form>
			<div class="flex justify-center">
				<a href="/" class="my-4 md:my-8 btn btn-lg btn-secondary">BUY NOW WITH A BUTTON</a>
			</div>
		</div>
	</div>
</div>

<div class="bg-neutral text-neutral-content p-8">
	<h2 class="text-2xl font-semibold mb-4">Here’s what the month will look like:</h2>
	<ol class="list-decimal list-inside mb-8">
		<li class="mb-4">
			<strong>Set a Stretch Goal Before the Month Starts</strong>
			<p>
				Your goal can be anything blog- or business-related: write consistently, publish a set
				number of posts, level up your marketing, create a product, or master Pinterest. The only
				rules? It must be well-defined, actionable, and achievable (but ambitious!).
			</p>
			<p>I’ll work with you to nail down your goal before the program starts.</p>
		</li>
		<li class="mb-4">
			<strong>Weekly Live Zoom Calls</strong>
			<p>
				Every week, we’ll meet on Zoom to check in as a group. We’ll celebrate wins, provide
				accountability, and share strategies to keep you on track.
			</p>
			<p>
				Calls will be scheduled in the evenings (Eastern Time) based on group availability, and
				replays will be available.
			</p>
		</li>
		<li>
			<strong>Personalized Text Check-Ins</strong>
			<p>
				Throughout the month, I’ll check in with you via text to help you stay on track and
				motivated. Think of it as having a coach in your pocket—keeping you accountable and giving
				you a little nudge when needed.
			</p>
		</li>
	</ol>

	<h2 class="text-2xl font-semibold mb-4">This program is for you if:</h2>
	<ul class="list-disc list-inside mb-8">
		<li>You’re ready to tackle a big goal but need clarity on the best way forward.</li>
		<li>You want to feel motivated and proud of your work.</li>
		<li>You’re open to being pushed (just a little) to do your best work.</li>
	</ul>

	<h2 class="text-2xl font-semibold mb-4">This program is NOT for you if:</h2>
	<ul class="list-disc list-inside mb-8">
		<li>The idea of regular accountability feels annoying or overwhelming.</li>
		<li>You’re looking for a casual, hands-off program. This is hands-on and results-driven!</li>
	</ul>

	<h2 class="text-2xl font-semibold mb-4">FAQ:</h2>
	<div class="mb-8">
		<p class="font-semibold">How much does it cost?</p>
		<p>The program costs $99 for the entire month. Limited to 10 participants.</p>
	</div>
	<div class="mb-8">
		<p class="font-semibold">What kinds of goals can I set?</p>
		<p>You can choose any goal that’s specific, actionable, and measurable. For example:</p>
		<ul class="list-disc list-inside">
			<li>“I want to publish 8 blog posts this month.”</li>
			<li>“I want to create and launch a lead magnet.”</li>
			<li>“I want to spend 15 hours this month improving my Pinterest strategy.”</li>
		</ul>
	</div>
	<div class="mb-8">
		<p class="font-semibold">When do the Zoom calls happen?</p>
		<p>
			We’ll determine the best time for the group, but they’ll generally be held in the evenings,
			Eastern Time. Replays will be available if you can’t make it live.
		</p>
	</div>
	<div class="mb-8">
		<p class="font-semibold">Is this an ongoing mastermind?</p>
		<p>
			Nope! This is a focused 30-day program designed to help you make massive progress on your
			goals. By the end of the month, you’ll have clarity, momentum, and results.
		</p>
	</div>
	<div>
		<p class="font-semibold">Are refunds available?</p>
		<p>No. This program is for people ready to commit fully to their goals.</p>
	</div>

	<div class="mt-8 text-center">
		<a href="/" class="bg-primary text-primary-content px-6 py-3 rounded font-bold text-lg"
			>Apply Now</a
		>
	</div>
</div>
