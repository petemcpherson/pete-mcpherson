<script>
	import pete_is_cool from '$lib/assets/images/pete_is_cool.jpeg';
</script>

<div>
	<!-- hero section -->
	<!-- <div class="hero min-h-screen bg-base-200">
		<div class="hero-content flex-col lg:flex-row-reverse">
			<img src={pete_is_cool} alt="pete" class="max-w-sm rounded-lg shadow-2xl" />
			<div>
				<h1 class="lg:text-7xl font-bold">Welcome to Pete's blank starter website template!</h1>
				<p class="py-6">Duplicate, customize, then deploy. Host this website for free forever.</p>
				<button class="btn btn-primary">Get Started</button>
			</div>
		</div>
	</div> -->

	<!-- mine -->
	<div class="m-5 lg:m-7 items-start space-y-4 lg:w-5/6 lg:mx-auto lg:flex lg:gap-4">
		<div class="lg:self-center w-full">
			<h1 class="text-3xl lg:text-7xl font-bold">
				Welcome to Pete's blank starter website template!
			</h1>
			<p class="py-6">Duplicate, customize, then deploy. Host this website for free forever.</p>
			<button class="btn btn-primary">Get Started</button>
		</div>
		<div>
			<img src={pete_is_cool} alt="pete" class="w-full rounded-lg shadow-2xl" />
		</div>
	</div>
</div>
