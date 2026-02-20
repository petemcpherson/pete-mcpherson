<script>
	import Head from '$lib/components/Head.svelte';
	import boom from '$lib/assets/images/pete-gifs/boom.gif';
	import pete_drinks_espresso from '$lib/assets/images/pete_drinks_espresso.jpeg';
	import socialImage from '$lib/assets/images/socialImage.png';
	let email = $state('');

	const handleSubmit = async () => {
		let res;
		try {
			res = await fetch('https://sendy-optin.pete-85b.workers.dev/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, listId: 'vRfjCXivzFqd8OwKQM7CPQ' })
			});
		} catch (e) {
			console.error('Opt-in request failed', e);
			alert('Failed to submit email. Please try again.');
			return;
		}

		if (res.ok) {
			alert('Ur in! Check your email for confirmation!');
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
</script>

<Head title="About" />

<!-- HERO SECTION -->
<section class="min-h-[80vh] relative overflow-hidden">
	<!-- Background accent -->
	<div class="absolute top-20 -right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
	<div class="absolute bottom-40 -left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>

	<div class="relative z-10 px-6 lg:px-24 py-16 lg:py-32">
		<div class="max-w-5xl mx-auto">
			<!-- Intro tag -->
			<div class="inline-block mb-6">
				<span
					class="bg-primary text-primary-content px-4 py-2 text-sm font-bold uppercase tracking-widest rotate-[-2deg] inline-block"
				>
					Hey, I'm Pete
				</span>
			</div>

			<!-- Main headline -->
			<h1 class="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8">
				I'm a
				<span class="text-primary italic">generalist</span>
				<br />
				who builds
				<span class="relative inline-block">
					<span class="relative z-10">cool stuff</span>
					<span class="absolute bottom-2 left-0 w-full h-4 bg-secondary/40 -rotate-1"></span>
				</span>
			</h1>

			<p class="text-xl md:text-2xl text-base-content/70 max-w-2xl mb-12">
				A true jack of all trades. Podcaster. App builder. Content creator.
				<span class="text-primary font-semibold">Professional experimenter.</span>
			</p>

			<!-- IMAGE PLACEHOLDER 1 -->
			<div class="relative inline-block">
				<img
					src={pete_drinks_espresso}
					alt="pete"
					class="w-full md:w-1/2 rounded-2xl rotate-3 hover:rotate-0 transition-transform duration-300"
				/>
			</div>
		</div>
	</div>
</section>

<!-- STORY SECTION -->
<section class="bg-base-200 py-20 lg:py-32 -skew-y-2">
	<div class="skew-y-2">
		<div class="max-w-4xl mx-auto px-6 lg:px-12">
			<h2 class="text-4xl md:text-6xl font-black mb-12 text-center">
				The <span class="text-secondary">Backstory</span>
			</h2>

			<div class="space-y-8 text-lg leading-relaxed">
				<p class="text-xl md:text-2xl font-medium">
					I never really knew what I wanted to be when I grew up. I wanted to be <em>everything!</em
					>
				</p>

				<div class="bg-base-100 p-6 md:p-8 rounded-2xl border-l-4 border-primary">
					<p class="italic text-base-content/80">
						"How could one person choose to just do one thing all of their life?"
					</p>
				</div>

				<p>
					So I struggled. I was good at a lot of things and chose to pursue music until I realized I
					didn't actually want to do it as a living. Three years into my college degree, no less...
				</p>

				<p>
					I was told by my parents, teachers, counselors, and just about everybody else that all I
					needed in life was to <span class="font-bold">"get a job."</span>
				</p>

				<p>
					So after graduating with a degree in sociology from the University of Georgia, I decided
					to go a completely different route and get my master's in accounting to become a highly
					paid accountant.
				</p>

				<div class="text-center py-8">
					<p class="text-3xl md:text-4xl font-black">Fun, right?</p>
					<p class="text-4xl md:text-5xl font-black text-primary mt-2">Right?!</p>
				</div>

				<p>
					I graduated, got a full-time adult job, passed my CPA exam, got my license, and I
					<span class="bg-error text-error-content px-2 py-1 font-bold">HATED</span>
					basically every second of it.
				</p>
				<!-- GIF PLACEHOLDER 1 -->
				<div class="my-12 flex justify-center">
					<img
						src={boom}
						alt="boom"
						class="w-full rounded-2xl border-4 border-white/40 shadow-2xl transform hover:scale-105 transition-transform"
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- TURNING POINT -->
<section class="py-20 lg:py-32 px-6">
	<div class="max-w-5xl mx-auto">
		<div class="grid md:grid-cols-2 gap-12 items-center">
			<div>
				<h2 class="text-5xl md:text-7xl font-black mb-6">
					So I <span class="text-error">quit.</span>
				</h2>
				<p class="text-lg mb-6">
					I decided to leave a really fantastic career and pursue a job at a startup that would
					allow me to develop my entrepreneurial muscle.
				</p>
				<p class="text-lg mb-6">
					After selling our house and moving across the state, my family of three and a half (my
					wife was expecting our 2nd child)... I started my job...
				</p>

				<div
					class="bg-success/20 border-2 border-success p-6 rounded-xl inline-block rotate-[-1deg]"
				>
					<p class="text-xl font-bold">
						...and got laid off after <span class="text-success">ONE paycheck.</span>
					</p>
					<p class="text-base-content/60 mt-2 italic">womp womp.</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- THE PIVOT -->
<section class="bg-primary text-primary-content py-20 lg:py-32">
	<div class="max-w-4xl mx-auto px-6 text-center">
		<h2 class="text-4xl md:text-6xl font-black mb-8">
			So I talked to people making 6+ figures as creators...
		</h2>
		<p class="text-xl md:text-2xl mb-8 opacity-90">
			I asked them tons of questions. I wanted to know <em>HOW.</em>
		</p>
		<p class="text-lg opacity-80 mb-4">
			Thankfully, I was smart enough to record and publish these sessions, and the (award-winning)
		</p>
		<p class="text-3xl md:text-4xl font-black">Do You Even Blog Podcast</p>
		<p class="text-lg opacity-80 mt-4">was born.</p>

		<div class="mt-12 inline-block bg-primary-content/10 px-6 py-3 rounded-full">
			<p class="text-lg font-semibold">
				That was May 2017, and I've been going strong ever since ;)
			</p>
		</div>
	</div>
</section>

<!-- NOW SECTION - ACHIEVEMENTS -->
<section class="py-20 lg:py-32 px-6">
	<div class="max-w-6xl mx-auto">
		<h2 class="text-5xl md:text-7xl font-black text-center mb-16">
			Now, I'm a <span class="text-primary">generalist.</span>
		</h2>

		<!-- GIF PLACEHOLDER 2 -->
		<div class="flex justify-center mb-16">
			<img src={socialImage} alt="social image" class="w-full max-w-lg rounded-2xl rotate-1" />
		</div>

		<!-- Achievement cards -->
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			<div
				class="bg-base-200 p-6 rounded-2xl border-2 border-transparent hover:border-primary transition-colors"
			>
				<div class="text-4xl mb-3">🎤</div>
				<h3 class="text-xl font-bold mb-2">Keynote Speaker</h3>
				<p class="text-base-content/70">Given keynote speeches at conferences</p>
			</div>

			<div
				class="bg-base-200 p-6 rounded-2xl border-2 border-transparent hover:border-secondary transition-colors"
			>
				<div class="text-4xl mb-3">📱</div>
				<h3 class="text-xl font-bold mb-2">4+ Apps Built</h3>
				<p class="text-base-content/70">$50k+ grossed. I'm not even a developer.</p>
			</div>

			<div
				class="bg-base-200 p-6 rounded-2xl border-2 border-transparent hover:border-accent transition-colors"
			>
				<div class="text-4xl mb-3">🎙️</div>
				<h3 class="text-xl font-bold mb-2">2M+ Downloads</h3>
				<p class="text-base-content/70">DYEB podcast (plus another podcast!)</p>
			</div>

			<div
				class="bg-base-200 p-6 rounded-2xl border-2 border-transparent hover:border-success transition-colors"
			>
				<div class="text-4xl mb-3">📺</div>
				<h3 class="text-xl font-bold mb-2">3 YouTube Channels</h3>
				<p class="text-base-content/70">Multiple content verticals</p>
			</div>

			<div
				class="bg-base-200 p-6 rounded-2xl border-2 border-transparent hover:border-warning transition-colors"
			>
				<div class="text-4xl mb-3">🌐</div>
				<h3 class="text-xl font-bold mb-2">Website Portfolio</h3>
				<p class="text-base-content/70">Multiple smaller sites & blogs</p>
			</div>

			<div
				class="bg-base-200 p-6 rounded-2xl border-2 border-transparent hover:border-error transition-colors"
			>
				<div class="text-4xl mb-3">🤝</div>
				<h3 class="text-xl font-bold mb-2">Brand Collaborations</h3>
				<p class="text-base-content/70">Dozens of well-known brands in digital marketing</p>
			</div>
		</div>
	</div>
</section>

<!-- PURPOSE SECTION -->
<section class="bg-base-200 py-20 lg:py-32">
	<div class="max-w-4xl mx-auto px-6">
		<div class="text-center mb-12">
			<span
				class="bg-secondary text-secondary-content px-4 py-2 text-sm font-bold uppercase tracking-widest inline-block rotate-1"
			>
				My "Purpose"
			</span>
		</div>

		<p class="text-xl md:text-2xl text-center mb-8">
			Might seem corny, but this is actually surprisingly easy for me.
		</p>

		<div class="bg-gradient-to-r from-primary to-secondary p-1 rounded-2xl">
			<div class="bg-base-100 p-8 md:p-12 rounded-xl">
				<p class="text-2xl md:text-4xl font-black text-center leading-snug">
					I aim to make the internet <span class="text-primary">better.</span>
					<br />
					I want to make it more <span class="text-secondary">fun</span> and
					<span class="text-secondary">interesting.</span>
				</p>
			</div>
		</div>

		<div class="mt-12 space-y-6 text-lg text-center">
			<p>
				These days I am mostly focused on growing my <strong>weekly roundup newsletter</strong> where
				I share interesting finds and cool tools from around the internet.
			</p>
			<p class="text-2xl font-bold text-primary">And building apps.</p>
			<p class="text-base-content/70">
				Web apps, mobile apps, you name it. I have an idea list a mile long and I am looking to see
				just how many useful and fun tools I can ship for people.
			</p>
		</div>
	</div>
</section>

<!-- HOW I CAN HELP -->
<section class="py-20 lg:py-32 px-6">
	<div class="max-w-4xl mx-auto">
		<h2 class="text-4xl md:text-6xl font-black text-center mb-16">
			How I can <span class="text-primary">help you</span>
		</h2>

		<div class="grid md:grid-cols-2 gap-8">
			<div class="bg-base-200 p-8 rounded-2xl border-b-4 border-primary">
				<h3 class="text-2xl font-bold mb-4">Want cool stuff in your inbox?</h3>
				<p class="text-base-content/70 mb-6">
					Join my weekly newsletter for interesting finds and cool tools that'll make your life
					better.
				</p>
				<span class="text-primary font-semibold">👇 Use the form below</span>
			</div>

			<div class="bg-base-200 p-8 rounded-2xl border-b-4 border-secondary">
				<h3 class="text-2xl font-bold mb-4">Want to better your brand?</h3>
				<p class="text-base-content/70 mb-6">
					I'm a master at producing content and doing digital marketing that makes people follow you
					with fierce loyalty.
				</p>
				<a href="mailto:pete@doyouevenblog.com" class="btn btn-secondary"> Let's chat </a>
			</div>
		</div>
	</div>
</section>

<!-- CTA SECTION -->
<section
	class="bg-gradient-to-br from-neutral via-neutral to-base-300 py-16 lg:py-32 text-neutral-content"
>
	<div class="max-w-3xl mx-auto px-6 text-center">
		<h2 class="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
			Follow me.
			<br />
			<span class="text-primary">Not in a weird way.</span>
		</h2>

		<p class="text-lg md:text-xl opacity-80 mb-10 max-w-xl mx-auto">
			This is NOT a sales funnel. It's a friendly, human email I send out weekly-ish, sharing cool
			stuff I find.
		</p>

		<form class="max-w-md mx-auto">
			<div class="flex flex-col sm:flex-row gap-3">
				<input
					type="email"
					placeholder="your@email.com"
					bind:value={email}
					class="input input-bordered input-lg flex-1 text-neutral bg-neutral-content"
				/>
				<button type="submit" class="btn btn-primary btn-lg font-bold" onclick={handleSubmit}>
					I'm in!
				</button>
			</div>
		</form>

		<p class="text-sm opacity-50 mt-6">No spam. Unsubscribe anytime. Pinky promise.</p>
	</div>
</section>
