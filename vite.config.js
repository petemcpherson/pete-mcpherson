import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

const contentImagesDevPlugin = {
	name: 'content-images-dev',
	configureServer(server) {
		server.middlewares.use('/images', (req, res, next) => {
			const filePath = path.join(process.cwd(), 'src/content', req.url);
			if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
				res.setHeader('Cache-Control', 'no-cache');
				fs.createReadStream(filePath).pipe(res);
			} else {
				next();
			}
		});
	}
};

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		contentImagesDevPlugin,
		viteStaticCopy({
			silent: true,
			targets: [
				{
					src: 'src/content/**/*.{jpg,jpeg,png,gif,webp,svg,avif}',
					dest: 'images',
					rename: (_filename, _ext, fullPath) => {
						const match = fullPath.match(/src\/content\/(.+)/);
						return match ? match[1] : `${_filename}.${_ext}`;
					}
				}
			]
		})
	]
});
