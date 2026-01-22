<script>
	import { onDestroy } from 'svelte';
	import Head from '$lib/components/Head.svelte';
	import my_turn_question from '$lib/assets/images/pete-gifs/my_turn.gif';
	import productivity_intensifies from '$lib/assets/images/pete-gifs/productivity_intensifies.gif';
	import boom_gif from '$lib/assets/images/pete-gifs/boom.gif';
	let checkoutPageUrl = $state('https://buy.stripe.com/9B68wQ75M5Ui8dEa478AE04');
	let isHovered = $state(false);

	const handleBuy = () => {
		window.location.href = checkoutPageUrl;
	};

	// Countdown timer to Jan 29, 2026 at 1:00pm ET
	const targetDate = new Date('2026-01-29T13:00:00-05:00'); // 1:00pm ET (UTC-5)

	let days = $state(0);
	let hours = $state(0);
	let minutes = $state(0);
	let seconds = $state(0);

	const updateCountdown = () => {
		const now = new Date();
		const difference = targetDate.getTime() - now.getTime();

		if (difference > 0) {
			days = Math.floor(difference / (1000 * 60 * 60 * 24));
			hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			seconds = Math.floor((difference % (1000 * 60)) / 1000);
		} else {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		}
	};

	// Update countdown immediately and then every second
	updateCountdown();
	const interval = setInterval(updateCountdown, 1000);

	// Cleanup on component destroy
	onDestroy(() => {
		clearInterval(interval);
	});

	const faqs = [
		{
			q: 'How much does it cost?',
			a: '$49 one time'
		},
		{
			q: 'Are there refunds?',
			a: 'Absolutely not 😉'
		},
		{
			q: "What if I've never used AI before?",
			a: 'Well then YOU are my people. Come join us and learn in a low-risk environment.'
		},
		{
			q: 'Will there be replays available?',
			a: 'Yes! Totally.'
		},
		{
			q: "I'm a YouTuber/podcaster/blogger/service-based biz/speaker/etc/etc, will this be for me?",
			a: 'If you work on the internet in any capacity and want an extra hour/week, this is for you. But yeah--we will MOSTLY be creators & entrepreneurs.'
		},
		{
			q: 'Did AI write this sales copy?',
			a: 'Not one single word. how dare you.'
		},
		{
			q: 'Did AI code, design, and layout this sales page?',
			a: 'how dare you. ok it did. 100% of it.'
		}
	];
</script>

<Head title="Productivity Workshop - Find an Extra Hour" />

<!-- STICKY BANNER AT TOP -->
<div
	class="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 py-3 text-center sticky top-0 z-50 shadow-lg"
>
	<div class="flex flex-wrap items-center justify-center gap-2 lg:gap-3">
		<p class="text-white font-bold text-sm lg:text-lg tracking-wide">
			🗓️ Live Workshop = <span class="text-yellow-300">January 29th, 1:00pm ET</span>
		</p>
		<span class="text-white font-bold text-xs lg:text-sm">|</span>
		<!-- Compact Countdown Timer -->
		<div class="flex items-center gap-1.5 lg:gap-2">
			<!-- Days -->
			<div class="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg px-2 py-1 shadow-md">
				<span class="text-white font-black text-xs lg:text-sm">{days}</span>
				<span class="text-white/90 font-bold text-[10px] lg:text-xs ml-0.5">d</span>
			</div>
			<span class="text-white/70 text-xs">:</span>
			<!-- Hours -->
			<div class="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg px-2 py-1 shadow-md">
				<span class="text-white font-black text-xs lg:text-sm">{hours}</span>
				<span class="text-white/90 font-bold text-[10px] lg:text-xs ml-0.5">h</span>
			</div>
			<span class="text-white/70 text-xs">:</span>
			<!-- Minutes -->
			<div class="bg-gradient-to-br from-red-500 to-pink-500 rounded-lg px-2 py-1 shadow-md">
				<span class="text-white font-black text-xs lg:text-sm">{minutes}</span>
				<span class="text-white/90 font-bold text-[10px] lg:text-xs ml-0.5">m</span>
			</div>
			<span class="text-white/70 text-xs">:</span>
			<!-- Seconds -->
			<div class="bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg px-2 py-1 shadow-md">
				<span class="text-white font-black text-xs lg:text-sm">{seconds}</span>
				<span class="text-white/90 font-bold text-[10px] lg:text-xs ml-0.5">s</span>
			</div>
		</div>
	</div>
</div>

<!-- HERO SECTION - Above the Fold -->
<section
	class="relative overflow-hidden bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 py-20 lg:py-32"
>
	<!-- Decorative background elements -->
	<div class="absolute inset-0 opacity-20">
		<div class="absolute top-10 left-10 w-32 h-32 border-8 border-black rotate-12"></div>
		<div class="absolute bottom-20 right-20 w-48 h-48 border-8 border-black -rotate-6"></div>
		<div class="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-300 rotate-45"></div>
		<div class="absolute top-1/3 right-1/3 w-16 h-16 bg-white/30 rounded-full"></div>
	</div>

	<div class="container mx-auto px-6 lg:px-12 relative z-10">
		<div class="max-w-4xl mx-auto text-center">
			<h1
				class="text-4xl md:text-6xl lg:text-8xl font-black text-white leading-tight drop-shadow-2xl"
			>
				Let's find an extra hour a week for you...
			</h1>

			<p class="mt-8 text-xl lg:text-3xl text-white/90 font-medium max-w-2xl mx-auto">
				...by brainstorming how AI & automations can fit into your biz.
			</p>

			<!-- CTA Button -->
			<div class="mt-12">
				<button onclick={handleBuy} class="btn btn-primary text-2xl lg:text-3xl">
					Sign up for $49
				</button>
			</div>

			<!-- Productivity GIF -->
			<div class="mt-12 lg:mt-16 max-w-2xl mx-auto">
				<img
					src={productivity_intensifies}
					alt="productivity intensifies"
					class="w-full rounded-2xl border-4 border-white/30 shadow-2xl transform hover:scale-105 transition-transform"
				/>
			</div>

			<!-- Arrow pointing down -->
			<div class="mt-16 animate-bounce">
				<svg
					class="w-12 h-12 lg:w-16 lg:h-16 mx-auto text-white"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="3"
						d="M19 14l-7 7m0 0l-7-7m7 7V3"
					></path>
				</svg>
			</div>
		</div>
	</div>
</section>

<!-- PRODUCTIVITY STAGES SECTION -->
<section class="bg-gray-950 py-16 lg:py-24 relative overflow-hidden">
	<div class="container mx-auto px-6 lg:px-12 relative z-10">
		<div class="max-w-4xl mx-auto">
			<!-- Header -->
			<div class="text-center mb-12 lg:mb-16">
				<h2 class="text-4xl lg:text-6xl font-black text-white">The 3 Stages of AI Productivity</h2>
			</div>

			<!-- The 3 Stages -->
			<div class="space-y-6 lg:space-y-8">
				<!-- Stage 1 -->
				<div
					class="bg-gray-800 p-6 lg:p-8 rounded-2xl transform hover:-rotate-1 transition-transform border-4 border-gray-700 shadow-xl"
				>
					<div class="flex items-start gap-4">
						<span
							class="bg-yellow-400 text-black font-black text-xl lg:text-2xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
							>1</span
						>
						<p class="text-white text-lg lg:text-2xl font-medium">
							I KNOW there are powerful tools out there that could give me superpowers
						</p>
					</div>
				</div>

				<!-- Stage 2 -->
				<div
					class="bg-gray-700 p-6 lg:p-8 rounded-2xl transform hover:rotate-1 transition-transform border-4 border-gray-600 shadow-xl"
				>
					<div class="flex items-start gap-4">
						<span
							class="bg-yellow-400 text-black font-black text-xl lg:text-2xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
							>2</span
						>
						<p class="text-white text-lg lg:text-2xl font-medium">
							I can't really picture what those superpowers actually look like
						</p>
					</div>
				</div>

				<!-- Stage 3 -->
				<div
					class="bg-gray-600 p-6 lg:p-8 rounded-2xl transform hover:-rotate-1 transition-transform border-4 border-gray-500 shadow-xl"
				>
					<div class="flex items-start gap-4">
						<span
							class="bg-yellow-400 text-black font-black text-xl lg:text-2xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
							>3</span
						>
						<p class="text-white text-lg lg:text-2xl font-medium">
							I'mma probably give up because this AI stuff is super overwhelming
						</p>
					</div>
				</div>
			</div>

			<!-- Asterisk divider -->
			<div class="text-center my-12">
				<span class="text-6xl text-yellow-400">*</span>
			</div>

			<!-- Question -->
			<div class="text-center space-y-4">
				<p class="text-2xl lg:text-3xl text-white font-bold">Which stage are you at right now?</p>
				<p class="text-xl text-gray-400">(or maybe you feel like all three?)</p>
				<p class="text-3xl lg:text-5xl font-black text-yellow-400 mt-8">
					Doesn't matter. WE GOT YOU!
				</p>
			</div>
		</div>
	</div>
</section>

<!-- EXPLANATION SECTION -->
<section class="bg-amber-50 py-16 lg:py-24 relative">
	<!-- Paper texture -->
	<div
		class="absolute inset-0 opacity-20"
		style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 100 100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22/%3E%3C/filter%3E%3Crect width=%22100%22 height=%22100%22 filter=%22url(%23noise)%22 opacity=%220.3%22/%3E%3C/svg%3E');"
	></div>

	<div class="container mx-auto px-6 lg:px-12 relative">
		<div class="max-w-3xl mx-auto bg-white shadow-2xl p-8 lg:p-12 border-4 border-black">
			<!-- Content -->
			<div
				class="space-y-6 text-lg lg:text-xl text-gray-800"
				style="font-family: 'Georgia', serif;"
			>
				<p>No, I'm not selling a new software tool to you. Or an expensive course.</p>
				<p>
					You just need a little time & space to kick around ideas in your own business and have <span
						class="bg-yellow-300 px-1 font-bold">super smart people weigh in.</span
					>
				</p>

				<!-- Bullet points styled as handwritten -->
				<ul class="space-y-3 pl-4 border-l-4 border-orange-500 ml-4">
					<li class="text-gray-700">What's goin on in your business?</li>
					<li class="text-gray-700">What tools do you have available?</li>
					<li class="text-gray-700">
						Which "automations & systems" are actually WORTH taking the time to build??
					</li>
					<li class="text-gray-700">What do I dooooooo ahhhhhhhh?</li>
				</ul>

				<p class="pt-4">It's NOT always easy (or worth it) to build systems. or use AI.</p>
				<p>Which is why we put off trying.</p>
				<p class="text-gray-600 italic">
					(and if you're like me—then you feel guilty—like you <em>could be doing more</em>...)
				</p>
			</div>
		</div>
	</div>
</section>

<!-- WORKSHOP DETAILS SECTION -->
<section
	class="bg-gradient-to-b from-indigo-900 to-purple-900 py-16 lg:py-24 relative overflow-hidden"
>
	<!-- Decorative elements -->
	<div
		class="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2"
	></div>
	<div
		class="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full opacity-10 translate-x-1/2 translate-y-1/2"
	></div>

	<div class="container mx-auto px-6 lg:px-12 relative z-10">
		<div class="text-center mb-12 lg:mb-16">
			<span
				class="bg-yellow-400 text-black font-black text-sm lg:text-base px-6 py-2 inline-block transform -rotate-2 mb-6"
			>
				HERE'S THE PLAN
			</span>
			<h2 class="text-4xl lg:text-6xl font-black text-white">What we're doing in the workshop</h2>
		</div>

		<div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
			<!-- Pete teaches -->
			<div
				class="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all hover:scale-105 text-center"
			>
				<span class="text-6xl">🎓</span>
				<h3 class="text-2xl font-black text-white mt-6 mb-4">Pete teaches</h3>
				<p class="text-gray-300">
					Pete will share some of the bleeding-edge tech tools <em>available</em>, as well as some
					tips n' tricks for understanding what you NEED.
				</p>
			</div>

			<!-- Silent brainstorming -->
			<div
				class="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all hover:scale-105 text-center"
			>
				<span class="text-6xl">✍️</span>
				<h3 class="text-2xl font-black text-white mt-6 mb-4">Silent brainstorming time</h3>
				<p class="text-gray-300">
					Pete will guide you with some prompts, and you'll be doing some pen-to-paper
					brainstorming.
				</p>
			</div>

			<!-- Group Mastermind -->
			<div
				class="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all hover:scale-105 text-center"
			>
				<span class="text-6xl">🧠</span>
				<h3 class="text-2xl font-black text-white mt-6 mb-4">Group Brainstorm Mastermind</h3>
				<p class="text-gray-300">
					(Optional but encouraged. I SEE YOU INTROVERTS) We'll take turns sharing productivity
					ideas for our business, and get feedback!
				</p>
			</div>
		</div>

		<!-- CTA Button -->
		<div class="mt-16 text-center">
			<button onclick={handleBuy} class="btn btn-primary text-xl lg:text-2xl">
				I'm in! Sign me up for $49
			</button>
		</div>
	</div>
</section>

<!-- ABOUT PETE SECTION -->
<section class="bg-emerald-600 py-16 lg:py-24 relative overflow-hidden">
	<!-- Background pattern -->
	<div class="absolute inset-0 opacity-10">
		<div class="absolute top-1/4 right-1/4 w-64 h-64 border-8 border-white rounded-full"></div>
		<div class="absolute bottom-1/4 left-1/4 w-48 h-48 border-8 border-white rotate-45"></div>
	</div>

	<div class="container mx-auto px-6 lg:px-12 relative z-10">
		<div class="max-w-3xl mx-auto text-center">
			<h2 class="text-4xl lg:text-6xl font-black text-white mb-8">
				I'm Pete McPherson, and I'm <span class="text-yellow-300 inline-block transform rotate-2"
					>time-rich</span
				>
			</h2>

			<!-- Boom GIF -->
			<div class="mb-12 lg:mb-16 max-w-xl mx-auto">
				<img
					src={boom_gif}
					alt="boom"
					class="w-full rounded-2xl border-4 border-white/40 shadow-2xl transform hover:scale-105 transition-transform"
				/>
			</div>

			<div
				class="bg-white/20 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border-2 border-white/30 text-left space-y-6"
			>
				<p class="text-xl lg:text-2xl text-white">
					I'm not the smartest. Or the richest. Or the most productive or the most motivated.
				</p>
				<p class="text-xl lg:text-2xl text-white">
					But I am <span class="bg-yellow-400 text-black px-2 font-bold">time rich.</span>
				</p>
				<p class="text-xl lg:text-2xl text-white">
					Over the years, I've figured out how to work less while getting things done.
				</p>
				<p class="text-xl lg:text-2xl text-white">
					I'm also a tech wizard and AI expert (#humblebrag).
				</p>
				<p class="text-xl lg:text-2xl text-white font-bold">
					If <em>anybody</em> can help you with AI, automations, or building systems, I can.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- WHO'S IT FOR SECTION -->
<section class="bg-gray-900 py-16 lg:py-24">
	<div class="container mx-auto px-6 lg:px-12">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-4xl lg:text-6xl font-black text-white text-center mb-12">
				This workshop is for you if...
			</h2>

			<div class="grid md:grid-cols-2 gap-4 lg:gap-6">
				{#each ['you want more hours in your week', "you're overwhelmed with AI", "you're not clear on what you COULD build", "you're interested in vibe coding", "you're interested in tools like Zapier, n8n, Make.com, IFTTT"] as item}
					<div
						class="bg-gradient-to-r from-gray-800 to-gray-750 p-6 rounded-xl border-2 border-gray-700 flex items-center gap-4 hover:border-yellow-400 transition-colors"
					>
						<span class="text-3xl text-yellow-400">✓</span>
						<p class="text-white text-lg lg:text-xl">{item}</p>
					</div>
				{/each}
			</div>

			<div class="mt-12 text-center">
				<p class="text-xl lg:text-2xl text-gray-300">
					But really, if <span class="text-yellow-400 font-bold"
						>you are looking for ways to gain/save an extra hour per week,</span
					> this workshop is for you.
				</p>
			</div>

			<!-- CTA Button -->
			<div class="mt-12 text-center">
				<button onclick={handleBuy} class="btn btn-primary text-xl lg:text-2xl">
					Sign up for $49
				</button>
			</div>
		</div>
	</div>
</section>

<!-- FAQ SECTION -->
<section class="bg-gradient-to-br from-blue-900 to-indigo-900 py-16 lg:py-24">
	<div class="container mx-auto px-6 lg:px-12">
		<div class="max-w-3xl mx-auto">
			<h2 class="text-4xl lg:text-5xl font-black text-white text-center mb-12">
				Frequently Asked Q's
			</h2>

			<div class="space-y-6">
				<!-- FAQ Items -->
				{#each faqs as faq, i}
					<div
						class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border-2 border-white/20 transform {i %
							2 ===
						0
							? 'hover:-rotate-1'
							: 'hover:rotate-1'} transition-transform"
					>
						<h3 class="text-xl lg:text-2xl font-black text-yellow-400 mb-3">{faq.q}</h3>
						<p class="text-white text-lg">{faq.a}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- FUNNY GIF SECTION -->
<section class="bg-black py-12 lg:py-16">
	<div class="container mx-auto px-6 text-center">
		<div
			class="max-w-md mx-auto bg-gray-900 border-4 border-yellow-400 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform"
		>
			<div
				class="aspect-video flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900"
			>
				<div class="text-center p-8">
					<img src={my_turn_question} alt="my turn question" class="w-full" />
				</div>
			</div>
		</div>
	</div>
</section>

<!-- FINAL CTA SECTION -->
<section
	class="bg-gradient-to-br from-amber-500 via-orange-600 to-red-700 py-16 lg:py-28 relative overflow-hidden"
>
	<!-- Animated background elements -->
	<div class="absolute inset-0 overflow-hidden">
		{#each Array(25) as _, i}
			<div
				class="absolute w-4 h-4 rounded-full opacity-30"
				style="
					background: {['#fff', '#fbbf24', '#f87171', '#60a5fa'][i % 4]};
					top: {Math.random() * 100}%;
					left: {Math.random() * 100}%;
					animation: float {3 + Math.random() * 4}s ease-in-out infinite;
					animation-delay: {Math.random() * 2}s;
				"
			></div>
		{/each}
	</div>

	<div class="container mx-auto px-6 lg:px-12 relative z-10">
		<div class="max-w-3xl mx-auto text-center">
			<h2 class="text-4xl lg:text-6xl font-black text-white mb-8">My turn to ask a question!</h2>

			<div
				class="bg-white/20 backdrop-blur-lg rounded-3xl p-8 lg:p-12 border-2 border-white/30 space-y-6 text-left"
			>
				<p class="text-xl lg:text-2xl text-white">
					Do you believe I can help you be more productive?
				</p>
				<p class="text-xl lg:text-2xl text-white">
					Do you believe <em>fancy AI tools</em> can help you in SOME WAY (even if that's not super clear
					yet)?
				</p>
				<p class="text-xl lg:text-2xl text-white font-bold">
					Then sign up for the workshop! It's only $49 and a great way to kick off 2026 👍
				</p>
			</div>

			<!-- Final CTA Button -->
			<div class="mt-12">
				<button
					onclick={handleBuy}
					onmouseenter={() => (isHovered = true)}
					onmouseleave={() => (isHovered = false)}
					class="btn btn-primary text-2xl lg:text-3xl"
				>
					{isHovered ? "LET'S GOOO! 🔥" : 'Sign up for $49'}
				</button>
			</div>

			<p class="text-white/70 mt-6 text-lg">🗓️ January 29th, 1:00pm ET</p>

			<!-- Countdown Timer -->
			<div class="mt-8 max-w-4xl mx-auto">
				<div
					class="bg-white/10 backdrop-blur-lg rounded-3xl p-6 lg:p-8 border-2 border-white/30 shadow-2xl"
				>
					<div class="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
						<!-- Days -->
						<div class="text-center">
							<div
								class="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-4 lg:p-6 shadow-lg transform hover:scale-105 transition-transform"
							>
								<div class="text-3xl lg:text-5xl font-black text-white mb-2">{days}</div>
								<div class="text-sm lg:text-base font-bold text-white/90 uppercase tracking-wide">
									Days
								</div>
							</div>
						</div>

						<!-- Hours -->
						<div class="text-center">
							<div
								class="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-4 lg:p-6 shadow-lg transform hover:scale-105 transition-transform"
							>
								<div class="text-3xl lg:text-5xl font-black text-white mb-2">{hours}</div>
								<div class="text-sm lg:text-base font-bold text-white/90 uppercase tracking-wide">
									Hours
								</div>
							</div>
						</div>

						<!-- Minutes -->
						<div class="text-center">
							<div
								class="bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl p-4 lg:p-6 shadow-lg transform hover:scale-105 transition-transform"
							>
								<div class="text-3xl lg:text-5xl font-black text-white mb-2">{minutes}</div>
								<div class="text-sm lg:text-base font-bold text-white/90 uppercase tracking-wide">
									Minutes
								</div>
							</div>
						</div>

						<!-- Seconds -->
						<div class="text-center">
							<div
								class="bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl p-4 lg:p-6 shadow-lg transform hover:scale-105 transition-transform"
							>
								<div class="text-3xl lg:text-5xl font-black text-white mb-2">{seconds}</div>
								<div class="text-sm lg:text-base font-bold text-white/90 uppercase tracking-wide">
									Seconds
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes float {
		0%,
		100% {
			transform: translateY(0) rotate(0deg);
		}
		50% {
			transform: translateY(-20px) rotate(180deg);
		}
	}
</style>
