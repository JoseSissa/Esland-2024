import { useVoteSystem } from "@/hooks/useVoteSystem";
import candidatesByCategory from "@/data/editions-vote.json";
import { MAX_CATEGORY, MAX_VOTES_CATEGORY } from "@/const/const";
import { VoteFinal } from "./VoteFinal";
import type { editionsVoteType } from "@/types/types";
import { CameraLink } from "./CameraLink";
import { UserSessionControl } from "./UserSessionControl.jsx";


interface Props {
    nameSession: string;
    imageSession: string;
    i18n: Record<string, string>;
}

const { signOut } = await import("auth-astro/client");

export function VoteSystem({ nameSession, imageSession, i18n }: Props) {
    const { votes, setVotes, pageInfo, category, setCategory, handlePagesNavigation } = useVoteSystem();

    const handleVote = ({ categoryName, candidato } : { categoryName: number; candidato: string; }) => {
        const votesCategory = votes[categoryName];

        // Comprobrar si ha votado, si es así entonces remover el candidato
        if (votesCategory.includes(candidato)) {
            const newVotes = votesCategory.filter(
                (candidatoInArray) => candidatoInArray !== candidato
            );
            setVotes((prevVotes) => prevVotes.with(categoryName, newVotes));
            return;
        }
        // Comprobar si ha votado en esta categoería 4 veces, si selecciona un 5to candidato, elimina el primero seleccionado y agrega el último al final
        if (votesCategory.length >= 4) {
            setVotes((prevVotes) =>
                prevVotes.with(categoryName, [
                    ...votesCategory.slice(1),
                    candidato,
                ])
            );
            return;
        }
        // Agregar un voto
        setVotes((prevVotes) =>
            prevVotes.with(categoryName, [...votesCategory, candidato])
        );        
    };

    const { categoryName = "", candidates: candidatesPerPage } = pageInfo ?? {};
    const votesCategory = votes[category];
    
    if (category == MAX_CATEGORY) {
        if (!candidatesPerPage || !votes) return;
        return (
            <VoteFinal
                editionsVote={candidatesByCategory as Array<editionsVoteType>}
                votes={votes}
                setCategory={setCategory}
                categoryNames={candidatesByCategory.map(
                    ({ categoryName }) => categoryName
                )}
                categoryId={candidatesByCategory.map(({ id }) => id)}
            ></VoteFinal>
        );
    }

    return (
        <div class="relative w-full max-w-7xl min-h-screen mx-auto flex flex-col justify-center items-center pt-28 px-3">
            <CategorySystem>
                {categoryName}
            </CategorySystem>
            <div class="text-center text-xl font-bold mb-4">
                { i18n.votesCast } : { votesCategory.length}/{MAX_VOTES_CATEGORY }
            </div>
            <ul class="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-10">
                {candidatesPerPage?.map((candidato, i) => {
                    const { name, image, link, id } = candidato;
                    const voteIndex = votesCategory.indexOf(id);
                    const isVoted = voteIndex >= 0;

                    return (
                        <li class={`group relative w-full max-w-80 mx-auto rounded-lg overflow-hidden`}>
                            { 
                                candidato.link && <CameraLink link={candidato.link} />
                            }
                            <button
                                class="w-full h-auto"
                                onClick={() => handleVote({ categoryName: category, candidato: id, })}
                            >
                                <img
                                    class={`
                                            relative w-full h-[140px] object-cover rounded-t-lg group-hover:scale-110 group-hover:saturate-100 transition z-0
                                            ${isVoted ? "brightness-105" : "saturate-50"}
                                        `}
                                    src={`/images/voting-assets/${candidato.image}`}
                                    alt={candidato.name}
                                />
                                <p class=
                                    {`
                                        relative h-14 px-2 flex items-center rounded-b-lg text-left font-bold capitalize z-10 
                                        ${isVoted ? "bg-yellow-500" : "bg-blue-900"} 
                                        ${isVoted ? "" : "group-hover:bg-sky-600"}
                                        transition-colors
                                    `}>
                                    {candidato.name}
                                </p>
                            </button>
                        </li>
                    );
                })}
            </ul>
            <footer class="w-full p-2 flex justify-between items-center flex-col-reverse md:flex-row gap-5 rounded bg-black/50">
                <UserSessionControl signOut={signOut} imageSession={imageSession} nameSession={nameSession} textLogout={i18n.logout} />
                <div>
                    <button
                        onClick={() => handlePagesNavigation(category - 1)}
                        class="p-2 border rounded"
                    >
                        <Arrow rotate />
                    </button>
                    <span class="mx-4 font-bold text-xl">
                        { i18n.category }
                        <span class="ml-4 text-2xl">
                            {category + 1} / {MAX_CATEGORY}
                        </span>
                    </span>
                    <button
                        onClick={() => handlePagesNavigation(category + 1)}
                        class="p-2 border rounded"
                    >
                        <Arrow />
                    </button>
                </div>
            </footer>
        </div>
    );
}

function CategorySystem({ children }: { children: string }) {
    return (
        <h1 class="mb-10 lg:mb-20 text-2xl lg:text-4xl font-medium font-tomaso tracking-widest uppercase text-center">
            {children}
        </h1>
    );
}

function Arrow({ rotate }: { rotate?: boolean }) {
    const className = rotate ? "-rotate-180" : "";

    return (
        <svg class={className} width="16" height="16" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                stroke="transparent"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m13.04 1.429 10.218 10.216a.5.5 0 0 1 0 .708L13.04 22.571a.5.5 0 0 1-.707 0l-2.756-2.756a.5.5 0 0 1-.014-.693L14.1 14.5h-13a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h13L9.566 4.878a.5.5 0 0 1 .012-.7l2.755-2.754a.5.5 0 0 1 .707.005Z"
            ></path>
        </svg>
    );
}
