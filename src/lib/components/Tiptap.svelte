<script>
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Image from '@tiptap/extension-image';
	import Link from '@tiptap/extension-link';
	import { app } from '$lib/firebase';
	import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

	const { content = '', onUpdate } = $props();

	let editor = $state(null);
	let uploading = $state(false);
	let uploadProgress = $state(0);
	let showSource = $state(false);
	let sourceContent = $state('');
	let linkUrl = $state('');
	let showLinkInput = $state(false);

	async function handleImageUpload(file) {
		uploading = true;
		uploadProgress = 0;

		try {
			const storage = getStorage(app);
			const timestamp = Date.now();
			const fileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
			const storageRef = ref(storage, `blog-images/${timestamp}_${fileName}`);

			// Create upload task
			const uploadTask = uploadBytes(storageRef, file);

			// Get download URL after upload completes
			const snapshot = await uploadTask;
			const imageUrl = await getDownloadURL(snapshot.ref);

			uploading = false;
			uploadProgress = 100;
			return imageUrl;
		} catch (error) {
			console.error('Error uploading image:', error);
			uploading = false;
			return null;
		}
	}

	function insertImage(url) {
		if (editor && url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	}

	function openImageUploadDialog() {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.onchange = async (event) => {
			const file = event.target.files[0];
			if (file) {
				const url = await handleImageUpload(file);
				if (url) {
					insertImage(url);
				}
			}
		};
		input.click();
	}

	function toggleSource() {
		if (showSource) {
			// Store the source content before switching
			const newContent = sourceContent;
			showSource = false;

			// Wait for the DOM to update
			setTimeout(() => {
				if (editor) {
					// Destroy the old editor
					editor.destroy();

					// Create a new editor with the source content
					editor = new Editor({
						element: document.querySelector('#editor'),
						extensions: [
							StarterKit,
							Image.configure({
								HTMLAttributes: {
									class: 'rounded-lg max-w-full h-auto'
								},
								uploadImage: async (file) => {
									const url = await handleImageUpload(file);
									return url;
								}
							}),
							Link.configure({
								openOnClick: false,
								HTMLAttributes: {
									class: 'text-primary underline'
								}
							})
						],
						content: newContent,
						onUpdate: ({ editor }) => {
							if (onUpdate) {
								onUpdate(editor.getHTML());
							}
						},
						editorProps: {
							handleDrop: (view, event, slice, moved) => {
								if (!moved && event.dataTransfer?.files?.length) {
									const files = Array.from(event.dataTransfer.files);
									const images = files.filter((file) => file.type.startsWith('image'));

									if (images.length) {
										event.preventDefault();

										images.forEach(async (image) => {
											const url = await handleImageUpload(image);
											if (url) {
												insertImage(url);
											}
										});

										return true;
									}
								}
								return false;
							},
							handlePaste: (view, event) => {
								const items = Array.from(event.clipboardData?.items || []);
								const images = items.filter((item) => item.type.startsWith('image'));

								if (images.length) {
									event.preventDefault();

									images.forEach((item) => {
										const file = item.getAsFile();
										if (file) {
											handleImageUpload(file).then((url) => {
												if (url) {
													insertImage(url);
												}
											});
										}
									});

									return true;
								}
								return false;
							}
						}
					});

					// Focus the editor
					editor.commands.focus();

					// Update parent component
					if (onUpdate) {
						onUpdate(newContent);
					}
				}
			}, 0);
		} else {
			// Store current editor content
			if (editor) {
				sourceContent = editor.getHTML();
			}
			showSource = true;
		}
	}

	function setLink() {
		if (!linkUrl) {
			editor.chain().focus().unsetLink().run();
			showLinkInput = false;
			return;
		}

		// Add https:// if no protocol is specified
		const url = /^https?:\/\//.test(linkUrl) ? linkUrl : `https://${linkUrl}`;

		editor.chain().focus().setLink({ href: url }).run();
		linkUrl = '';
		showLinkInput = false;
	}

	function unsetLink() {
		editor.chain().focus().unsetLink().run();
		linkUrl = '';
		showLinkInput = false;
	}

	onMount(() => {
		editor = new Editor({
			element: document.querySelector('#editor'),
			extensions: [
				StarterKit,
				Image.configure({
					HTMLAttributes: {
						class: 'rounded-lg max-w-full h-auto'
					},
					uploadImage: async (file) => {
						const url = await handleImageUpload(file);
						return url;
					}
				}),
				Link.configure({
					openOnClick: false,
					HTMLAttributes: {
						class: 'text-primary underline'
					}
				})
			],
			content,
			onUpdate: ({ editor }) => {
				if (onUpdate) {
					onUpdate(editor.getHTML());
				}
			},
			editorProps: {
				handleDrop: (view, event, slice, moved) => {
					if (!moved && event.dataTransfer?.files?.length) {
						const files = Array.from(event.dataTransfer.files);
						const images = files.filter((file) => file.type.startsWith('image'));

						if (images.length) {
							event.preventDefault();

							images.forEach(async (image) => {
								const url = await handleImageUpload(image);
								if (url) {
									insertImage(url);
								}
							});

							return true;
						}
					}
					return false;
				},
				handlePaste: (view, event) => {
					const items = Array.from(event.clipboardData?.items || []);
					const images = items.filter((item) => item.type.startsWith('image'));

					if (images.length) {
						event.preventDefault();

						images.forEach((item) => {
							const file = item.getAsFile();
							if (file) {
								handleImageUpload(file).then((url) => {
									if (url) {
										insertImage(url);
									}
								});
							}
						});

						return true;
					}
					return false;
				}
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div id="editor-container">
	{#if editor}
		<div class="editor-toolbar mb-2">
			<button
				type="button"
				class="btn btn-sm"
				onclick={() => editor.chain().focus().toggleBold().run()}
				class:active={editor.isActive('bold')}
			>
				Bold
			</button>
			<button
				type="button"
				class="btn btn-sm"
				onclick={() => editor.chain().focus().toggleItalic().run()}
				class:active={editor.isActive('italic')}
			>
				Italic
			</button>
			<button
				type="button"
				class="btn btn-sm"
				onclick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				class:active={editor.isActive('heading', { level: 2 })}
			>
				H2
			</button>
			<button
				type="button"
				class="btn btn-sm"
				onclick={() => editor.chain().focus().toggleBulletList().run()}
				class:active={editor.isActive('bulletList')}
			>
				Bullet List
			</button>
			<button
				type="button"
				class="btn btn-sm"
				onclick={() => editor.chain().focus().toggleOrderedList().run()}
				class:active={editor.isActive('orderedList')}
			>
				Ordered List
			</button>
			<button type="button" class="btn btn-sm" onclick={openImageUploadDialog}> Image </button>
			<button type="button" class="btn btn-sm" onclick={toggleSource} class:active={showSource}>
				Source
			</button>
			<button
				type="button"
				class="btn btn-sm"
				onclick={() => (showLinkInput = !showLinkInput)}
				class:active={editor.isActive('link')}
			>
				Link
			</button>
			{#if showLinkInput}
				<div class="flex gap-2 items-center">
					<input
						type="text"
						bind:value={linkUrl}
						placeholder="Enter URL..."
						class="input input-bordered input-sm"
						onkeydown={(e) => e.key === 'Enter' && setLink()}
					/>
					<button type="button" class="btn btn-sm btn-primary" onclick={setLink}>Add</button>
					{#if editor.isActive('link')}
						<button type="button" class="btn btn-sm btn-error" onclick={unsetLink}>Remove</button>
					{/if}
				</div>
			{/if}
		</div>
	{/if}
	{#if showSource}
		<textarea
			bind:value={sourceContent}
			class="w-full h-[500px] p-4 border rounded-lg bg-white font-mono text-sm"
			placeholder="Enter HTML content..."
		></textarea>
	{:else}
		<div id="editor" class="prose prose-sm sm:prose-base lg:prose-lg m-5 focus:outline-none"></div>
	{/if}
</div>

{#if uploading}
	<div class="image-upload-progress">
		<div class="loading loading-spinner"></div>
		<p>Uploading image... {uploadProgress}%</p>
	</div>
{/if}

<style>
	.editor-toolbar {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding: 0.5rem;
		border: 1px solid #e2e8f0;
		border-bottom: none;
		border-radius: 0.5rem 0.5rem 0 0;
		background-color: #f8fafc;
	}

	.editor-toolbar button {
		padding: 0.25rem 0.5rem;
		border: 1px solid #e2e8f0;
		border-radius: 0.25rem;
		background-color: white;
		cursor: pointer;
	}

	.editor-toolbar button.active {
		background-color: #e2e8f0;
	}

	.editor-toolbar button:hover {
		background-color: #f1f5f9;
	}

	.image-upload-progress {
		position: fixed;
		bottom: 20px;
		right: 20px;
		background-color: rgba(0, 0, 0, 0.7);
		color: white;
		padding: 10px 20px;
		border-radius: 5px;
		display: flex;
		align-items: center;
		gap: 10px;
		z-index: 1000;
	}
</style>
