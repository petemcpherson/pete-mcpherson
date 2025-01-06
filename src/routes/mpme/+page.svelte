<script>
	/** @type {{ data: import('./$types').PageData }} */

	import Head from '$lib/components/Head.svelte';

	let email = '';
	let buyLink = 'https://buy.stripe.com/cN26qf6dO9HP2zK3cd';

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
	<div class="py-8 lg:py-24 text-center">
		<div class="md:w-1/2 mx-2 md:mx-auto leading-loose">
			<h1 class=" mb-8 md:mb-12 font-black text-xl lg:text-3xl text-primary">
				Most Productive Month Ever
			</h1>
			<p class="md:leading-loose mb-8 md:mb-12 font-black text-3xl lg:text-5xl">
				A 30-day accountability program with weekly Zoom calls and personal text check-ins with Pete
				McPherson.
			</p>

			<h2 class="mb-4 md:mb-8 text-lg text-primary italic">
				We’ll set a stretch goal for your business or creative project, and crush it together.
			</h2>

			<div class="flex justify-center">
				<a
					href={buyLink}
					target="_blank"
					rel="noopener noreferrer"
					class="my-4 md:my-8 btn btn-lg btn-primary">Sign Up Now - only $99</a
				>
			</div>
		</div>
	</div>
	<!-- </div> -->

	<!-- Countdown Timer -->
	<div class="bg-accent text-accent-content text-xl p-4 md:p-8 text-center space-y-4">
		<div class="py-12 md:py-24">
			<p class="mb-2 md:mb-4 font-bold">MPME runs from Jan 13, 2025 to Feb 14, 2025</p>

			{countdown}
		</div>
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
				<ul class="mb-8">
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
					Throughout the month, I’ll check in with you via text (or WhatsApp) to help you stay on
					track and motivated. You can choose how often I bug you 😉
				</p>
				<p class="text-accent font-bold text-lg md:text-xl">
					I'll keep you accountable--and give you a little nudge when needed.
				</p>
			</div>
		</div>
		<div class="h-6 md:h-12"></div>

		<div class="flex justify-center">
			<a
				href={buyLink}
				target="_blank"
				rel="noopener noreferrer"
				class="my-4 md:my-8 btn btn-lg btn-primary">Sign Up Now - only $99</a
			>
		</div>
	</div>

	<!-- divider -->
	<div class="flex flex-col w-full h-16 md:h-24">
		<div class="divider divider-primary">QUESTIONSSSSS</div>
	</div>

	<!-- text -->

	<div class="py-4 lg:py-12">
		<div class="mx-5 md:w-1/2 md:mx-auto prose-lg">
			<h2>How much does it cost?</h2>
			<p>The program costs $99 for the entire month.</p>

			<h2>What kinds of goals can I set?</h2>
			<p>You can choose any goal that’s specific, actionable, and measurable. For example:</p>
			<ul>
				<li>“I want to HIT PUBLISH on my 1st YouTube vid.”</li>
				<li>“I want to get 3 months ahead on emails”</li>
				<li>“I want to start a new blog and have the 1st post LIVE”</li>
			</ul>

			<h2>When do the Zoom calls happen?</h2>
			<p>
				We’ll determine the best time for the group, but they’ll likely happen around 10am, 11am, or
				Noon Eastern Time.
				<span class="text-primary"
					>If you can't make it live, DON'T worry!! Replays are available, and it's mostly for
					consulting, advice, questions for Pete, etc.</span
				>
			</p>

			<h2>Is this an ongoing mastermind?</h2>
			<p>
				<span class="font-bold">Nope</span>! This is a focused 30-day program designed to help you
				make massive progress on your goals. By the end of the month, you’ll have results--plus
				clarity and momentum going forward.
			</p>
			<p>
				<i
					>However, if you make any friends within the group, you should totally keep in touch after
					the program 😎</i
				>
			</p>
			<h2>Are refunds available?</h2>
			<p>
				<span class="font-bold">No.</span> There are no refunds, period, under any circumstances.
				You're either committed to going hard and growing and <i>working,</i> or you're not.
			</p>
		</div>
	</div>

	<!-- who's it for -->
	<div>
		<div class="bg-success text-success-content p-8">
			<div class="mx-5 md:w-1/2 md:mx-auto prose-xl">
				<h2 class="text-2xl font-semibold mb-4">✅ This program is for you if:</h2>
				<ul class="mb-8">
					<li>You’re ready to tackle a big goal but need clarity on the best way forward.</li>
					<li>You want to feel motivated and proud of your work.</li>
					<li>You’re open to being pushed (just a little) to do your best work.</li>
				</ul>
			</div>
		</div>
		<div class="bg-warning p-8">
			<div class="mx-5 md:w-1/2 md:mx-auto prose">
				<h2 class="text-2xl font-semibold mb-4">❌ This program is NOT for you if:</h2>
				<ul class="mb-8">
					<li>The idea of regular accountability feels annoying or overwhelming.</li>
					<li>
						You’re looking for a casual, hands-off program. This is hands-on and results-driven!
					</li>
				</ul>
			</div>
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
	<h2 class="text-2xl font-semibold mb-4">FAQ:</h2>
</div>
