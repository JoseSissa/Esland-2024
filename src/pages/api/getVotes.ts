import { getVotesFromUser } from "@/db/client";
import { getSession } from "auth-astro/server";
import { type APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
    const session = await getSession(request);
    const username = session?.user?.name;
    if (!session || !username) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        const votes = await getVotesFromUser(username);
        return new Response(JSON.stringify(votes), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
};
