<script>
	import Head from '$lib/components/Head.svelte';
	import pete_avatar from '$lib/assets/images/pete_avatar.png';
	import sixfecta from '$lib/assets/images/sixfecta.png';

	let email = $state('');
	let isSubmitting = $state(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		isSubmitting = true;

		let res;
		try {
			res = await fetch('https://sendy-optin.pete-85b.workers.dev/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, listId: 'raWezrknWwJ0hABpkZBj9w' })
			});
		} catch (e) {
			console.error('Opt-in request failed', e);
			alert('Failed to submit email. Please try again.');
			isSubmitting = false;
			return;
		}

		if (res.ok) {
			alert(
				"You're in! Check your email for the Sixfecta Google Doc, walkthrough video, and AI prompts."
			);
			email = '';
		} else {
			// Try to display a useful error message regardless of whether the worker returns JSON or text.
			const bodyText = await res.text().catch(() => '');
			let message = 'Failed to submit email. Please try again.';
			try {
				const parsed = JSON.parse(bodyText);
				message = parsed?.message || message;
			} catch {
				message = bodyText || message;
			}
			console.error('Failed to submit email', { status: res.status, body: bodyText });
			alert(message);
		}

		isSubmitting = false;
	};
</script>

<Head title="Sixfecta - Decide What to Focus On (Free)" />

<div class="min-h-screen bg-base-100">
	<!-- Two Column Layout -->
	<div class="container mx-auto px-4 lg:px-8 py-12 lg:py-24">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
			<!-- LEFT COLUMN: Header + Image -->
			<div class="space-y-8">
				<div>
					<h1 class="text-5xl lg:text-7xl font-black mb-4 leading-tight">
						What should you focus on<br />
						<span class="text-primary">right now?</span>
					</h1>
					<!-- <p class="text-2xl lg:text-3xl font-black tracking-tight">
						Six criteria. <span class="text-primary">One clear answer.</span>
					</p> -->
					<p class="text-xl lg:text-2xl text-base-content/70 font-medium">
						A free Google Doc + short walkthrough video + my exact AI prompts to decide what to
						focus on right now.
					</p>
				</div>

				<div class="pt-4">
					<img src={sixfecta} alt="Sixfecta Template Spreadsheet" class="shadow-2xl" />
				</div>
			</div>

			<!-- RIGHT COLUMN: Copywriting + Form -->
			<div class="space-y-8">
				<div class="space-y-6">
					<div class="space-y-3">
						<h2 class="text-3xl lg:text-4xl font-black leading-tight">
							Too many ideas? Pick the <span class="text-primary">right</span> one.
						</h2>
						<p class="text-lg text-base-content/70">
							If you’re bouncing between projects, strategies, and “maybe I should…” ideas, you
							don’t need more motivation — you need a decision you trust.
						</p>
					</div>

					<div>
						<h3 class="text-2xl lg:text-3xl font-black mb-3">Use it for</h3>
						<ul class="space-y-3 text-lg">
							<li class="flex items-start">
								<span class="text-primary mr-2">•</span>
								<span><strong>Next project</strong> (product, content, offer, build)</span>
							</li>
							<li class="flex items-start">
								<span class="text-primary mr-2">•</span>
								<span><strong>Next strategy</strong> (pricing, growth, audience, positioning)</span>
							</li>
							<li class="flex items-start">
								<span class="text-primary mr-2">•</span>
								<span><strong>Next idea</strong> (which rabbit hole is worth it?)</span>
							</li>
						</ul>
					</div>

					<!-- <div>
						<h3 class="text-2xl lg:text-3xl font-black mb-3">How it works</h3>
						<ol class="space-y-3 text-lg list-decimal list-inside">
							<li>List what you’re considering (anything).</li>
							<li>Score each idea on 6 criteria (time, cost, alignment, and more).</li>
							<li>Set weights based on what matters most <em>right now</em>.</li>
							<li>Get a clear winner — then run my AI prompts for quick insights + tradeoffs.</li>
						</ol>
					</div> -->

					<div class="bg-primary/10 p-6 rounded-lg border-2 border-primary/20">
						<p class="text-lg font-semibold mb-2">What you get (free):</p>
						<ul class="space-y-2 text-base">
							<li>✓ <strong>Sixfecta Google Doc</strong> (copy it, edit it, keep it)</li>
							<li>✓ <strong>Short explainer video</strong> (step-by-step walkthrough)</li>
							<li>✓ <strong>My exact AI prompts</strong> (analysis, insights, next steps)</li>
							<li>✓ <strong>Clarity in 10 minutes</strong> (stop second-guessing)</li>
						</ul>
					</div>
				</div>

				<!-- Email Form -->
				<div class="bg-base-200 p-8 rounded-lg shadow-lg">
					<h3 class="text-2xl lg:text-3xl font-black mb-4">Get Sixfecta (Free)</h3>
					<p class="text-base-content/70 mb-6">
						Drop your email and I’ll send you the Google Doc + walkthrough video + my AI prompts so
						you can decide what to focus on this week.
					</p>

					<form onsubmit={handleSubmit} class="space-y-4">
						<div>
							<input
								type="email"
								bind:value={email}
								placeholder="Email address"
								class="input input-bordered w-full text-lg py-3"
								required
								disabled={isSubmitting}
							/>
						</div>
						<button
							type="submit"
							class="btn btn-primary btn-lg w-full text-lg font-bold"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Sending...' : 'Send me the Doc + prompts'}
						</button>
					</form>

					<p class="text-sm text-base-content/60 mt-4 text-center">
						100% free. No spam. Unsubscribe anytime.
					</p>
				</div>

				<!-- Founder Note -->
				<div class="text-sm text-base-content/60 italic">
					<p>
						<strong class="not-italic">Pete "Shiny Object" McPherson:</strong> I run 4 businesses and
						love starting things—but that often leads to overwhelm. Every few months, I use Sixfecta
						to get clear on what to focus on right now—and what to ignore. It started as a simple spreadsheet
						I tweaked every time I used it. Now I'm sharing it with you.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
