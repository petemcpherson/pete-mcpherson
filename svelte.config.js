import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import rehypeExternalLinks from 'rehype-external-links';

const VARIANT_CLASSES = {
	callout:   'bg-primary text-primary-content',
	primary:   'bg-primary text-primary-content',
	secondary: 'bg-secondary text-secondary-content',
	accent:    'bg-accent text-accent-content',
	info:      'bg-info text-info-content',
	success:   'bg-success text-success-content',
	warning:   'bg-warning text-warning-content',
	error:     'bg-error text-error-content'
};

/**
 * Svelte preprocessor that transforms :::variant ... ::: blocks into
 * styled <div> elements BEFORE mdsvex sees the file.
 * Blank lines inside the div tell remark to still process inner markdown.
 */
const calloutPreprocessor = {
	markup({ content, filename }) {
		if (!filename?.endsWith('.md')) return;

		const result = content.replace(
			/^:::(\w+)[^\n]*\n([\s\S]*?)^:::[ \t]*$/gm,
			(_, variant, inner) => {
				const colorClasses = VARIANT_CLASSES[variant] ?? VARIANT_CLASSES['callout'];
				return `<div class="${colorClasses} p-2 md:p-4 rounded-lg my-4 not-prose">\n\n${inner}\n\n</div>`;
			}
		);

		return { code: result };
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		calloutPreprocessor,
		mdsvex({
			extensions: ['.md'],
			smartypants: true,
			rehypePlugins: [[rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]]
		})
	],
	kit: {
		adapter: adapter()
	}
};

export default config;
