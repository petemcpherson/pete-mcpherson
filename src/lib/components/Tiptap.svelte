<script>
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Image from '@tiptap/extension-image';
	import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

	const { content = '', onUpdate } = $props();

	let editor = $state(null);

	async function handleImageUpload(file) {
		const storage = getStorage();
		const storageRef = ref(storage, `posts/${Date.now()}-${file.name}`);
		await uploadBytes(storageRef, file);
		return await getDownloadURL(storageRef);
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
									const { schema } = view.state;
									const node = schema.nodes.image.create({ src: url });
									const transaction = view.state.tr.replaceSelectionWith(node);
									view.dispatch(transaction);
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
										const { schema } = view.state;
										const node = schema.nodes.image.create({ src: url });
										const transaction = view.state.tr.replaceSelectionWith(node);
										view.dispatch(transaction);
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
		</div>
	{/if}
	<div id="editor" class=" prose prose-sm sm:prose-base lg:prose-lg m-5 focus:outline-none"></div>
</div>

<!-- <style>
	.editor-toolbar {
		display: flex;
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
</style> -->
