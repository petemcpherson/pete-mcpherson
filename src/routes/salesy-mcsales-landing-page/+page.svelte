<script>
	/** @type {import('./$types').PageData} */
	import pete_drinks_espresso from '$lib/assets/images/pete_drinks_espresso.jpeg';
	import Head from '$lib/components/Head.svelte';

	let email = $state('');

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
</script>

<Head title="Landing Page Template" />

<!-- header -->
<div class="px-4 lg:px-48 py-6 lg:py-20 text-center m-4">
	<h1 class="mb-4 md:mb-8 font-black text-3xl lg:text-5xl">Finally, some sweet benefit</h1>
	<p class="mb-4 md:mb-8 font-black text-2xl lg:text-3xl">
		So you'll never have to have problems again.
	</p>

	<h2 class="mb-4 md:mb-8 text-lg text-primary italic">
		Honestly, This might be the most important purchasing decision of your entire life. Ever.
		Seriously though.
	</h2>
	<!-- video -->
	<div>
		<div style="position: relative; padding-bottom: 64.98194945848375%; height: 0;">
			<iframe
				src="https://www.loom.com/embed/2cf5529de331410ba893787821b2a1e7?sid=9e527282-4201-40ed-bc31-1ba89c0148b5"
				frameborder="0"
				title="Demo vid"
				webkitallowfullscreen
				mozallowfullscreen
				allowfullscreen
				style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
			></iframe>
		</div>
	</div>
	<div class="flex justify-center">
		<a href="/" class="my-4 md:my-8 btn btn-lg btn-secondary">BUY NOW</a>
	</div>
</div>

<!-- pain points -->

<div class="bg-gradient-to-br from-neutral to-neutral-700 py-8 lg:py-24 text-neutral-content">
	<div class="md:w-1/2 mx-2 md:mx-auto leading-loose">
		<h1 class="my-10 font-black text-3xl lg:text-7xl text-center">Ugh, pain point.</h1>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 md:p-6">
			<div>
				<img src="https://via.placeholder.com/400x300" alt="Placeholder" class="w-full mb-4" />
				<p>
					Pain point 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nulla
					sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.
				</p>
			</div>
			<div>
				<img src="https://via.placeholder.com/400x300" alt="Placeholder" class="w-full mb-4" />
				<p>
					Pain point 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nulla
					sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.
				</p>
			</div>
			<div>
				<img src="https://via.placeholder.com/400x300" alt="Placeholder" class="w-full mb-4" />
				<p>
					Pain point 3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nulla
					sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.
				</p>
			</div>
		</div>
		<div class="p-3 md:p-6 prose text-neutral-content text-lg">
			<p>But seriously, more copy.</p>
			<p>
				After all, why say few and simple words when you can write more words to make more money?
			</p>
			<p>
				Because money is, after all, why we are all here. Come to think of it, I should probably
				start charging money for this template.
			</p>
		</div>
	</div>
</div>

<!-- bio section -->

<div class="py-8 lg:py-24">
	<div class="m-5 lg:m-7 items-start space-y-4 lg:w-5/6 lg:mx-auto lg:flex lg:gap-8 lg:py-8">
		<div>
			<img src={pete_drinks_espresso} alt="pete" class="w-full rounded-lg shadow-2xl" />
		</div>
		<div class="lg:self-center w-full">
			<h1 class="text-3xl lg:text-7xl font-black mb-3">Hi, I'm a bio section 👋️</h1>
			<p class="mb-3">
				My name is Pete, and hot damn I'm awesome. You should hire me. Pay me money for things.
			</p>
			<p class="mb-3">Follow me on OnlyDads. Subscribe to my newsletter, twice.</p>
			<a href="/" class="btn btn-primary">Learn more</a>
		</div>
	</div>
</div>

<!-- testimonials -->
<div class="py-8 lg:py-24">
	<h2 class="my-10 text-center font-black text-3xl lg:text-7xl">Testimonials</h2>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 lg:mx-20">
		<div>
			<div class="avatar flex justify-center mb-3">
				<div class="w-24 rounded-full">
					<img
						alt="something"
						src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
					/>
				</div>
			</div>
			<p class="italic text-center mb-2">
				"This product changed my life! I can't imagine living without it now."
			</p>
			<p class="text-center">- John Doe</p>
		</div>
		<div>
			<div class="avatar flex justify-center mb-3">
				<div class="w-24 rounded-full">
					<img
						alt="something"
						src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
					/>
				</div>
			</div>
			<p class="italic text-center mb-2">
				"I was skeptical at first, but after using this product for a week, I was hooked. It's
				amazing!"
			</p>
			<p class="text-center">- Jane Smith</p>
		</div>
		<div>
			<div class="avatar flex justify-center mb-3">
				<div class="w-24 rounded-full">
					<img
						alt="something"
						src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
					/>
				</div>
			</div>

			<p class="italic text-center mb-2">
				"I've tried many similar products, but this one is by far the best. Highly recommended!"
			</p>
			<p class="text-center">- Mike Johnson</p>
		</div>
	</div>
	<div class="p-8 md:p-20">
		<div class="mb-3 flex justify-center avatar-group -space-x-6 rtl:space-x-reverse">
			<div class="avatar">
				<div class="w-12">
					<img
						alt="something"
						src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
					/>
				</div>
			</div>
			<div class="avatar">
				<div class="w-12">
					<img
						alt="something"
						src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
					/>
				</div>
			</div>
			<div class="avatar">
				<div class="w-12">
					<img
						alt="something"
						src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
					/>
				</div>
			</div>
			<div class="avatar">
				<div class="w-12">
					<img
						alt="something"
						src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
					/>
				</div>
			</div>
		</div>
		<p class="text-center">Over a million people love this friggin product.</p>
	</div>
	<div class="flex justify-center">
		<a href="/" class="my-4 md:my-8 btn btn-lg btn-secondary">BUY NOW</a>
	</div>
</div>

<!-- faqs -->

<div class="py-8 lg:py-24">
	<div class="md:w-1/2 mx-2 md:mx-auto leading-loose">
		<h1 class="my-10 font-black text-3xl lg:text-7xl text-center">FAQS</h1>

		<div class="collapse collapse-arrow bg-base-200">
			<input type="radio" name="my-accordion-2" checked="checked" />
			<div class="collapse-title text-xl font-medium">Click to open this one and close others</div>
			<div class="collapse-content">
				<p>hello</p>
			</div>
		</div>
		<div class="collapse collapse-arrow bg-base-200">
			<input type="radio" name="my-accordion-2" />
			<div class="collapse-title text-xl font-medium">Click to open this one and close others</div>
			<div class="collapse-content">
				<p>hello</p>
			</div>
		</div>
		<div class="collapse collapse-arrow bg-base-200">
			<input type="radio" name="my-accordion-2" />
			<div class="collapse-title text-xl font-medium">Click to open this one and close others</div>
			<div class="collapse-content">
				<p>hello</p>
			</div>
		</div>
	</div>
</div>

<!-- divider -->
<div class="flex flex-col w-full">
	<div class="divider">Default Divider</div>
	<div class="divider divider-neutral">Neutral Divider</div>
	<div class="divider divider-primary">Primary Divider</div>
	<div class="divider divider-secondary">Secondary Divider</div>
	<!-- <div class="divider divider-accent">Accent</div> -->
	<!-- <div class="divider divider-success">Success</div>
	<div class="divider divider-warning">Warning</div>
	<div class="divider divider-info">Info</div>
	<div class="divider divider-error">Error</div> -->
</div>

<!-- text -->

<div class="py-4 lg:py-12">
	<div class="mx-5 md:w-1/2 md:mx-auto prose">
		<p>
			This is could be some amazing content! We're going to start with talking about ourselves, and
			then maybe add some more copywriting relating to our services, projects, etc.
		</p>

		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Imperdiet sed euismod nisi porta lorem mollis aliquam ut
			porttitor. Purus in massa tempor nec feugiat nisl. Metus aliquam eleifend mi in nulla posuere
			sollicitudin aliquam. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque.
			Pharetra magna ac placerat vestibulum lectus mauris.
		</p>
		<ol>
			<li>asdf asdf asdf asdf asdf asdf</li>
			<li>asdf asdf asdf asdf asdf asdf</li>
			<li>asdf asdf asdf asdf asdf asdf</li>
		</ol>
		<p>
			Tempor commodo ullamcorper a lacus vestibulum sed arcu non odio. Pretium nibh ipsum consequat
			nisl vel pretium. Sapien pellentesque habitant morbi tristique senectus et netus. Facilisis
			sed odio morbi quis commodo odio aenean sed adipiscing. Nulla porttitor massa id neque
			aliquam. Sapien faucibus et molestie ac. <a href="/" class="link">I'm a link, beotch.</a>
			Leo in vitae turpis massa. Mattis vulputate enim nulla aliquet porttitor lacus. Mattis molestie
			a iaculis at erat pellentesque adipiscing commodo elit. Eget velit aliquet sagittis id consectetur.
			Lectus proin nibh nisl condimentum id venenatis a condimentum vitae. Viverra orci sagittis eu volutpat.
			Sagittis orci a scelerisque purus semper eget duis at.
		</p>
		<p>
			Ac placerat vestibulum lectus mauris ultrices eros. Massa tincidunt nunc pulvinar sapien et
			ligula ullamcorper malesuada proin. Morbi enim nunc faucibus a pellentesque sit. Gravida
			rutrum quisque non tellus orci ac.
		</p>
		<h2>Oh look, a subheader!</h2>
		<p>
			Morbi enim nunc faucibus a pellentesque sit amet porttitor eget. Cursus turpis massa tincidunt
			dui. Mus mauris vitae ultricies leo integer. Ipsum nunc aliquet bibendum enim facilisis
			gravida. Pharetra diam sit amet nisl suscipit. Ornare massa eget egestas purus. Faucibus et
			molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Sit amet luctus venenatis lectus
			magna fringilla urna. Mattis pellentesque id nibh tortor id aliquet lectus. A cras semper
			auctor neque vitae tempus quam pellentesque. Lorem sed risus ultricies tristique nulla aliquet
			enim. Feugiat in ante metus dictum.
		</p>
		<img
			src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
			alt="dogs"
		/>
		<p>
			Pretium lectus quam id leo in vitae turpis massa sed. Nullam non nisi est sit amet facilisis
			magna etiam tempor. Neque ornare aenean euismod elementum nisi. Natoque penatibus et magnis
			dis parturient montes nascetur ridiculus mus. Eget duis at tellus at urna condimentum. Vitae
			elementum curabitur vitae nunc sed. Eget mi proin sed libero. Scelerisque viverra mauris in
			aliquam. Massa vitae tortor condimentum lacinia quis vel eros donec. Vitae tempus quam
			pellentesque nec nam aliquam sem et tortor. Nunc lobortis mattis aliquam faucibus. Tellus
			elementum sagittis vitae et leo duis ut diam quam. Suspendisse faucibus interdum posuere lorem
			ipsum dolor. Sociis natoque penatibus et magnis dis parturient. Quis viverra nibh cras
			pulvinar mattis nunc. Sit amet est placerat in egestas erat imperdiet. Donec et odio
			pellentesque diam volutpat. Tellus id interdum velit laoreet id donec ultrices tincidunt. Mi
			ipsum faucibus vitae aliquet nec. Convallis posuere morbi leo urna molestie at elementum eu
			facilisis.
		</p>
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
				<button type="submit" class="btn btn-secondary md:flex-initial" onclick={handleSubmit}>
					Sign me up!
				</button>
			</div>
		</form>
		<div class="flex justify-center">
			<a href="/" class="my-4 md:my-8 btn btn-lg btn-secondary">BUY NOW WITH A BUTTON</a>
		</div>
	</div>
</div>
