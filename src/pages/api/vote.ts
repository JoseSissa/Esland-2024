import { addUserVotes, cleanUserVotes } from "@/db/client";
import { type APIRoute } from "astro";
import { getSession } from "auth-astro/server";

export const POST: APIRoute = async ({ request }) => {
    const session = await getSession(request)
    const username = session?.user?.name
    if (!session || !username) {
        return new Response('Unauthorized', { status: 401 })
    }

    let votesToSave = []
    try {
        const { votes } = await request.json()
        votesToSave = votes
    } catch (error) {
        console.error(error);
        return new Response('Invalid JSON', { status: 400 })
    }
    
    try {
        await cleanUserVotes(username)
        await addUserVotes(username, votesToSave)
    } catch (error) {
        console.error(error)
        return new Response('Internal Server Error', { status: 500 })
    }

    return new Response("ok", { status: 200 })
}