<script>
	import Head from '$lib/components/Head.svelte';
	export let data;

	const post = data.post;
	const title = post.title;
	const description = post.description;
</script>

<Head {title} {description} />

<p>Passwords are terrible...and 2-factor auth is somehow WORSE.</p>
<p>
	If you've ever seen a website offer to let you use a "passkey" to log in instead of a
	password...and wondered, <em class="italic">"the heck..."</em>
</p>
<p>This is for you.</p>

<div class="sticky-note font-black text-center p-6 rounded-lg my-8">
	<h2 class="text-2xl text-primary mb-4">STICKY NOTE - Passkeys 👇</h2>
	<img
		src="https://doyouevenblog.com/sendy/uploads/1728330529.jpg"
		alt="Passkeys Sticky Note"
		class="w-full max-w-md mx-auto rounded-lg shadow-lg"
	/>

	<p class="mt-4">
		<a
			href="https://drive.google.com/file/d/1C2nUMrWkbyAdLzSl8e46C8Pbgyawd57r/view?usp=sharing"
			class="text-primary underline"
			target="_blank"
			rel="noopener noreferrer"
		>
			Here's a link to the hi-res Sticky Note image
		</a>
	</p>
</div>

<hr class="my-8" />

<h2>What exactly is a passkey?</h2>
<ul class="list-disc pl-6 space-y-2">
	<li>🔑 Passkeys are a new, safer way to log in to websites and apps.</li>
	<li>🚫 You don't need a password...OR 2FA</li>
	<li>
		💻 Your DEVICE logs you in. It holds a "private key" <em
			>(super random string of numbers, letters, etc)</em
		> that stays local and a "public key" stored on the website.
	</li>
	<li>☹️ Still, few companies support passkeys boooooooo</li>
</ul>

<h2>How they work:</h2>

<h3>1 - The Setup</h3>
<p>
	<span class="text-red-600 font-bold italic">"I HATE PASSWORDS & STUPID 2FA TEXT MESSAGES,"</span> you
	say.
</p>
<p class="mb-2 italic">"I got you, fam. Here's a passkey."</p>
<p>You enable passkeys.</p>
<p>A "private key" is stored on your local device, and the website keeps a "public key."</p>

<div class="sticky-note text-black font-black p-4 rounded-lg my-4">
	<p>
		<b>Private key 👉 </b>Never leaves your device, and is therefore protected by face ID,
		fingerprint, a PIN, etc.
	</p>
</div>

<h3 class="text-2xl font-semibold mt-6 mb-3">2 - The Request</h3>
<p class=" italic">"I WANNA LOG IN,"</p>
<p class=" italic">"PROVE YOU'RE YOU,"</p>
<p>The website server sends a "challenge" to your device.</p>

<h3 class="text-2xl font-semibold mt-6 mb-3">3 - The Authentication</h3>
<p class=" italic">"CHALLENGE ACCEPTED."</p>
<p>...but then it whispers to you...</p>
<p class=" italic">
	"psst! hey! Can you gimme Face ID really quick? Just need to make sure it's actually you--and not
	somebody that stole your laptop--like your 7yr-old..."
</p>
<p>You unlock with Face ID.</p>
<p>
	Your device uses the private key to "sign" the challenge--and sends the challenge back to the
	server.
</p>
<p class=" italic">"BOOMSHAKALAKA,"</p>

<h3 class="text-2xl font-semibold mt-6 mb-3">4 - The Magic</h3>
<p class=" italic">"Welcome back, King. Never doubted you for a moment,"</p>
<p class=" text-sm italic">"until next time..."</p>
<p>The server verifies you without ever seeing your private key.</p>
<p>Done.</p>

<h2 class="text-3xl font-bold mt-8 mb-4">⚾ A CURVEBALL - Password Managers</h2>
<p>Some password managers store private keys.</p>
<p>
	You'll still AUTHENTICATE on your DEVICE (Face ID, PIN, etc)--but your private key is available
	across all devices with the password manager.
</p>
<p>
	<strong>NOTE</strong>: Lastpass does NOT support passkeys yet, because they're lame.
</p>
<p>
	Use <a
		href="https://bitwarden.com/"
		class="text-primary underline"
		target="_blank"
		rel="noopener noreferrer">Bitwarden</a
	>
	(what I recommend),
	<a
		href="https://www.dashlane.com/"
		class="text-primary underline"
		target="_blank"
		rel="noopener noreferrer">Dashlane</a
	>, or
	<a
		href="https://1password.com/"
		class="text-primary underline"
		target="_blank"
		rel="noopener noreferrer">1password</a
	>.
</p>

<h2 class="text-3xl font-bold mt-8 mb-4">Why are passkeys better?</h2>
<ul class="list-disc pl-6 space-y-2">
	<li>
		<strong>Easier:</strong> No need to remember complex passwords, and you don't need 2FA(!)
	</li>
	<li>
		<strong>Safer:</strong> Phishing & hacking resistant. Can't steal em. Secured by your local device!
	</li>
	<li><strong>Faster:</strong> Logging in is EZ-PZ.</li>
</ul>

<h2 class="text-3xl font-bold mt-8 mb-4">One downside...</h2>
<p>
	Only a handful of apps and websites support them, and switching to passkeys can be a bit tricky.
</p>

<h2>Which websites have passkey support?</h2>
<p>Here's a handy-dandy resource that lists them all!</p>
<p>
	<a href="https://passkeys.directory/" target="_blank" class="text-primary underline"
		>https://passkeys.directory/</a
	>
</p>
<p>Big ones include...</p>
<ul class="list-disc pl-6 space-y-2 columns-2 sm:columns-3">
	<li>Amazon</li>
	<li>Apple</li>
	<li>Bitwarden</li>
	<li>Coinbase</li>
	<li>Discord</li>
	<li>Ebay</li>
	<li>GitHub</li>
	<li>Google</li>
	<li>Link</li>
	<li>LinkedIn</li>
	<li>Microsoft / Live</li>
	<li>OnlyFans (lol)</li>
	<li>PayPal</li>
	<li>Robinhood</li>
	<li>Shop</li>
	<li>Snapchat</li>
	<li>Stripe</li>
	<li>TikTok</li>
	<li>Twitter</li>
	<li>Uber</li>
	<li>WhatsApp</li>
	<li>Yahoo</li>
</ul>

<hr class="my-8" />
<p>So there it is, folks!</p>
<p>Hope you learned something today ;)</p>
<p>Love you, and thanks for sticking around on my email list.</p>
