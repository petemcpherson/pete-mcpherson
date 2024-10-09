<script>
	import Head from '$lib/components/Head.svelte';
	export let data;

	const post = data.post;
	const title = post.title;
	const description = post.description;
</script>

<Head {title} {description} />

<!-- start content -->

<p>
	I pay for <em>premium </em>internet (up to 800 Mbps), but I have been disappointed with it for
	YEARS.
</p>

<p>I've never gotten more than 150 Mbps on wifi, even sitting right next to the router.</p>

<p><b class="text-primary">2 weeks ago--my speeds dropped to 1.5 Mbps</b> (not a typo).</p>

<p>I could hardly work. My kids took dang-near 90 minutes to watch a 20 minutes TV show.</p>

<p>SLOW INTERNET IS INFURAITING in 2024--especially when you're paying for high speeds.</p>

<p>So I dove deep.</p>
<div class="sticky-note text-center flex flex-col items-center">
	<img
		alt="wifi sticky note"
		src="https://doyouevenblog.com/sendy/uploads/1727353604.JPG"
		class="w-5/6"
		loading="lazy"
	/>

	<p>
		(<a
			class="text-primary underline"
			href="https://drive.google.com/file/d/1KVNDxgpW6AqmaFMKqqb0kPmLbk4wit_x/view?usp=sharing"
			>Here's a link to the high-resolution sticky note</a
		>)
	</p>
</div>

<h2>First, some Assumptions</h2>

<ol>
	<li>
		You are paying for cable internet (or fiber or satellite), and have ACCESS to high-speed
		internet (50+ Mbps download)
	</li>
	<li>Mbps = Megabits per second</li>
	<li>
		You have a decent modem (for most people, their Internet Service Provider (ISP) provides this).
	</li>
</ol>

<h2>1 - $150-200 router, MAX</h2>

<p>Cheap routers are cheap for a reason. Anything under $75 truly IS NOT worth purchasing.</p>

<p>
	On the other hand, any router over $200 is OVERKILL for 99.99% of people, and you don't need it.
</p>

<p>See recommended routers below.</p>

<h2>2 - Placement is everything</h2>

<p>Good news and bad news...</p>

<p>
	Bad News = 90% of getting great internet speed is POSITIONING YOUR ROUTER & DEVICES, and it's a
	pain sometimes.
</p>

<p>Good News = this is almost totally in your control.</p>

<p>IDEALLY, you'd want to...</p>

<ul>
	<li>Limit <em>floors </em>between the router and your device(s)</li>
	<li>Limit <em>walls </em>between them</li>
	<li>AVOID metal objects near your router, as they can mess with signal</li>
	<li>Have a direct line-of-sight from the device to the router</li>
</ul>

<p>
	Place your router out in the open. Place your router close to your devices (home office?) OR in
	the middle of your house (if you need wifi everywhere).
</p>

<p>Avoid basements. Avoid closets.</p>

<h2>3 - Wired is always better than wireless</h2>

<p>...in terms of speed.</p>

<p>You'll get the fastest speeds if you can hardwire into your router.</p>

<p>
	(No Ethernet plug on your laptop? <a
		class="text-primary underline"
		href="https://amzn.to/3N1E6KC"
		target="_blank"
		rel="noopener noreferrer">Grab a $13 adapter</a
	>.)
</p>

<p>
	(Also, don't bother paying for expensive ethernet cables. Cat7 or <a
		class="text-primary underline"
		href="https://amzn.to/4eFSDaW"
		target="_blank"
		rel="noopener noreferrer">Cat8</a
	> is easy to come by and cheap--but even Cat5 or Cat6 is still ok.)
</p>

<h2>4 - "Mesh" = Marketing</h2>

<p>
	"Mesh" is mostly a buzzword that sounds nice. You can add Access Points to any router. (but that
	doesn't Mesh systems can't be good, btw!).
</p>

<p>A "mesh" system is "using multiple Access Points, connected wirelessly, to extend WiFi."</p>

<p>
	Your device finds the best/nearest mesh node (read: Access Point)--and connects to that, rather
	than your router.
</p>

<img
	alt="mesh routers"
	src="https://doyouevenblog.com/sendy/uploads/1727354971.png"
	class="w-full"
/>

<p><strong>Mesh systems can still be great if you...</strong></p>

<ol>
	<li>Have a HUGE area you need WiFi for</li>
	<li>Can't change your router placement</li>
	<li>Can't HARDWIRE an Ethernet cable from your router to an access point</li>
</ol>

<p>
	An "Access Point" is another device you can wire into your router, acting like another WiFi
	router.
</p>

<p>
	<em
		>Most modern routers even have an "Access Point mode" you can enable--meaning you can use them
		as access points if/when you upgrade your router.</em
	>
</p>

<p>
	<strong
		>This requires a LOT more advanced conversation if you really want to understand it--but for
		now, just realize that "mesh" systems aren't necessarily better!!</strong
	>
</p>

<p>
	<strong>Example</strong>: I've had a mesh system for 6 years. I upgraded to a single router last
	week, in my basement--and my wireless speeds <em>literally </em>doubled. Coverage is excellent in
	my 1,600 sq/ft house.
</p>

<h2>5 - Bad Inputs? SQUIRREL! 🐿️</h2>

<p>
	If you're experiencing slow or spotty internet, the <em>first </em>thing you should do is call
	your cable company...
</p>

<p>Why?</p>

<p>They can easily and quickly check the "inputs."</p>

<p>I.e. the actual internet speeds coming INTO YOUR MODEM FROM OUTSIDE.</p>

<p>That's going to be fine 95% of the time, and you should focus on placements and routers.</p>

<p>...but.........</p>

<p>There's the other 5% 🐿️🐿️🐿️</p>

<p>
	<strong
		>After complaining about my ISP for years, I finally called them last week, and they sent a guy
		to my house.</strong
	>
</p>

<p>
	3 minutes in, he said <em
		>"Yeah I can't even get a good input signal from your modem, let me check the wires outside."</em
	>
</p>

<p>
	3 minutes after that, he said <em
		>"Yeah it looks like some animals been GNAWING on your cable for a long time. It's basically
		shot."</em
	>
</p>

<p>.......🐿️.......</p>

<p>He spent 2 hours replacing cable lines in my backyard.</p>

<p>My wireless went from 1-5 Mbps, to 150-200 Mbps.</p>

<p>
	<em
		>🤯 and <a
			href="https://youtu.be/hFZFjoX2cGg?si=vgno2x3GZpylal7x"
			class="text-primary underline"
			target="_blank"
			rel="noopener noreferrer">now I'm putting Squirrel mazes</a
		> in my backyard.</em
	>
</p>

<h2>6 - Wiisfi.com</h2>

<p>Sometimes, the internet feels lame.</p>

<p>
	Othertimes, we stumble upon resources like <a
		href="https://www.wiisfi.com/"
		class="text-primary underline"
		target="_blank"
		rel="noopener noreferrer">Wiisfi.com</a
	>.
</p>

<p>Who made this?!</p>

<p>A legend.</p>

<p>This was my <em>primary </em>resource for allll my wifi studying these past few weeks.</p>

<p>
	If you EVER wanted to learn ANYTHING about home networking--that 1 URL is all you ever need. It's
	crazy.
</p>

<h2>Resources & Recommendations</h2>

<p>BEFORE I knew about the squirrels--I bought a new router (on sale woot woot).</p>

<ul>
	<li>OLD system = Google Mesh WiFi pucks (2016 model).</li>
	<li>
		New Router = <a
			class="text-primary underline"
			href="https://amzn.to/3THpmo5"
			target="_blank"
			rel="noopener noreferrer">TP-Link AX6000</a
		>
	</li>
</ul>

<p>My wife says it looks like something out of the Matrix.</p>

<p>
	<img
		alt="TP-Link AX6000"
		src="https://doyouevenblog.com/sendy/uploads/1727355977.png"
		class="w-full"
	/>
</p>

<p>
	After the outside cable was replaced, my internet was no longer "broken," even with my 6-year-old
	"Mesh" system.
</p>

<p>
	I was getting 120 Mbps wireless from my living room (nowhere near my router), and about 300 Mbps
	right next to my router (in my basement).
</p>

<p>When I connected the AX6000, those speeds more than doubled.</p>

<p>
	I'm writing this email from my couch (nowhere near my matrix router) and getting 546.82 Mbps 🥳🎊
</p>

<p>
	<img
		alt="current download speed"
		src="https://doyouevenblog.com/sendy/uploads/1727355531.png"
		class="w-full"
	/>
</p>

<p>
	Tested with <a
		class="text-primary underline"
		href="https://www.speedtest.net/"
		target="_blank"
		rel="noopener noreferrer">https://www.speedtest.net/</a
	> of course.
</p>

<p>BOOM. That's it!</p>

<div class="sticky-note p-4 md:p-8 text-black font-black">
	<p>Want to learn all about passkeys? I.e. those weird new password replacements?</p>
	<p>
		<a class="text-primary underline" href="/blog/passkeys">Check out that sticky note guide here</a
		>
	</p>
</div>
