<script>
	import { db } from '$lib/firebase';
	import { doc, setDoc, getDoc, addDoc, collection } from 'firebase/firestore';

	/** @type {{ tags: Array<{ id: string, name: string }>, selectedTags?: string[] }} */
	let { tags = $bindable([]), selectedTags = $bindable([]) } = $props();

	// console.log('Initial selected tags:', selectedTags);

	let newTagName = $state('');
	let submitting = $state(false);
	let message = $state('');
	let messageType = $state('');

	// Function to handle adding a new tag
	async function addTag() {
		if (!newTagName.trim()) return;

		try {
			// Format the ID with hyphens, keep the name with spaces
			const tagId = newTagName
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/^-|-$/g, '');

			const tagData = {
				name: newTagName.trim()
			};

			// Store the trimmed name before clearing it
			const trimmedName = newTagName.trim();

			await setDoc(doc(db, 'tags', tagId), tagData);
			tags = [...tags, { id: tagId, name: trimmedName }];
			newTagName = '';
		} catch (error) {
			console.error('Error adding tag:', error);
		}
	}

	// Function to handle tag selection
	function toggleTag(tagId) {
		console.log('Toggling tag:', tagId);
		console.log('Current selected tags before toggle:', selectedTags);

		if (selectedTags.includes(tagId)) {
			selectedTags = selectedTags.filter((id) => id !== tagId);
		} else {
			selectedTags = [...selectedTags, tagId];
		}

		console.log('Selected tags after toggle:', selectedTags);
	}
</script>

<div class="space-y-4">
	<div class="flex flex-wrap gap-2">
		{#each tags as tag}
			<button
				type="button"
				class="btn btn-sm {selectedTags.includes(tag.id) ? 'btn-primary' : 'btn-outline'}"
				onclick={() => toggleTag(tag.id)}
			>
				{tag.name}
			</button>
		{/each}
	</div>

	<div class="flex gap-2">
		<input
			type="text"
			bind:value={newTagName}
			placeholder="Add new tag..."
			class="input input-bordered input-sm flex-1"
			onkeydown={(e) => e.key === 'Enter' && addTag()}
		/>
		<button
			type="button"
			class="btn btn-primary btn-sm"
			onclick={addTag}
			disabled={submitting || !newTagName.trim()}
		>
			{#if submitting}
				<span class="loading loading-spinner loading-xs"></span>
			{:else}
				Add
			{/if}
		</button>
	</div>

	{#if message}
		<div class="alert alert-sm {messageType === 'error' ? 'alert-error' : 'alert-success'}">
			<span>{message}</span>
		</div>
	{/if}
</div>

<style>
	.btn {
		text-transform: capitalize;
	}
</style>
