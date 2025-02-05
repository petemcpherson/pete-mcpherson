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
        },
        {
            title: "7 Biz Takeaways from FinCon24",
            description: "Here are some blogging & business takeaway from hanging out at FinCon 2024 in Atlanta.",
            author: "Pete McPherson",
            updated: "2024-10-29",
            tags: ['business', 'blogging', 'conferences', 'networking', 'SEO'],
            slug: 'fincon24'
        },
        {
            title: "How to roast coffee at home (in 69 words).",
            description: "Learn how to roast your own coffee at home! Includes my exact equipment setup and step-by-step instructions.",
            author: "Pete McPherson",
            updated: "2025-02-05",
            tags: ['coffee', 'roasting', 'diy'],
            slug: 'roasting'
        }
    ];
    return { posts };
};