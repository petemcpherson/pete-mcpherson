<script>
	/** @type {import('./$types').PageData} */
	// export let data;
	import Head from '$lib/components/Head.svelte';

	let email = '';

	const handleSubmit = () => {
		alert(
			'You submitted the email: ' +
				email +
				'. This could totally go to a Zapier webhook and to your ESP--or you could just drop an embedded form here.'
		);
	};

	const projects = [
		{
			title: 'Project 1',
			description:
				'This is a project that I have done. It was a great project that I have done. It was a great project that I have done. It was a great project that I have done.',
			image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
		},
		{
			title: 'Project 2',
			description:
				'This is a project that I have done. It was a great project that I have done. It was a great project that I have done. It was a great project that I have done.',
			image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
		},
		{
			title: 'Project 3',
			description:
				'This is a project that I have done. It was a great project that I have done. It was a great project that I have done. It was a great project that I have done.',
			image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
		},
		{
			title: 'Project 3',
			description:
				'This is a project that I have done. It was a great project that I have done. It was a great project that I have done. It was a great project that I have done.',
			image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
		},
		{
			title: 'Project 3',
			description:
				'This is a project that I have done. It was a great project that I have done. It was a great project that I have done. It was a great project that I have done.',
			image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
		},
		{
			title: 'Project 3',
			description:
				'This is a project that I have done. It was a great project that I have done. It was a great project that I have done. It was a great project that I have done.',
			image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
		}
	];
</script>

<Head title="Projects" />

<!-- header -->
<div class="px-8 lg:px-48 py-4 lg:py-20 text-center m-4">
	<h1 class="mb-4 md:mb-8 font-black text-3xl lg:text-7xl">Show off your projects/clients/jobs</h1>
	<p class="mb-4 md:mb-8 text-primary italic">Or use your imagination for what to do here.</p>
	<!-- page link buttons -->
	<div class="flex flex-col justify-center md:flex-row md:flex-wrap gap-2">
		<a href="/projects#category1" class="btn btn-primary md:flex-initial">Category 1</a>
		<a href="/projects#category2" class="btn btn-secondary md:flex-initial">Category 2</a>
		<a href="/projects#category3" class="btn btn-accent md:flex-initial">Category 3</a>
		<a href="/projects#category4" class="btn btn-outline md:flex-initial">Category 4</a>
		<a href="/projects#category5" class="btn btn-ghost md:flex-initial">Category 5</a>
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

<!-- category 1 -->
<div class="p-4 lg:py-12" id="category1">
	<h2 class="my-10 text-center font-black text-3xl lg:text-7xl">Category 1</h2>
	<p class="mb-4 md:mb-8 text-center italic">You could use image cards like this.</p>

	<div class="w-5/6 mx-auto flex flex-wrap gap-4">
		<div class="card w-96 bg-base-100 shadow-xl flex-auto">
			<figure>
				<img
					src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
					alt="Shoes"
				/>
			</figure>
			<div class="card-body">
				<h2 class="card-title">Shoes!</h2>
				<p>If a dog chews shoes whose shoes does he choose?</p>
				<div class="card-actions justify-end">
					<a href="/" class="btn btn-primary">Visit</a>
				</div>
			</div>
		</div>
		<div class="card w-96 bg-base-100 shadow-xl flex-auto">
			<figure>
				<img src="https://images.pexels.com/photos/4651259/pexels-photo-4651259.jpeg" alt="Shoes" />
			</figure>
			<div class="card-body">
				<h2 class="card-title">Raccoons!</h2>
				<p>Because who doesn't like racooons???</p>
				<div class="card-actions justify-end">
					<a href="/" class="btn btn-primary">Read More</a>
				</div>
			</div>
		</div>
		<div class="card w-96 bg-base-100 shadow-xl flex-auto">
			<figure>
				<img
					src="https://images.pexels.com/photos/17965550/pexels-photo-17965550/free-photo-of-adorable-kitten-on-tree.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
					alt="Shoes"
				/>
			</figure>
			<div class="card-body">
				<h2 class="card-title">Awwwwww!</h2>
				<p>I'm also awwwwwwwww!!</p>
				<div class="card-actions justify-end">
					<a href="/" class="link">This one's a link</a>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- category 2 -->
<div class="p-4 lg:py-12 bg-neutral-200" id="category2">
	<h2 class="my-10 text-center font-black text-3xl lg:text-7xl">Category 2</h2>
	<p class="mb-4 md:mb-8 text-center italic">Or maybe some that look like this.</p>

	<div class="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-4 gap-8 md:m-8">
		{#each projects as project}
			<div class="bg-base-100 rounded-lg p-4 md:p-12">
				<h2 class="text-xl font-black">{project.title}</h2>
				<p class="mb-1 md:mb-3">{project.description}</p>
				<img src={project.image} alt={project.title} class="w-full" />
			</div>
		{/each}
	</div>
</div>

<!-- text -->

<!-- <div class="py-4 lg:py-12">
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
</div> -->

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
					class="input input-bordered text-neutral md:flex-auto"
				/>
				<button type="submit" class="btn btn-secondary md:flex-initial" on:click={handleSubmit}>
					Sign me up!
				</button>
			</div>
		</form>
	</div>
</div>
