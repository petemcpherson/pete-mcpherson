<script>
	import { enhance } from '$app/forms';
	import Tiptap from '$lib/components/Tiptap.svelte';
	import TagSelector from '$lib/components/TagSelector.svelte';
	import CategorySelector from '$lib/components/CategorySelector.svelte';
	/** @type {{ data: import('./$types').PageData, form: { error?: string; success?: string; message?: string } }} */
	let { data } = $props();

	let title = $state(data.post?.title || data.form?.title || '');
	let body = $state(data.post?.body || data.form?.body || '');
	let slug = $state(data.post?.slug || data.form?.slug || '');
	let status = $state(data.post?.status || 'draft');
	let postId = $state(data.post?.id || '');
	let featuredImage = $state(data.post?.featuredImage || '');
	let description = $state(data.post?.description || data.form?.description || '');
	let created = $state(data.post?.created ? data.post.created.slice(0, 16) : '');
	let imageFile = $state(null);
	let imagePreview = $state('');
	let submitting = $state(false);
	let message = $state('');
	let messageType = $state('');
	let lastSaved = $state(null);
	let uploading = $state(false);
	let tags = $state(data.tags || []);
	let selectedTags = $state(data.post?.tags || []);
	let selectedCategoryId = $state(data.post?.categoryId || '');
	let initialTitle = $state(data.post?.title || data.form?.title || '');
	let initialBody = $state(data.post?.body || data.form?.body || '');
	let initialSlug = $state(data.post?.slug || data.form?.slug || '');
	let initialStatus = $state(data.post?.status || 'draft');
	let initialTags = $state(data.post?.tags || []);
	let initialCategoryId = $state(data.post?.categoryId || '');
	let initialDescription = $state(data.post?.description || data.form?.description || '');
	let initialCreated = $state(data.post?.created ? data.post.created.slice(0, 16) : '');

	// Replace the function and effect with a derived value
	let hasUnsavedChanges = $derived.by(() => {
		const isChanged =
			title !== initialTitle ||
			body !== initialBody ||
			slug !== initialSlug ||
			status !== initialStatus ||
			description !== initialDescription ||
			created !== initialCreated ||
			JSON.stringify(selectedTags) !== JSON.stringify(initialTags) ||
			selectedCategoryId !== initialCategoryId ||
			imageFile !== null;

		return isChanged;
	});

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

	// Handle tag selection updates
	function handleTagUpdate(event) {
		selectedTags = event.detail.selectedTags;
	}

	async function saveDraft() {
		updateStatus('Saving...');
		const formData = new FormData();
		formData.set('title', title);
		formData.set('body', body);
		formData.set('slug', slug);
		formData.set('status', status);
		formData.set('tags', JSON.stringify(selectedTags));
		formData.set('categoryId', selectedCategoryId);
		formData.set('description', description);
		if (postId) formData.set('id', postId);
		if (imageFile) formData.set('featuredImage', imageFile);
		if (created) formData.set('created', created);

		try {
			const response = await fetch('?/saveDraft', {
				method: 'POST',
				body: formData
			});

			const result = await response.json();

			if (response.ok && !result.error) {
				lastSaved = new Date();
				// Update initial values after successful save
				initialTitle = title;
				initialBody = body;
				initialSlug = slug;
				initialStatus = status;
				initialTags = [...selectedTags];
				initialCategoryId = selectedCategoryId;
				initialDescription = description;
				initialCreated = created;
				imageFile = null;

				message = status === 'draft' ? 'Draft saved successfully' : 'Post saved successfully';
				messageType = 'success';
				if (!postId) postId = result.id;
				if (result.featuredImage) featuredImage = result.featuredImage;
				setTimeout(() => {
					message = '';
				}, 2000);
			} else {
				console.error('Server returned error:', result.error);
				throw new Error(result.error || 'Failed to save');
			}
		} catch (error) {
			console.error('Error saving draft:', error);
			message = 'Error saving post';
			messageType = 'error';
			setTimeout(() => {
				message = '';
			}, 2000);
		}
	}

	function updateStatus(messageText, type = 'success') {
		message = messageText;
		messageType = type;
		setTimeout(() => {
			message = '';
		}, 2000);
	}

	async function handleStatusChange(event) {
		const newStatus = event.target.value;
		status = newStatus;
		if (newStatus === 'published') {
			updateStatus('Click "Publish Post" to confirm publication');
		}
	}

	async function handleSubmit({ result }) {
		submitting = true;
		message = '';
		messageType = '';

		if (result.type === 'success') {
			updateStatus(status === 'draft' ? 'Draft saved successfully' : 'Post saved successfully');
			if (!postId) postId = result.data.id;
			if (result.data.featuredImage) featuredImage = result.data.featuredImage;
			lastSaved = new Date();
		} else if (result.type === 'failure') {
			updateStatus(result.data.error || 'Error saving post', 'error');
		}

		submitting = false;
	}

	// Function to handle image uploads to Firebase
	async function handleImageUpload(file) {
		const storage = getStorage();
		const timestamp = Date.now();
		const storageRef = ref(storage, `blog-images/${timestamp}_${file.name}`);

		try {
			const snapshot = await uploadBytes(storageRef, file);
			const imageUrl = await getDownloadURL(snapshot.ref);
			return imageUrl;
		} catch (error) {
			console.error('Error uploading image:', error);
			return null;
		}
	}

	function handleEditorUpdate(html) {
		body = html;
	}
</script>

<div class="m-4 md:m-8 p-4">
	<div class="flex flex-col lg:flex-row gap-8">
		<!-- Editor Panel -->
		<div class="flex-1">
			<div class="flex items-center justify-between mb-8">
				<!-- <h1 class="text-4xl font-bold">
					{title || 'Untitled Post'}
				</h1> -->
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

			<form
				method="POST"
				action="?/save"
				use:enhance={handleSubmit}
				class="space-y-6"
				id="post-form"
			>
				<input type="hidden" name="id" value={postId} />
				<input type="hidden" name="status" value={status} />
				<input type="hidden" name="tags" value={JSON.stringify(selectedTags)} />

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
					</div>
				</div>

				<div class="form-control">
					<Tiptap content={body} onUpdate={handleEditorUpdate} />
					<input type="hidden" name="body" value={body} />
				</div>
			</form>
		</div>

		<!-- Actions Panel - 2nd column -->
		<div class="w-1/4 lg:border-l lg:pl-8">
			<div class="sticky top-4 space-y-6 max-h-[calc(100vh-2rem)] overflow-y-auto pr-4">
				<!-- status message -->
				<div class="h-6 p-2 flex items-center justify-center text-sm">
					{#if message}
						<span
							class="font-bold font-lg {messageType === 'success' ? 'text-success' : 'text-error'}"
							>{message}</span
						>
					{:else if hasUnsavedChanges}
						<span class="font-bold text-2xl text-warning">Unsaved changes</span>
					{/if}
				</div>

				<h2 class="text-2xl font-bold">Post Actions</h2>
				<div class="space-y-4">
					<button
						type="button"
						class="btn btn-outline w-full {hasUnsavedChanges ? 'btn-primary' : ''}"
						disabled={submitting}
						onclick={() => {
							updateStatus('Saving...');
							saveDraft();
						}}
					>
						{#if status === 'published'}
							Update Post
						{:else}
							Save Draft
						{/if}
					</button>

					{#if postId}
						<button
							type="button"
							class="btn btn-outline btn-info w-full"
							disabled={submitting}
							onclick={() => {
								saveDraft().then(() => {
									window.open(`/blog/${postId}?preview=true`, '_blank');
								});
							}}
						>
							Preview Post
						</button>
					{/if}
				</div>

				<h2 class="text-2xl font-bold">Post Settings</h2>
				<div class="space-y-4">
					<div class="form-control">
						<label class="label" for="post-status">
							<span class="label-text">Status</span>
						</label>
						<select
							id="post-status"
							class="select select-bordered w-full"
							bind:value={status}
							onchange={handleStatusChange}
							disabled={submitting}
						>
							<option value="draft">Draft</option>
							<option value="published" class="text-success">Published</option>
						</select>
					</div>

					<div class="space-y-4">
						<div class="flex flex-col gap-4">
							<div>
								<label for="tags" class="label">Tags</label>
								<TagSelector {tags} {selectedTags} on:tagsUpdate={handleTagUpdate} />
							</div>
						</div>
					</div>
					<CategorySelector categories={data.categories} bind:selectedCategoryId />
					<!-- Description  -->

					<div class="form-control">
						<label class="label" for="post-description">
							<span class="label-text">Short description for SEO and previews</span>
						</label>
						<textarea
							id="post-description"
							name="description"
							bind:value={description}
							class="textarea textarea-bordered h-24"
							placeholder="Enter a brief description of your post..."
							maxlength="160"
						></textarea>
						<label class="label" for="post-description">
							<span class="label-text-alt">{description.length}/160 characters</span>
						</label>
					</div>
				</div>

				<!-- Featured Image Card -->

				<div class="space-y-4">
					<div class="form-control">
						<label class="label" for="featured-image">
							<span class="label-text">Featured Image</span>
						</label>
						<input
							type="file"
							id="featured-image"
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
								alt="Post preview"
								class="w-full h-40 object-cover rounded-md"
							/>
						</div>
					{/if}
				</div>

				<!-- Created Date Card -->

				<div class="form-control">
					<label class="label" for="post-created">
						<span class="label-text">Publish Date</span>
					</label>
					<input
						type="datetime-local"
						id="post-created"
						name="created"
						bind:value={created}
						class="input input-bordered"
					/>
				</div>

				<!-- {#if postId}
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
				{/if} -->
			</div>
		</div>
	</div>
</div>

<div class="image-upload-progress" class:hidden={!uploading}>
	<div class="loading loading-spinner"></div>
	Uploading image...
</div>

<style>
	/* Basic styling for the editor */
	:global(.ProseMirror) {
		outline: none;
		min-height: 500px;
	}

	:global(.ProseMirror img) {
		max-width: 100%;
		height: auto;
		margin: 1rem 0;
	}

	/* Optional: Add a toolbar */
	:global(.editor-toolbar) {
		border-bottom: 1px solid #e2e8f0;
		padding: 0.5rem;
		margin-bottom: 1rem;
	}
</style>
