<script>
	/** @type {import('./$types').PageData} */
	// export let data;
	import Head from '$lib/components/Head.svelte';

	const urls = $state({
		listGadget: 'https://listgadget.com',
		bulletfinity: 'https://bulletfinity.com',
		topicalMapAi: 'https://topicalmap.ai',
		fabb: 'https://fabb.ai',
		promptimizer: 'https://promptimizer.com',
		scratchdown: 'https://apps.apple.com/us/app/scratchdown/id6757886153?mt=12',
		yeetMyPics: 'https://apps.apple.com/us/app/yeet-my-pics/id6756081091',
		mawMaw: 'https://mawmaws.app',
		codePlaybook: 'https://codeplaybook.com',
		keebNews: 'https://keebnews.com',
		doYouEvenBlog: 'https://doyouevenblog.com',
		fincon: 'https://finconexpo.com',
		speakerLab: 'https://thespeakerlab.com'
	});

	const sections = [
		{
			title: 'SaaS & AI Products',
			items: [
				{
					name: 'List Gadget',
					period: '2024–Present',
					role: 'Founder, Product Manager & Full‑Stack Developer',
					url: urls.listGadget,
					tags: ['SvelteKit', 'Firebase', 'Stripe', 'Cloudflare/Vercel'],
					bullets: [
						'Email‑marketing SaaS for interactive newsletter and website widgets.',
						'Led UX/UI and shipped MVP with real‑time data sync and onboarding.',
						'Built subscriptions, referrals, analytics, and automation to reduce support.'
					]
				},
				{
					name: 'Bulletfinity.com',
					period: '2025–Present',
					role: 'Founder & Full‑Stack Developer',
					url: urls.bulletfinity,
					tags: ['SvelteKit', 'Firebase', 'Stripe'],
					bullets: [
						'Friction‑less “infinite bullets” note‑taking SaaS with real‑time sync.',
						'Designed scalable data structures for nested lists and collaboration.',
						'Implemented offline caching for fast, reliable cross‑device use.'
					]
				},
				{
					name: 'Topical Map AI',
					period: '2023–2025',
					role: 'Founder & Lead Developer',
					url: urls.topicalMapAi,
					tags: ['OpenAI', 'SvelteKit', 'Firebase', 'SEO'],
					bullets: [
						'AI SEO platform generating topical maps and keyword clusters.',
						'Integrated OpenAI to build semantic recommendations and ideation tools.',
						'Built, launched, and successfully sold the product.'
					]
				},
				{
					name: 'FABB.ai',
					period: '2023–2024',
					role: 'Founder & Engineer',
					url: urls.fabb,
					tags: ['SvelteKit', 'Firebase', 'Stripe'],
					bullets: [
						'Lightweight affiliate‑program SaaS for indie developers.',
						'Built tracking, commissions, payouts, and compliance workflows.',
						'Launched and later sold the product.'
					]
				},
				{
					name: 'Promptimizer.com',
					period: '2023',
					role: 'Founder & Full‑Stack Developer',
					url: urls.promptimizer,
					tags: ['MongoDB', 'Express', 'React', 'Node.js', 'OpenAI'],
					bullets: [
						'AI prompt library MVP built with a MERN stack.',
						'Hands‑on learning platform for full‑stack architecture and deployment.'
					]
				}
			]
		},
		{
			title: 'Native & Cross‑Platform Apps',
			items: [
				{
					name: 'Scratchdown (macOS)',
					period: '2026–Present',
					role: 'Solo Developer',
					url: urls.scratchdown,
					tags: ['Swift', 'SwiftUI', 'Mac App Store'],
					bullets: [
						'Minimalist sticky‑note app with Markdown support.',
						'Shipped on the Mac App Store with licensing and updates.',
						'Focused on distraction‑free UX and performance.'
					]
				},
				{
					name: 'Yeet My Pics (iOS)',
					period: '2025–Present',
					role: 'Founder & Developer',
					url: urls.yeetMyPics,
					tags: ['Swift', 'SwiftUI', 'Apple IAP'],
					bullets: [
						'Photo clean‑up app with fast, intuitive gestures.',
						'Integrated Apple In‑App Purchases and App Store compliance.',
						'Iterated based on user feedback to refine interactions.'
					]
				},
				{
					name: 'Maw Maw’s Recipe App',
					period: '2025–Present',
					role: 'Founder, Designer & Developer',
					url: urls.mawMaw,
					tags: ['Flutter', 'Firebase', 'Apple IAP'],
					bullets: [
						'Private family recipe sharing with subscriptions.',
						'Cross‑platform build with nostalgic, warm UX.',
						'Subscription management across iOS and Android.'
					]
				},
				{
					name: 'Easy Drum Tuner',
					period: '2025',
					role: 'Founder & Developer',
					url: urls.easyDrumTuner,
					tags: ['Flutter', 'DSP'],
					bullets: [
						'Pitch‑detection utility for fast drum tuning.',
						'Optimized mobile DSP routines for performance.'
					]
				}
			]
		},
		{
			title: 'Education & Media',
			items: [
				{
					name: 'Code Playbook',
					period: '2024–Present',
					role: 'Instructor & Curriculum Designer',
					url: urls.codePlaybook,
					tags: ['AI‑Assisted Coding', 'SvelteKit', 'Firebase'],
					bullets: [
						'Course and community teaching non‑developers to build SaaS.',
						'YouTube tutorials and live demos for ~2.5k subscribers.',
						'Curriculum design covering AI, SvelteKit, and product basics.'
					]
				},
				{
					name: 'KeebNews',
					period: 'Ongoing',
					role: 'Founder & Content Creator',
					url: urls.keebNews,
					tags: ['YouTube', 'SEO', 'Community'],
					bullets: [
						'Mechanical keyboard media brand and channel.',
						'Built ~9k subscribers and 4M+ lifetime views.'
					]
				},
				{
					name: 'Do You Even Blog',
					period: '2017–Present',
					role: 'Founder, Host & Marketer',
					url: urls.doYouEvenBlog,
					tags: ['Podcasting', 'Email', 'Growth'],
					bullets: [
						'350+ podcast episodes with 3M+ downloads.',
						'Built newsletter and funnels generating ~$80k in year one.',
						'Managed sponsorships, affiliates, and digital products.'
					]
				}
			]
		},
		{
			title: 'Consulting & Client Work',
			items: [
				{
					name: 'FinCon (Conference)',
					period: '2018–Present',
					role: 'Automation & Systems Partner',
					url: urls.fincon,
					tags: ['Airtable', 'Ticketing', 'CRM', 'Flutter'],
					bullets: [
						'Automated workflows across ticketing, CRM, and email tools.',
						'Built long‑term infrastructure and documentation.',
						'Prototyping a cross‑platform conference mobile app.'
					]
				},
				{
					name: 'The Speaker Lab',
					period: '2018',
					role: 'Integration & Automation Builder',
					url: urls.speakerLab,
					tags: ['Email', 'CRM', 'Funnels'],
					bullets: [
						'Built multi‑step funnels and webinar systems.',
						'Automated lead capture, tagging, and follow‑ups.'
					]
				}
			]
		}
	];
</script>

<Head title="Projects" />

<section class="mx-auto max-w-6xl px-6 pb-28 pt-16 sm:pt-20">
	<div class="flex flex-col gap-8 border-b border-slate-800/60 pb-12 sm:pb-14">
		<p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Projects</p>
		<div class="flex flex-col gap-5">
			<h1 class="text-3xl font-black tracking-tight text-white sm:text-4xl">
				Full‑Stack Products, AI Tools, and Native Apps
			</h1>
			<p class="max-w-3xl text-base text-slate-300 sm:text-lg">
				Entrepreneurial technologist with 8+ years shipping SaaS, native, and automation‑heavy
				products. I build end‑to‑end systems—from UX and data architecture to integrations, billing,
				and growth—focused on speed, clarity, and measurable outcomes.
			</p>
		</div>
		<div class="flex flex-wrap gap-3">
			{#each ['AI & ML', 'SvelteKit', 'Firebase', 'Stripe', 'SwiftUI', 'Flutter', 'Automation'] as skill}
				<span
					class="rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-300"
				>
					{skill}
				</span>
			{/each}
		</div>
	</div>

	<div class="mt-14 space-y-14">
		{#each sections as section}
			<div class="space-y-8">
				<h2 class="text-lg font-black uppercase tracking-[0.25em] text-white sm:text-xl">
					{section.title}
				</h2>
				<div class="grid gap-8 lg:grid-cols-2">
					{#each section.items as item}
						<article
							class="flex h-full flex-col gap-6 rounded-2xl border border-slate-800/60 bg-slate-950/60 p-8 shadow-[0_0_40px_rgba(15,23,42,0.35)]"
						>
							<div class="flex flex-col gap-4">
								<div class="flex flex-wrap items-center justify-between gap-2">
									<h3 class="text-xl font-black text-white">
										{#if item.url}
											<a
												class="transition hover:text-slate-100"
												href={item.url}
												rel="noreferrer"
												target="_blank"
											>
												{item.name}
											</a>
										{:else}
											{item.name}
										{/if}
									</h3>
									<span
										class="rounded-full bg-slate-800/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-300"
									>
										{item.period}
									</span>
								</div>
								<p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
									{item.role}
								</p>
							</div>

							<ul class="space-y-3 text-sm text-slate-300">
								{#each item.bullets as bullet}
									<li class="flex gap-3">
										<span class="mt-1 h-1.5 w-1.5 rounded-full bg-slate-500"></span>
										<span>{bullet}</span>
									</li>
								{/each}
							</ul>

							<div class="mt-auto flex flex-wrap gap-2">
								{#each item.tags as tag}
									<span
										class="rounded-full border border-slate-800/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-400"
									>
										{tag}
									</span>
								{/each}
							</div>
						</article>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>
