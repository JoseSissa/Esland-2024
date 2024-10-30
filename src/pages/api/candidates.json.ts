import voteInfo from "@/data/editions-vote.json";
import type { APIRoute } from "astro";

const DEFAULT_CATEGORY_PARAM = "1";

export const GET: APIRoute = ({ params, request }) => {
    // Recuperamos la URL
    const { url } = request;
    // Recuperamos los search Params (parámetros después del ? en la URL)
    const searchParams = new URL(url).searchParams;
    //Recuperamos la categoría, en caso de ser null o que no se pase parametro en la URL toma el valor por defecto
    const category = Number(
        searchParams.get("category") ?? DEFAULT_CATEGORY_PARAM
    );
    // Recuperamos la info de la categoría de acuerdo al JSON
    const categoryInfo = voteInfo[category];

    return new Response(JSON.stringify(categoryInfo));
};
