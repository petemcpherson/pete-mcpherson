import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	plugins: [
		sveltekit(),
		viteStaticCopy({
			silent: true,
			targets: [
				{
					src: 'src/content/**/*.{jpg,jpeg,png,gif,webp,svg,avif}',
					dest: 'images'
				}
			]
		})
	]
});
