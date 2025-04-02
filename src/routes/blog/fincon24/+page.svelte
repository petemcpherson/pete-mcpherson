<script>
	import Head from '$lib/components/Head.svelte';
	import stress_test from '$lib/assets/images/fincon24/stress_test.png';
	import joe from '$lib/assets/images/fincon24/joe.png';
	import mins from '$lib/assets/images/fincon24/mins.png';
	import fincon2024_takeaways from '$lib/assets/images/fincon24/fincon2024_takeaways.jpg';

	let { data } = $props();

	const post = data.post;
	const title = post.title;
	const description = post.description;
	const img = fincon2024_takeaways;
	let email = $state();

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
</script>

<Head {title} {description} {img} />

<!-- start content -->
<img class="w-full" src={fincon2024_takeaways} alt="FinCon24" />
<div>
	<p>
		FinCon24 in Atlanta was a blast. I met a lot of cool people, learned a few things, and got to
		hang out with some friends.
	</p>
	<p>Here are my personal takeaways👇</p>
	<h2>Everybody believes the state of blogging is getting worse/harder</h2>
	<p>
		Hat/Tip to <a
			href="https://thecollegeinvestor.com/"
			class="link text-primary underline"
			target="_blank">Robert Farrington from The College Investor</a
		>.
	</p>
	<p>
		Blogging is in a weird spot right now, and it seems like <em>everybody</em> at FinCon is 'bearish'
		on blogging & SEO.
	</p>
	<p>There's WAY less chatter about opportunities, success stories, etc.</p>
	<p>Is blogging dead?!</p>
	<p>Did AI kill it?! DID GOOGLE KILL IT?! (more likely)</p>
	<p>
		My friend Robert, who I'd consider hyper-successful in the blogging world, was telling me about
		his AI research: <a
			href="https://thecollegeinvestor.com/47758/google-ai-misleads-in-43-of-finance-related-searches/#google_vignette"
			class="link text-primary underline"
			target="_blank">Google AI Inaccurate In 43% Of Finance-Related Searches.</a
		>
	</p>
	<p>People are BUMMED about what AI has done to/for blogging.</p>
	<p>
		<strong>MY TAKEAWAY</strong>: On one hand, the less interest in blogging, the more opportunity.
		On the other hand--the blogging roller coaster is NOT finished, so now is NOT the time to make
		long-term decisions or conclusions.
	</p>
	<h2>Your business should be stress-tested (occasionally)</h2>
	<!-- image -->
	<img class="w-full" src={stress_test} alt="stress test" />
	<p>
		Hat/tip to <a
			href="https://www.youtube.com/@TaeKimFinancialTortoise"
			class="link text-primary underline"
			target="_blank">Tae Kim from Financial Tortoise.</a
		>
	</p>
	<p>Last month, I started another YouTube channel (my 4th).</p>
	<p>Was this a good idea?</p>
	<p>
		I honestly didn't pause much to think about that...I simply saw an opportunity and wanted to
		explore it.
	</p>
	<p>
		At FinCon, I got to hang out with my buddy Tae, and I was reminded that his YouTube channel took <em
			>years</em
		> to explode (and explode it has!!).
	</p>
	<p>This brought up questions...</p>
	<ul>
		<li>Do I really WANT this new YouTube channel?</li>
		<li>How much time is this going to take? (and take AWAY from my other projects!)</li>
		<li>What other "strategies" of mine need a quick stress test??</li>
	</ul>
	<p>
		<strong>MY TAKEAWAY</strong>: Being around other people--in person--can often FORCE a birds-eye
		view (objectivity) of your business.
	</p>
	<h2>Act like you're a professional</h2>
	<img class="w-full" src={joe} alt="Joe Saul-Sehy" />
	<p>
		Hat/tip to <a
			href="https://www.stackingbenjamins.com/"
			class="link text-primary underline"
			target="_blank">Joe Saul-Sehy from Stacking Benjamins</a
		>.
	</p>
	<p>
		In his chat about podcasting, Joe told a story about thinking that he was a badass podcasting
		pro...
	</p>
	<p>
		...until he attended a podcasting conference and got to see what REAL pros are doing with their
		shows.
	</p>
	<p>An eye-opening moment that led JOE to up his game.</p>
	<p><strong>ME WATCHING JOE HAD THE SAME EFFECT 🤦</strong></p>
	<p>
		<i>I mean damn--look at him in that pic. I'm in a t-shirt, and he's sporting the jacket.</i>
	</p>
	<p>
		I used to take podcasting more seriously, but I feel like I have gotten lazier in recent years.
	</p>
	<p>I can do better. I can be a pro again.</p>
	<p>
		<strong>MY TAKEAWAY</strong>: Don't overestimate your current level of PRO, but don't
		underestimate how PRO you can become!
	</p>
	<h2>There's something I can offer that few others can</h2>
	<img class="w-full" src={mins} alt="Maximize Miniutes presentation" />
	<p>
		This tip goes out to everybody who attended my presentation (which was <em>loosely</em> on productivity,
		but really about "time freedom.").
	</p>
	<p>Going in to my talk--I wasn't actually convinced that I was going to add a lot of value.</p>
	<p>
		But while it felt like "no brainer" content to ME--I heard from several attendees that they
		learned something brand new.
	</p>
	<p>I am VERY rich in <em>time freedom</em>, but not everybody is.</p>
	<p>
		<strong>MY TAKEAWAY</strong>: Don't take your knowledge & skills for granted. You almost
		CERTAINLY have something you do better than 99% of other people.
	</p>
	<h2>Stop accepting meetings</h2>
	<p>Another unexpected takeaway from my talk...</p>
	<p>
		It wasn't in my script or slides--but at some point I said the words "OH, and stop taking
		meetings."
	</p>
	<p>Y'all.</p>
	<p>People straight-up CHEERED.</p>
	<p>
		I don't even remember the point I was trying to make--but it was clear that I found an
		unexpected pain point.
	</p>
	<p>
		I followed that up with this advice: "When dealing with a meeting request for any reason--try
		responding with 'can we do this over email, instead?'"
	</p>
	<p>Make no mistakes--sometimes meetings are needed. BETTER than emails.</p>
	<p>But let's normalize saying "no" to meetings as well.</p>
	<h2>Everybody wants to feel safe</h2>
	<p>
		Hat/tip to <a
			href="https://www.wealthclinic.com/"
			class="link text-primary underline"
			target="_blank">Leisa Peterson</a
		>!
	</p>
	<ul>
		<li>Literally safe</li>
		<li>Financially safe</li>
		<li>Emotionally safe</li>
	</ul>
	<p>I did NOT always feel safe during this FinCon.</p>
	<p>
		The conference was right in the thick of downtown Atlanta, where many of the city's homeless
		population hang out.
	</p>
	<p>
		First off--my heart totally melts for these individuals (I used to serve breakfast at a shelter
		near midtown).
	</p>
	<p>
		However, I saw crime this week. I saw fights. I got harassed a few times (shouted at several
		times, grabbed twice), and I'm a 6'4" 225lb dude.
	</p>
	<p>Since I moved out of the city about 6 years ago--I had forgotten what this felt like.</p>
	<p>
		UNRELATED (sorta): In a random discussion with my friend Leisa, she uttered the words "everybody
		just wants to feel safe."
	</p>
	<p>I have zero clue what the context was--but that stayed with me.</p>
	<h2>Do more of what you want with less shame</h2>
	<p>ALTERNATE TITLE: 'Life is too short to spend $75 for a meal you're not stoked about.'</p>
	<p>
		The last night of Fincon I went with a group of a dozen others to a dinner at a fancy steakhouse
		down the street.
	</p>
	<p>It was fancy, and expensive, and upon looking at the menu, I saw NOTHING that excited me.</p>
	<p>Sometimes I wouldn't care. I'd be there for friends, and I'd eat whatever.</p>
	<p>This wasn't one of those times.</p>
	<p>
		And funny enough, I notice a few others at the table also filled this way--but it was clear they
		weren't going to leave to go somewhere else (which was ok of course!).
	</p>
	<p>But I did.</p>
	<p>The menu wasn't what I wanted.</p>
	<p>Friends weren't what I <em>needed</em> right then.</p>
	<p>So I left--and went to Hooters for hot wings, beer, and college football.</p>
	<p>AKA "what I wanted."</p>
	<p>NOTE: This was my 1st time going to a Hooters, and it's exactly what I expected 🤷</p>
	<p>10 years ago--I wouldn't have left the steakhouse.</p>
	<p>
		I would've been afraid of judgement, and I would've convinced myself that "what I want doesn't
		matter."
	</p>
	<h2>FINAL NOTE: Conferences are good, and not just in the ways you expect.</h2>
	<p>Every time I attend a conference like FinCon, I get value.</p>
	<p>Sometimes it's knowledge. Often it's connections.</p>
	<p>Sometimes value comes in expected ways. Sometimes unexpected.</p>
	<p>But NONE of that value happens when you stay at home. In my little comfort zone.</p>
	<p>Get out there and meet people. Learn from them. Give them your time, energy, and knowledge.</p>
	<p>
		HUGE thanks to Jessica, Libby, PT, Justin, and the rest of the FinCon team! Y'all did an
		incredible job, as usual.
	</p>
	<p>
		<strong
			>Want to receive a weekly-ish roundup newsletter from me--where I share useful & fun stuff for
			creators? 👇👇</strong
		>
	</p>
	<!-- CTA  -->
	<div class="bg-gradient-to-br from-neutral to-neutral-700 py-8 lg:py-24 text-neutral-content">
		<div class="p-4 md:p-8 md:mx-auto leading-loose text-center">
			<h1 class="my-10 font-black text-2xl lg:text-4xl">
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
	<p>Unsubscribe anytime. Zero spam. Only a little salesy--like twice a year ;)</p>
</div>
