<script>
	import Head from '$lib/components/Head.svelte';

	let email = '';
	// zapier requires a premium zapier plan
	let zapierUrl = 'https://hooks.zapier.com/hooks/catch/1152094/37x1vsq/';

	const handleSubmit = async () => {
		const res = await fetch('/api/zapier', {
			method: 'POST',

			headers: {
				'Content-Type': 'application/json'
			},

			body: JSON.stringify({ email, zapierUrl })
		});

		if (res.ok) {
			// goto('/thank-you-page-you-need-to-create');
			alert('Ur in! Check your email for confirmation!');
		} else {
			console.error('Failed to submit email');
			alert('Failed to submit email');
		}
	};
</script>

<Head title="About" />

<!-- header -->
<div class="px-8 lg:px-48 py-4 lg:py-20 text-center m-4">
	<h1 class="mb-4 md:mb-8 font-black text-3xl lg:text-7xl">
		I, Pete McPherson, am a <i>generalist.</i>
	</h1>
	<p class="mb-3 text-primary italic">A true jack of all trades.</p>
</div>

<!-- divider -->
<div class="flex flex-col w-full">
	<div class="divider divider-primary">story 👇</div>
</div>

<!-- text -->

<div class="py-4 lg:py-12">
	<div class="mx-5 md:w-1/2 md:mx-auto prose">
		<p>
			I never really knew what I wanted to be when I grew up. I wanted to be everything! <i
				>How could one person choose to just do one thing all of their life?</i
			>
		</p>

		<p>So I struggled.</p>
		<p>
			I was good at a lot of things and chose to pursue music until I realized I didn't actually
			want to do it as a living. Three years into my college degree, no less...
		</p>
		<p>
			I was told by my parents, teachers, counselors, and just about everybody else that all I
			needed in life was to "get a job."
		</p>
		<p>
			So after finally graduating with a degree in sociology from the University of Georgia, I
			decided to go a completely different route and get my master's in accounting so I could be a
			highly paid accountant.
		</p>
		<p>Fun, right?</p>
		<p><i>Right?!</i></p>
		<p>
			I graduated, got a full-time adult job, passed my CPA exam, and got my CPA license, and I
			<span class="text-error">HATED</span> basically every second of it for a couple of years.
		</p>
		<h2>So I quit.</h2>
		<p>
			I decided to leave a really fantastic career and pursue a job at a startup that would allow me
			to develop my entrepreneurial muscle.
		</p>
		<p>
			After selling our house and moving across the state, my family of three and a half (my wife
			was expecting our 2nd child)...I started my job...
		</p>
		<p>...and got laid off after <span class="text-success">one paycheck.</span></p>
		<p>womp womp.</p>
		<h2>
			So I reached out and spoke to some Creator friends who were making more than six figures a
			year...
		</h2>
		<p>I asked them tons of questions. I wanted to know HOW.</p>
		<p>
			Thankfully, I was smart enough to record and publish these sessions, and the (award-winning)
			Do You Even Blog Podcast was born.
		</p>
		<p>That was May of 2017, and I've been going strong ever since ;)</p>
		<h2>Now, I'm a generalist.</h2>
		<ul>
			<li>I've given keynote speaches</li>
			<li>I've built 4 apps in the past year, which have grossed $50k. I'm not a developer.</li>
			<li>The DYEB podcast has over 2M downloads (and I have another podcast as well)</li>
			<li>I have 3 YouTube channels</li>
			<li>I own a portfolio of smaller websites (i.e. blogs)</li>
			<li>
				I've worked with dozens of well-known brands, creating cool content and building helpful
				things (mostly in the digital marketing space)
			</li>
			<li>and more.</li>
		</ul>
		<h2>My 'Purpose'</h2>
		<p>Might seem corny, but this is actually surprisingly easy for me.</p>
		<p>
			<mark>I aim to make the internet better. I want to make it more fun and interesting.</mark>
		</p>
		<p>
			These days I am mostly focused on growing my weekly roundup newsletter where I share
			interesting finds and cool tools from around the internet.
		</p>
		<p>and building apps.</p>
		<p>
			Web apps, mobile apps, you name it. I have an idea list a mile long and I am looking to see
			just how many useful and fun tools I can ship for people.
		</p>
		<h2>There are a few different ways I can help you.</h2>
		<p>
			<b>Want to follow along for the ride and discover cool stuff that'll make your life better?</b
			> Use the form below to join my weekly newsletter.
		</p>
		<p>
			<b>Want to better your own brand?</b> I'm a master at producing content and doing digital
			marketing that makes people follow you with fierce loyalty.
			<a href="mailto:pete@doyouevenblog.com">Email me and let's chat</a>.
		</p>
	</div>
</div>

<!-- CTA  -->
<div class="bg-gradient-to-br from-neutral to-neutral-700 py-8 lg:py-24 text-neutral-content">
	<div class="md:w-1/2 mx-2 md:mx-auto leading-loose text-center">
		<h1 class="my-10 font-black text-3xl lg:text-7xl">Follow me. Not in a weird way.</h1>
		<p class="mb-3">
			This is NOT a sales funnel. It's a friendly, human email I send out weekly-ish, sharing cool
			stuff I find.
		</p>

		<form class="my-8">
			<div class="flex flex-col md:flex-row md:flex-wrap gap-2">
				<input
					type="email"
					placeholder="Enter your email"
					bind:value={email}
					class="input input-bordered text-neutral-content md:flex-auto"
				/>
				<button type="submit" class="btn btn-secondary md:flex-initial" on:click={handleSubmit}>
					Sign me up!
				</button>
			</div>
		</form>
	</div>
</div>
