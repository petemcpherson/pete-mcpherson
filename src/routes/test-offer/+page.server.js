import { readFileSync } from 'fs';
import { join } from 'path';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
		const htmlPath = join(process.cwd(), 'src', 'routes', 'test-offer', 'timer-snippet.html');
		const htmlContent = readFileSync(htmlPath, 'utf-8');
		return {
			timerSnippet: htmlContent
		};
	} catch (error) {
		console.error('Error loading timer snippet:', error);
		return {
			timerSnippet: null
		};
	}
}

