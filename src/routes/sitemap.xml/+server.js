import { adminDB } from '$lib/server/admin';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const baseUrl = 'https://petemcpherson.com';

	try {
		const postsSnapshot = await adminDB
			.collection('posts')
			.where('status', '==', 'published')
			.get();

		const urls = postsSnapshot.docs
			.map((doc) => {
				const post = doc.data();
				const lastmod = post.updated?.toDate?.()?.toISOString() || post.created?.toDate?.()?.toISOString();

				return `
        <url>
          <loc>${baseUrl}/blog/${post.slug}</loc>
          <lastmod>${lastmod}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
          ${post.featuredImage ? `<image:image><image:loc>${post.featuredImage}</image:loc></image:image>` : ''}
        </url>`;
			})
			.join('');

		const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
              xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

        <url>
          <loc>${baseUrl}</loc>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>

        <url>
          <loc>${baseUrl}/blog</loc>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>

        ${urls}
      </urlset>`;

		return new Response(sitemap.trim(), {
			headers: {
				'Content-Type': 'application/xml'
			}
		});
	} catch (error) {
		console.error('Error generating sitemap:', error);
		return new Response('Error generating sitemap', { status: 500 });
	}
}