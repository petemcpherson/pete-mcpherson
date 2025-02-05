<script>
	import Head from '$lib/components/Head.svelte';
	import roasting from '$lib/assets/images/roasting/roasting.gif';
	import roasting_equipment from '$lib/assets/images/roasting/roasting_equipment.png';
	import canisters from '$lib/assets/images/roasting/canisters.jpg';
	export let data;

	const post = data.post;
	const title = post.title;
	const description = post.description;
</script>

<Head {title} {description} />

<p>Here's the lightning fast guide to making great coffee at home:</p>

<ul>
	<li>
		<strong>Why roast at home?</strong> Save money, control flavor, and it's easier than you think.
	</li>
	<li>
		<strong>Downsides?</strong> Costs $350+ upfront, takes 30 mins a week, and there's a learning curve.
	</li>
	<li>
		<strong>Who should roast?</strong> Coffee lovers who already buy premium beans and don't mind DIY.
	</li>
	<li><strong>Gear needed:</strong> Roaster, green beans, cooling setup, storage.</li>
	<li><strong>Process:</strong> Measure, roast, cool, store, wait 24+ hours.</li>
	<li><strong>Where to buy beans?</strong> Happy Mug, Coffee Bean Corral, Sweet Maria's.</li>
</ul>

<img src={roasting} alt="Coffee Roasting" />

<p>
	<a
		href="https://www.loom.com/share/c9d0150c0fa14279a631f20bff480ecd?sid=80bc5165-010f-4536-a5af-ba955a54acb6"
		target="_blank"
		rel="noopener noreferrer"><em>Click here to view the high-resolution 30-sec video above.</em></a
	>
</p>

<p>
	<span
		>BTW--I need a new name for these short, actionable guides on 'hobbies-Pete-has-gone-deep-on".
		<a href="mailto:pete@doyouevenblog.com">EMAIL ME </a>CLEVER NAME IDEAS. 💌</span
	>
</p>

<p>Previous guides:</p>

<ul>
	<li><a href="/blog/wifi">How to get uber-fast WI-FI at home</a></li>
	<li><a href="/blog/passkeys">WTF are Passkeys?</a></li>
</ul>

<h2>In this article:</h2>

<ul>
	<li><a href="#why-bother">Why bother? Who cares?</a></li>
	<li><a href="#who-should-roast">Who should roast their own coffee?</a></li>
	<li><a href="#equipment">Equipment</a></li>
	<li><a href="#petes-setup">Pete's exact setup</a></li>
	<li><a href="#where-to-buy">Where to buy green beans?</a></li>
	<li><a href="#roasting-process">My exact step-by-step roasting process</a></li>
	<li><a href="#get-started">How to get started</a></li>
	<li><a href="#coffee-facts">Did you know...(coffee facts)</a></li>
</ul>

<h2 id="why-bother">Why bother? Who cares?</h2>

<p>
	Yeah, you'll have to spend some cash and energy getting started, but if you <em>love </em>coffee,
	it IS 100% WORTH it. The weekly-ish roasting time doesn't feel like a chore to me; it's a "relax
	out in the shed/garage" sort of time.
</p>

<p>And not spending $15 for a 10oz bag of coffee every week is nice.</p>

<h2 id="who-should-roast">Who should roast their own coffee?</h2>

<p>If you...</p>

<ul>
	<li>
		<em>Really</em> love coffee. Maybe you rock an Aeropress, pour-over, or espresso setup—or you routinely
		spend $15 for a 12oz bag of whole-bean coffee.
	</li>
	<li>Don't mind spending $350 now to save even more long-term</li>
	<li>Don't mind garage/basement roasting for 30 chill minutes a week (BIG DAD ENERGY).</li>
</ul>

<h2 id="equipment">Equipment</h2>

<p>
	<img alt="my home roasting equipment" src={roasting_equipment} />
</p>

<p>You don't need much.</p>

<ol>
	<li>
		<strong>Roaster</strong> – Two main types: <strong>Drum Roaster</strong>: Kinda like an "oven
		barrel" that spins and cooks beans. More expensive. <strong>Air Roaster</strong>: Uses hot air
		to move and cook beans. Cheaper!
	</li>
	<li><strong>Green Coffee Beans</strong> – Buy unroasted beans online</li>
	<li>
		<strong>Something to Cool the Beans</strong> – Fancy people use cooling trays. I use a $5 colander
		and rechargeable fan.
	</li>
	<li><strong>Something to store beans in</strong> – jars are fine to start with.</li>
</ol>

<h2 id="petes-setup">Pete's exact setup:</h2>

<ol>
	<li>
		<strong>Roaster:</strong>
		<a href="https://amzn.to/3Q9yMX2" target="_blank" rel="noopener noreferrer">Freshroast SR800</a>
		(they sell an SR540 as well, which is smaller. Don't bother)
	</li>
	<li>
		<strong>
			<a
				href="https://www.sweetmarias.com/freshroast-coffee-roaster-glass-extension-tube-sr800.html?srsltid=AfmBOooeVJ4mz97OGFnEamGb9vTbbfyptKFMDx6YMYEIpHJ-b11CRlYV"
				target="_blank"
				rel="noopener noreferrer">Extension tube</a
			> accessory:
		</strong>
		This is sometimes bundled when you buy one—and allows you to roast slightly MORE beans at once—AND
		has much better
		<strong>heat insulation, which allows me to roast outside in Michigan winters(!). </strong>
		<a href="https://amzn.to/42JmWdV" target="_blank" rel="noopener noreferrer"
			>They also sell these bundled with the Freshroast!</a
		>
	</li>
	<li><strong>A cheap colander:</strong> After the roast, I'll dump the beans in here to cool.</li>
	<li>
		<strong>
			<a href="https://amzn.to/4jMBq2B" target="_blank" rel="noopener noreferrer"
				>A portable USB-recharge fan</a
			> from Amazon:
		</strong> For blowing air up through the bottom of the colander, and move the beans around until
		they're cool.
	</li>
	<li>
		<a href="https://amzn.to/4hKckj0" target="_blank" rel="noopener noreferrer"
			><strong>A cheap scale:</strong></a
		>
		for measuring the unroasted beans. I roast about 220g at a time.
	</li>
	<li>
		<strong>
			<a href="https://amzn.to/4b3Z8DT" target="_blank" rel="noopener noreferrer">A cheap timer:</a>
		</strong> many roasters have built-in timers, but I like my separate one (cost $5 I think)
	</li>
	<li>
		<strong>
			<a href="https://amzn.to/3WMWexo" target="_blank" rel="noopener noreferrer"
				>Airscape Canisters</a
			>:
		</strong> for storing roasted beans air-tight! These are ceramic, look nice, and are a joy to use.
	</li>
</ol>
<h2 id="where-to-buy">Where to buy green beans?</h2>

<ul>
	<li>
		<a
			href="https://www.sweetmarias.com/?srsltid=AfmBOoorsPooJNFiOH-9KO7P1kUJiC47NTqRHxwlJm_d75mjV36sznla"
			target="_blank"
			rel="noopener noreferrer"
		>
			<strong>Sweet Marias</strong>
		</a>: most well-known, but too pricey
	</li>
	<li>
		<a href="https://happymugcoffee.com/" target="_blank" rel="noopener noreferrer">
			<strong>Happy Mug</strong>
		</a>: Where PETE buys his beans!
	</li>
	<li>
		<a
			href="https://www.coffeebeancorral.com/?srsltid=AfmBOoql8BdgQvW2IgL6QedcwYUISUZXW3mAeAiP1CjYqwLRoAl8XswW"
			target="_blank"
			rel="noopener noreferrer"
		>
			<strong>Coffee Bean Corral</strong>
		</a>: Decent, especially since they run random sales every month.
	</li>
</ul>

<p><strong>Green coffee TIPS:</strong></p>

<ul>
	<li>
		Start with simple beans from countries you would associate with coffee (Colombia, Costa Rica,
		Kenya, etc) Aim for $5-8 per pound to start.
	</li>
	<li>
		Grab <strong>samplers</strong>!! Every company offers sample packs with 3-5 different beans
	</li>
	<li>
		Don't buy more than 3 pounds per bean until you find what you like, then order in 5, 10, or 20
		pound bags ;)
	</li>
</ul>

<h2 id="roasting-process">My exact step-by-step roasting process:</h2>
<ol>
	<li>Measure green beans (I roast 2 batches back-to-back of about 220g per batch)</li>
	<li>Go out to my shed</li>
	<li>
		(<em>Optional</em>) If it's below freezing (32F, 0C), I'll turn on my roaster for 2-3 mins,
		warming it up ❄️
	</li>
	<li>Put 1st batch of 220g of beans into the roaster</li>
	<li>Turn roaster on (at a high fan speed, because green beans are heavier)</li>
	<li>
		Roast for 7-10 minutes, decreasing fan speed once a minute-ish (which gradually increases
		temperature! <strong>See below</strong>)
	</li>
	<li>Listen for "first crack" 🔈</li>
	<li>
		Once beans are cracking a lot (usually about 30-60 seconds after "first crack"), I'll remove the
		beans
	</li>
	<li>
		(Optional) This is a lighter roast! For medium, I'll roast for another 30-60 seconds. If I liked
		a darker roast (I don't), I'd do ANOTHER 1-2 mins to 'second crack' and beyond.
	</li>
	<li>
		Dump the roasted beans in my metal colander, and hold it above the portable fan (the air blows
		through, cooling the beans!)
	</li>
	<li>Roast the 2nd batch</li>
	<li>
		Combine the 2 batches into 1 colander, and remove any individual beans that didn't get roasted
		>(there are always 5-10 single beans that just didn't get roasted for some reason. I toss 'em on
		the ground)
	</li>
	<li>Store the beans</li>
	<li>Wait at least 24 hours, preferably 3 days, before grinding and drinking ☕</li>
</ol>

<h3>Quick note on roast temperatures:</h3>

<p>
	Some beginners might just choose a temperature setting—turn their roaster on—and wait until "first
	crack."
</p>

<p>But even cheaper roasters have built-in controls for heat and/or fan settings!</p>

<p><strong>Here are my time-vs-temperature targets:</strong></p>

<ul>
	<li>1 minute into roast = usually 330F</li>
	<li>2 mins = 370F-ish</li>
	<li>4 mins = 400F-ish</li>
	<li>6 mins = 420F-ish</li>
	<li>7-8 mins = 440F - 450F</li>
</ul>

<p>
	These aren't rules; they're general guidelines. I've found that being a little slower, faster,
	hotter, or cooler—doesn't affect the output as much as I thought it would.
</p>
<h2 id="get-started">How to get started:</h2>

<ol>
	<li>
		Decide if this is worth it (you'll spend $400 immediately and 30 minutes a week, not including
		1-2 hours of researching your specific roaster!)
	</li>
	<li>
		Order a roaster.
		<a href="https://amzn.to/42JmWdV" target="_blank" rel="noopener noreferrer">The bundle </a>
		has everything you need and has a 10% coupon right now! $300 is a STEAL.
	</li>
	<li>Purchase a kitchen scale and/or colanders if you don't have them already</li>
	<li>Order green beans</li>
	<li>
		Roast your first batch
		<em
			>(and get ready to be disgusted and possibly throw them away. The first batch is always the
			hardest!!)</em
		>
	</li>
</ol>

<p>
	<img alt="coffee storage containers" src={canisters} style="width: 433px; height: 244px;" />
</p>

<h2 id="coffee-facts">Did you know...(coffee facts)</h2>

<h3>Coffee beans lose weight as they're roasted!</h3>

<p>
	Beans can lose 15-20% of their total weight (expelling CO2 and shedding their skin (aka chaff)
	during roasting)!
</p>

<h3>Darker roasts do NOT have more caffeine?</h3>

<p>Well, sorta.</p>

<p>
	<strong>If you measure by volume (i.e. a tablespoon)</strong> = light and dark roasts have EXACTLY
	the same amount of caffeine. In other words, the roasting process doesn't affect caffeine levels.
</p>

<p>But wait!! Coffee beans lose weight, right??</p>

<p>
	<strong>If you measure by weight (i.e. 15 grams)</strong> = it takes MORE darker beans (cuz they're
	lighter!) to make the weight, so it'll have more caffeine!
</p>

<h3>Preferring darker coffee doesn't make you 'tougher'?</h3>

<p>
	Lighter roasts don't have "less" of anything. Darker roasts aren't "stronger." (It's not like
	light beer haha).
</p>

<p>
	In fact, light roast coffee generally has more "coffee flavor," while darker roasts have more
	"roast flavor."
</p>

<h3>What is "first crack?!"</h3>

<p>
	When the first bean cracks open--it produces an audible "snap." After a few seconds, you'll likely
	hear other beans start to crack! If you were to keep roasting, you'd get a softer "2nd crack"
	after 2-3 more mins. This is a darker roast.
</p>

<p>That's all I got!</p>
