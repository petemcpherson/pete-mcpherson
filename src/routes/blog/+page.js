/** @type {import('./$types').PageLoad} */
export async function load() {

    const posts = [
        {
            title: "Passkeys, explained.",
            description: "Learn about passkeys, the future of authentication. Discover how they work and why they're more secure than traditional passwords.",
            author: "Pete McPherson",
            updated: "2024-06-01",
            tags: ['passkeys', 'authentication', 'security'],
            slug: 'passkeys'
        },
    ];
    return { posts };
};