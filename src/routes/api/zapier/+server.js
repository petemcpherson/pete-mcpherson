/** @type {import('./$types').RequestHandler} */
import { json } from "@sveltejs/kit";

export const POST = async ({ request }) => {

    const data = await request.json();
    const zapUrl = data.zapierUrl;

    // console.log("zap triggered. Data: ", data)

    await fetch(zapUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(data)
    });

    return json({ response: data }, { status: 200 })

}