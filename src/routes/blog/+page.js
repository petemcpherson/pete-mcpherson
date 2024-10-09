/** @type {import('./$types').PageLoad} */
export async function load() {

    const posts = [
        {
            title: "Passkeys, explained.",
            description: "Learn about passkeys, the future of authentication. Discover how they work and why they're more secure than traditional passwords.",
            author: "Pete McPherson",
            updated: "2024-10-09",
            tags: ['passkeys', 'authentication', 'security'],
            slug: 'passkeys'
        },
        {
            title: "Ultra-fast Wifi (from what you already pay for).",
            description: "Learn about passkeys, the future of authentication. Discover how they work and why they're more secure than traditional passwords.",
            author: "Pete McPherson",
            updated: "2024-10-01",
            tags: ['wifi', 'internet', 'tech', 'home networking', 'productivity'],
            slug: 'wifi'
        }
    ];
    return { posts };
};