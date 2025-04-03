<script>
	import { enhance } from '$app/forms';
	/** @type {{ data: import('./$types').PageData, form: { error?: string; success?: string; message?: string } }} */
	let { data } = $props();

	let title = $state(data.post?.title || data.form?.title || '');
	let body = $state(data.post?.body || data.form?.body || '');
	let slug = $state(data.post?.slug || data.form?.slug || '');
	let category = $state(data.post?.category || data.form?.category || '');
	let status = $state(data.post?.status || 'draft');
	let postId = $state(data.post?.id || '');
	let featuredImage = $state(data.post?.featuredImage || '');
	let imageFile = $state(null);
	let imagePreview = $state('');
	let submitting = $state(false);
	let message = $state('');
	let messageType = $state('');
	let lastSaved = $state(null);

	// Format slug for preview (spaces for display, hyphens for ID)
	function formatSlugForPreview(slug) {
		return slug.replace(/-/g, ' ');
	}

	function formatSlugForId(slug) {
		return slug
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');
	}

	// Get the preview text for the slug field
	function getSlugPreview() {
		if (slug) {
			return formatSlugForId(slug);
		} else if (title) {
			return formatSlugForId(title);
		}
		return '';
	}

	// Handle image file selection
	function handleImageChange(event) {
		const file = event.target.files[0];
		if (file) {
			imageFile = file;
			// Create a preview URL
			imagePreview = URL.createObjectURL(file);
		}
	}

	// Auto-save draft every 30 seconds if there are changes
	// let autoSaveInterval;
	// $effect(() => {
	// 	if (title || body || slug || category) {
	// 		autoSaveInterval = setInterval(saveDraft, 30000);
	// 	}
	// 	return () => clearInterval(autoSaveInterval);
	// });

	async function saveDraft() {
		const formData = new FormData();
		formData.set('title', title);
		formData.set('body', body);
		formData.set('slug', slug);
		formData.set('category', category);
		formData.set('status', 'draft');
		if (postId) formData.set('id', postId);
		if (imageFile) formData.set('featuredImage', imageFile);

		try {
			const response = await fetch('?/saveDraft', {
				method: 'POST',
				body: formData
			});
			const result = await response.json();

			if (result.success) {
				lastSaved = new Date();
				message = 'Draft saved';
				messageType = 'success';
				if (!postId) postId = result.id;
				if (result.featuredImage) featuredImage = result.featuredImage;
				setTimeout(() => {
					message = '';
				}, 3000);
			}
		} catch (error) {
			console.error('Error saving draft:', error);
		}
	}

	async function handleSubmit({ result }) {
		submitting = true;
		message = '';
		messageType = '';

		if (result.type === 'success') {
			message = result.data.message;
			messageType = 'success';
			if (!postId) postId = result.data.id;
			if (result.data.featuredImage) featuredImage = result.data.featuredImage;
		} else if (result.type === 'failure') {
			message = result.data.error;
			messageType = 'error';
		}

		submitting = false;
	}

	function handlePublish() {
		status = 'published';
	}
</script>

<div class="container mx-auto p-4">
	<div class="flex flex-col lg:flex-row gap-8">
		<!-- Editor Panel -->
		<div class="flex-1">
			<div class="flex items-center justify-between mb-8">
				<h1 class="text-4xl font-bold">
					{title || 'Untitled Post'}
				</h1>
				<div class="flex items-center gap-4">
					{#if lastSaved}
						<span class="text-sm text-gray-500">
							Last saved: {lastSaved.toLocaleTimeString()}
						</span>
					{/if}
					{#if postId}
						<a href="/admin/posts" class="btn btn-ghost btn-sm"> ← Back to Posts </a>
					{/if}
				</div>
			</div>

			{#if message}
				<div class="alert {messageType === 'error' ? 'alert-error' : 'alert-success'} mb-6">
					<span>{message}</span>
				</div>
			{/if}

			<form
				method="POST"
				action="?/save"
				use:enhance={handleSubmit}
				class="space-y-6"
				id="post-form"
			>
				<input type="hidden" name="id" value={postId} />
				<input type="hidden" name="status" value={status} />

				<div class="form-control">
					<input
						type="text"
						id="title"
						name="title"
						bind:value={title}
						class="input input-bordered input-lg w-full text-3xl"
						placeholder="Post Title"
						required
					/>
				</div>

				<div class="form-control">
					<div class="flex gap-4">
						<div class="flex-1">
							<input
								type="text"
								id="slug"
								name="slug"
								bind:value={slug}
								class="input input-bordered w-full"
								placeholder="url-friendly-slug"
								required
							/>
							{#if getSlugPreview()}
								<div class="text-sm text-gray-500 mt-1">
									{getSlugPreview()}
								</div>
							{/if}
						</div>
						<select
							id="category"
							name="category"
							bind:value={category}
							class="select select-bordered w-48"
							required
						>
							<option value="">Select Category</option>
							<!-- Categories will be populated later -->
						</select>
					</div>
				</div>

				<div class="form-control">
					<textarea
						id="body"
						name="body"
						bind:value={body}
						class="textarea textarea-bordered min-h-[500px] font-mono"
						placeholder="Write your post content here..."
						required
					></textarea>
				</div>
			</form>
		</div>

		<!-- Actions Panel -->
		<div class="w-80 lg:border-l lg:pl-8">
			<div class="sticky top-4 space-y-6">
				<div class="card bg-base-200">
					<div class="card-body">
						<h2 class="card-title">Post Actions</h2>
						<div class="space-y-4">
							<button
								type="button"
								class="btn btn-outline w-full"
								onclick={saveDraft}
								disabled={submitting}
							>
								Save Draft
							</button>

							<button
								type="submit"
								form="post-form"
								class="btn btn-primary w-full"
								disabled={submitting}
								onclick={handlePublish}
							>
								{#if submitting}
									<span class="loading loading-spinner"></span>
									Publishing...
								{:else}
									Publish
								{/if}
							</button>
						</div>
					</div>
				</div>

				<div class="card bg-base-200">
					<div class="card-body">
						<h2 class="card-title">Post Settings</h2>
						<div class="space-y-4">
							<div class="form-control">
								<label class="label">
									<span class="label-text">Status</span>
								</label>
								<select class="select select-bordered w-full" bind:value={status}>
									<option value="draft">Draft</option>
									<option value="published">Published</option>
								</select>
							</div>

							<div class="form-control">
								<label class="label">
									<span class="label-text">Category</span>
								</label>
								<select class="select select-bordered w-full" bind:value={category}>
									<option value="">Select Category</option>
									<!-- Categories will be populated later -->
								</select>
							</div>
						</div>
					</div>
				</div>

				<!-- Featured Image Card -->
				<div class="card bg-base-200">
					<div class="card-body">
						<h2 class="card-title">Featured Image</h2>
						<div class="space-y-4">
							<div class="form-control">
								<label class="label">
									<span class="label-text">Upload Image</span>
								</label>
								<input
									type="file"
									accept="image/*"
									class="file-input file-input-bordered w-full"
									onchange={handleImageChange}
									name="featuredImage"
								/>
							</div>

							{#if imagePreview || featuredImage}
								<div class="mt-2">
									<img
										src={imagePreview || featuredImage}
										alt="Featured image preview"
										class="w-full h-40 object-cover rounded-md"
									/>
								</div>
							{/if}
						</div>
					</div>
				</div>

				{#if postId}
					<div class="card bg-base-200">
						<div class="card-body">
							<h2 class="card-title">Post Info</h2>
							<div class="space-y-2 text-sm">
								<p><span class="font-semibold">ID:</span> {postId}</p>
								{#if lastSaved}
									<p>
										<span class="font-semibold">Last Saved:</span>
										{lastSaved.toLocaleTimeString()}
									</p>
								{/if}
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
