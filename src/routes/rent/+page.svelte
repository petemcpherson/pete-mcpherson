<script>
	import Head from '$lib/components/Head.svelte';
	import { page } from '$app/stores';
	import camera from '$lib/assets/images/camera.png';

	let modalOpen = $state(false);
	const CAMERA_GOAL = 2300;
	let totalRaised = $state(896); // total dollar amount raised
	let cameraProgress = $derived(Math.min(100, Math.round((totalRaised / CAMERA_GOAL) * 100)));
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Head title="Hire Pete" />

{#if $page.url.searchParams.get('submitted') === 'true'}
	<div class="bg-success text-success-content py-5 text-center px-6">
		<p class="font-semibold text-lg">Got it! Pete will be in touch within 24 hours. 🎉</p>
	</div>
{/if}

<!-- Hero -->
<section class="w-full md:w-3/4 mx-auto px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
	<div class="grid md:grid-cols-2 gap-12 md:gap-16 items-center my-8 md:my-16">
		<!-- Left: headline + image -->
		<div>
			<img src={camera} alt="Fujifilm X100VI" class="w-full rounded" />
		</div>
		<!-- Right: subhead + CTA -->
		<div class="flex flex-col gap-8 justify-center text-xl">
			<h1 class=" text-5xl lg:text-6xl xl:text-7xl mb-8">
				Pete is for rent<br />(So He Can Buy a Camera)
			</h1>
			<p>A few days back, I woke up wanting a Fujifilm X100VI.</p>
			<p>But I don't <em>need it</em> need it, ya know?</p>
			<p>So I'mma do some freelancing for fun.</p>
			<p>
				You can rent me to help you out with your business, and I'll raise money for the camera. ;)
			</p>
			<p class="text-3xl">👇</p>
		</div>
	</div>
</section>

<!-- Progress Bar -->
<section class="progress-section">
	<div class="max-w-5xl mx-auto px-8">
		<div class="progress-header">
			<div class="progress-meta">
				<span class="progress-eyebrow">Camera fund</span>
				<span class="progress-goal">Fujifilm X100VI · $2,300 goal</span>
			</div>
			<div class="progress-pct">
				{cameraProgress}<span class="pct-sign">%</span>
			</div>
		</div>

		<div class="progress-track">
			{#if cameraProgress > 0}
				<div class="progress-fill" style="width: {cameraProgress}%">
					<div class="progress-edge-glow"></div>
				</div>
			{/if}
		</div>

		<div class="progress-footer text-primary">
			<span>$0</span>
			<span class="progress-raised">${Math.round(totalRaised).toLocaleString()} raised</span>
			<span>$2,300</span>
		</div>
	</div>
</section>

<!-- Pricing -->
<section id="options" class="max-w-5xl mx-auto px-8 py-16 lg:py-24">
	<h2 class="text-center my-8 md:my-16 text-4xl lg:text-5xl mb-14">Rent Pete for your biz</h2>

	<div class="grid md:grid-cols-3 gap-6">
		<!-- $99 -->
		<div class="price-card">
			<div>
				<span class="text-xs uppercase tracking-widest font-black text-base-content/40 block mb-4"
					>Option 1</span
				>
				<div class="flex items-baseline gap-2 mb-3">
					<span class="text-5xl font-black">$99</span>
					<span class="text-base-content/50 text-sm">one-time</span>
				</div>
				<h3 class="text-xl font-bold mb-1">99 Minute Zoom call with Pete</h3>
				<!-- <p class="text-base-content/60 text-sm leading-relaxed">
					Fast clarity. Real answers. Immediate momentum.
				</p> -->
			</div>

			<div>
				<p class="text-xs uppercase tracking-widest font-black text-base-content/40 mb-3">
					We'll hang out on Zoom:
				</p>
				<ul class="space-y-2 text-base leading-relaxed">
					<li class="flex gap-2"><span class="text-base-content/30">—</span>Coaching</li>
					<li class="flex gap-2"><span class="text-base-content/30">—</span>Consulting</li>
					<li class="flex gap-2"><span class="text-base-content/30">—</span>Idea Brainstorming</li>
					<li class="flex gap-2"><span class="text-base-content/30">—</span>Product Feedback</li>
					<li class="flex gap-2"><span class="text-base-content/30">—</span>Other</li>
				</ul>
			</div>

			<div>
				<p class="text-xs uppercase tracking-widest font-black text-base-content/40 mb-3">
					You leave with:
				</p>
				<ul class="space-y-2 text-base leading-relaxed">
					<li class="flex gap-2"><span class="text-base-content/30">—</span>clear next steps?</li>
					<li class="flex gap-2"><span class="text-base-content/30">—</span>tactical fixes?</li>
					<li class="flex gap-2">
						<span class="text-base-content/30">—</span>recording of our call
					</li>
				</ul>
			</div>

			<div class="mt-auto pt-2">
				<p class="text-xs text-base-content/40 mb-4 italic">
					NOTE: You can buy multiple calls, and we can hang out once a week for a few weeks? Once a
					month for 3 months? Once a year for 10 years?
				</p>
				<a
					href="https://buy.stripe.com/eVq3cwfCi2I6fG6ekn8AE05"
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-primary w-full"
				>
					Book $99 Session
				</a>
			</div>
		</div>

		<!-- $199 -->
		<div class="price-card">
			<div>
				<span class="text-xs uppercase tracking-widest font-black text-base-content/40 block mb-4"
					>Option 2</span
				>
				<div class="flex items-baseline gap-2 mb-3">
					<span class="text-5xl font-black">$199</span>
					<span class="text-base-content/50 text-sm">one-time</span>
				</div>
				<h3 class="text-xl font-bold mb-1">Rent me for half a day</h3>
				<!-- <p class="text-base-content/60 text-sm leading-relaxed">We ship something. Period.</p> -->
			</div>

			<div>
				<p class="text-xs uppercase tracking-widest font-black text-base-content/40 mb-3">
					What's included:
				</p>
				<ul class="space-y-2 text-base leading-relaxed">
					<li class="flex gap-2">
						<span class="text-base-content/30">—</span>3-4 hours of workin for you!
					</li>
					<li class="flex gap-2">
						<span class="text-base-content/30">—</span>Zoom calls?
					</li>
					<li class="flex gap-2"><span class="text-base-content/30">—</span>Freelance work?</li>
				</ul>
			</div>

			<div>
				<p class="text-xs uppercase tracking-widest font-black text-base-content/40 mb-3">
					We can:
				</p>
				<ul class="space-y-2 text-base leading-relaxed">
					<li class="flex gap-2"><span class="text-base-content/30">—</span>build landing pages</li>
					<li class="flex gap-2">
						<span class="text-base-content/30">—</span>wireframe SaaS ideas
					</li>
					<li class="flex gap-2"><span class="text-base-content/30">—</span>set up automations</li>
					<li class="flex gap-2"><span class="text-base-content/30">—</span>map monetization</li>
					<li class="flex gap-2"><span class="text-base-content/30">—</span>fix funnels</li>
					<li class="flex gap-2"><span class="text-base-content/30">—</span>ship scrappy MVPs</li>
				</ul>
			</div>

			<div class="mt-auto pt-2">
				<p class="text-sm text-base-content/60 mb-4">You leave with something real.</p>
				<a
					href="https://buy.stripe.com/dRm8wQahYciGbpQgsv8AE06"
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-primary w-full"
				>
					Book $199 Session
				</a>
			</div>
		</div>

		<!-- $499 -->
		<div class="price-card featured">
			<div>
				<div class="flex items-center justify-between mb-4">
					<span class="text-xs uppercase tracking-widest font-black text-base-content/40"
						>Option 3</span
					>
					<span class="badge badge-primary badge-sm">My favorite 😄</span>
				</div>
				<div class="flex items-baseline gap-2 mb-3">
					<span class="text-5xl font-black">$499</span>
					<span class="text-base-content/50 text-sm">one-time</span>
				</div>
				<h3 class="text-xl font-bold mb-1">I'll build you a micro-SaaS</h3>
				<p class="text-base-content/60 text-sm leading-relaxed">👉 limited to 2 people</p>
			</div>

			<div>
				<p class="text-xs uppercase tracking-widest font-black text-base-content/40 mb-3">
					In one week, I'll build you an app!
				</p>
				<ul class="space-y-2 text-base leading-relaxed">
					<li class="flex gap-2">
						<span class="text-base-content/30">—</span>build a scrappy working app
					</li>
					<li class="flex gap-2"><span class="text-base-content/30">—</span>deploy it</li>
					<li class="flex gap-2">
						<span class="text-base-content/30">—</span>hand over access to you
					</li>
					<li class="flex gap-2">
						<span class="text-base-content/30">—</span>walk you through everything
					</li>
					<li class="flex gap-2"><span class="text-base-content/30">—</span>outline next steps</li>
				</ul>
			</div>

			<div>
				<p class="text-xs uppercase tracking-widest font-black text-base-content/40 mb-3">
					What do you want?
				</p>
				<ul class="space-y-2 text-base leading-relaxed">
					<li class="flex gap-2"><span class="text-base-content/30">—</span>iPhone app?</li>
					<li class="flex gap-2">
						<span class="text-base-content/30">—</span>Full software company?
					</li>
					<li class="flex gap-2">
						<span class="text-base-content/30">—</span>Includes app, website, Stripe-integrated,
						email integrated, database-integrated, etc?
					</li>
					<li class="flex gap-2">
						<span class="text-base-content/30">—</span>Just about anything ;)
					</li>
				</ul>
			</div>

			<div class="mt-auto pt-2">
				<p class="text-xs text-base-content/40 mb-4 italic">
					Not enterprise builds. Just fast, real MVPs.
				</p>
				<button class="btn btn-primary w-full" onclick={() => (modalOpen = true)}>
					Apply for $499 Build
				</button>
			</div>
		</div>
	</div>
</section>

<div class="max-w-5xl mx-auto px-8">
	<div class="border-t border-base-content/10"></div>
</div>

<!-- FAQ -->
<section class="max-w-5xl mx-auto px-8 py-16 lg:py-24">
	<h2 class=" text-4xl lg:text-5xl mb-14">FAQ</h2>

	<div class="grid md:grid-cols-2 gap-x-16 gap-y-10 max-w-4xl">
		<div>
			<p class="font-semibold mb-2">Who is this for?</p>
			<p class="text-base-content/60 leading-relaxed text-sm">
				Founders, creators, indie hackers, marketers, and people building things online.
			</p>
		</div>
		<div>
			<p class="font-semibold mb-2">Who is this NOT for?</p>
			<p class="text-base-content/60 leading-relaxed text-sm">
				Large teams, enterprise builds, or long-term consulting or coaching..
			</p>
		</div>
		<div>
			<p class="font-semibold mb-2">What tech stacks do you use?</p>
			<p class="text-base-content/60 leading-relaxed text-sm">
				Mostly SvelteKit + Firebase + modern AI tooling — but strategy calls don't require dev
				knowledge.
			</p>
		</div>

		<div>
			<p class="font-semibold mb-2">Why are you doing this?</p>
			<p class="text-base-content/60 leading-relaxed text-sm">
				Because it sounded fun and I want to buy a camera.
			</p>
		</div>
		<div>
			<p class="font-semibold mb-2">Will you do this again?</p>
			<p class="text-base-content/60 leading-relaxed text-sm">Probably not 😄</p>
		</div>
	</div>
</section>

<!-- $499 Modal -->
{#if modalOpen}
	<div class="modal modal-open">
		<div class="modal-box max-w-lg relative bg-primary text-primary-content">
			<button
				class="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
				onclick={() => (modalOpen = false)}
			>
				✕
			</button>

			<h3 class="text-2xl font-bold mb-1">Apply for the $499 Build</h3>
			<p class=" text-sm mb-6">Tell me what you're building and I'll follow up within 24 hours.</p>

			<form action="https://formsubmit.co/pete@doyouevenblog.com" method="POST" class="space-y-4">
				<input type="hidden" name="_subject" value="New $499 SaaS Build Inquiry" />
				<input type="hidden" name="_captcha" value="false" />
				<input type="hidden" name="_next" value="https://petemcpherson.com/rent?submitted=true" />

				<div class="form-control">
					<label class="label" for="name">
						<span class="label-text text-primary-content">Your name</span>
					</label>
					<input
						type="text"
						id="name"
						name="name"
						class="input input-bordered w-full text-primary"
						placeholder="Your name"
						required
					/>
				</div>

				<div class="form-control">
					<label class="label" for="email">
						<span class="label-text text-primary-content">Your email</span>
					</label>
					<input
						type="email"
						id="email"
						name="email"
						class="input input-bordered w-full text-primary"
						placeholder="your@email.com"
						required
					/>
				</div>

				<div class="form-control">
					<label class="label flex-col items-start gap-1" for="message">
						<span class="label-text leading-relaxed text-primary-content">
							Tell me about the Micro-saas idea you'd like me to build. You don't need 100% of the
							details, but I'm just trying to make sure I can build what you want in a timely
							manner!
						</span>
						<span class="text-xs text-primary-content/40 my-4">
							NOTE: Whatever you write is 100% confidential.
						</span>
					</label>
					<textarea
						id="message"
						name="message"
						class="textarea textarea-bordered w-full h-36 text-primary"
						placeholder="Write something here ;)"
						required
					></textarea>
				</div>

				<button type="submit" class="btn btn-primary w-full">Send Application</button>
			</form>
		</div>
		<div class="modal-backdrop" onclick={() => (modalOpen = false)}></div>
	</div>
{/if}

<style>
	.serif {
		font-family: 'Instrument Serif', serif;
	}
	.price-card {
		border: 1px solid oklch(var(--bc) / 0.12);
		border-radius: 1rem;
		padding: 2.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	/* ── Progress Section ── */
	.progress-section {
		width: 100%;
		padding: 4rem 0 3.5rem;
		border-top: 1px solid oklch(var(--bc) / 0.08);
		border-bottom: 1px solid oklch(var(--bc) / 0.08);
	}

	.progress-header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		margin-bottom: 1.5rem;
		gap: 1rem;
	}

	.progress-meta {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.progress-eyebrow {
		font-size: 0.75rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: oklch(var(--bc) / 0.6);
	}

	.progress-goal {
		font-size: 1.1rem;
		color: oklch(var(--bc) / 0.75);
	}

	.progress-pct {
		font-size: clamp(5.5rem, 13vw, 10rem);
		line-height: 0.9;
		font-weight: 400;
		color: oklch(var(--bc) / 1);
		letter-spacing: -0.02em;
	}

	.pct-sign {
		font-size: 0.45em;
		opacity: 0.7;
		vertical-align: super;
		line-height: 1;
	}

	.progress-track {
		width: 100%;
		height: 36px;
		background: oklch(var(--bc) / 0.08);
		border-radius: 6px;
		overflow: visible;
		position: relative;
	}

	.progress-fill {
		height: 100%;
		border-radius: 6px;
		background: linear-gradient(
			90deg,
			var(--color-primary, #7c3aed) 0%,
			var(--color-primary, #7c3aed) 40%,
			var(--color-secondary, #06b6d4) 100%
		);
		background-size: 300% 100%;
		animation: shimmer 3s ease-in-out infinite;
		transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
	}

	.progress-edge-glow {
		position: absolute;
		right: -1px;
		top: 50%;
		transform: translateY(-50%);
		width: 3px;
		height: 150%;
		background: white;
		border-radius: 999px;
		box-shadow:
			0 0 8px 4px color-mix(in srgb, var(--color-secondary, #06b6d4) 70%, white 30%),
			0 0 24px 8px color-mix(in srgb, var(--color-primary, #7c3aed) 60%, transparent);
		animation: pulse-glow 1.8s ease-in-out infinite;
	}

	.progress-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 0.85rem;
		font-size: 0.85rem;
		color: oklch(var(--bc) / 0.6);
		letter-spacing: 0.04em;
	}

	.progress-raised {
		font-size: 0.95rem;
		color: var(--color-primary, #7c3aed);
		font-weight: 600;
		letter-spacing: 0.02em;
	}

	@keyframes shimmer {
		0% {
			background-position: 100% center;
		}
		50% {
			background-position: 0% center;
		}
		100% {
			background-position: 100% center;
		}
	}

	@keyframes pulse-glow {
		0%,
		100% {
			opacity: 1;
			box-shadow:
				0 0 8px 4px color-mix(in srgb, var(--color-secondary, #06b6d4) 70%, white 30%),
				0 0 24px 8px color-mix(in srgb, var(--color-primary, #7c3aed) 60%, transparent);
		}
		50% {
			opacity: 0.5;
			box-shadow:
				0 0 4px 2px color-mix(in srgb, var(--color-secondary, #06b6d4) 40%, white 60%),
				0 0 12px 4px color-mix(in srgb, var(--color-primary, #7c3aed) 30%, transparent);
		}
	}
	.price-card.featured {
		border-color: oklch(var(--p) / 0.5);
		background: oklch(var(--p) / 0.04);
	}
</style>
