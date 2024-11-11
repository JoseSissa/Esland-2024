import { useEffect, useState } from "preact/hooks";
import { type CandidateType, type editionsVoteType, type typeVote } from "@/types/types";
import { MAX_CATEGORY, MAX_VOTES_CATEGORY } from "@/const/const";
import { VoteFinal } from "./VoteFinal";
import candidatesByCategory from "@/data/editions-vote.json";

interface pageInfo {
    categoryName: string;
    candidates: Array<CandidateType>;
}
interface Props {
    nameSession: string;
    imageSession: string;
}

type typeVotes = Array<Array<string>>;

const { signOut } = await import("auth-astro/client");

export function VoteSystem({ nameSession, imageSession }: Props) {
    const [pageInfo, setPageInfo] = useState<pageInfo>();
    const [category, setCategory] = useState(0);
    // Nos crea el estado que será un array con una logitud MAX_CATEGORY y donde cada elemento es un array vacío
    // La categoria define la posición del array y cada posición puede tener hasta 4 candidatos
    // [[candidatos], [candidatos]]
    const [votes, setVotes] = useState<typeVotes>(
        Array.from({ length: MAX_CATEGORY }, () => [])
    );

    useEffect(() => {
        async function fetchCandidates() {
            const response = await fetch(
                `/api/candidates.json?category=${category}`
            );
            const data = await response.json();
            setPageInfo(data);
            const votes = localStorage.getItem("votesEsland");

            if (votes) {
                setVotes(JSON.parse(votes));
            }
        }
        fetchCandidates();
    }, [category]);

    useEffect(() => {
        async function fetchVotes() {
            // const response = await fetch("/api/getVotes");
            // const data = await response.json();


            // let newData = [
            //     ["1-2","1-3","1-4","1-5"],
            //     ["2-1","2-2","2-3","2-4"],
            //     ["3-2","3-3","3-4","3-5"],
            //     ["4-2","4-3","4-4","4-5"],
            //     ["5-2","5-3","5-4","5-5"],
            //     ["6-2","6-3","6-4","6-5"],
            //     ["7-2","7-3","7-4","7-5"],
            //     ["8-2","8-3","8-4","8-5"],
            //     ["9-2","9-3","9-4","9-5"],
            //     ["10-2","10-3","10-4","10-5"],
            //     ["11-2","11-3","11-4","11-5"],
            //     ["12-2","12-3","12-4","12-1"]
            // ];
            // for (let i = 0; i < data.rows.length; i = i + MAX_VOTES_CATEGORY) {
            //     const arr = data.rows.slice(i, i + MAX_VOTES_CATEGORY);
            //     newData.push(arr.map((elem: typeVote) => elem[3]));
            // }
            // localStorage.setItem("votesEsland", JSON.stringify(newData));
            const newData = JSON.parse(localStorage.getItem("votesEsland"));
            console.log(JSON.stringify(newData));
            setVotes(newData);
            // console.log(newData);
            
        }
        fetchVotes();
    }, []);

    useEffect(() => {
        console.log('Effect update VOTES');
        if(votes[0].length !== 0) {
            const updVotos = JSON.stringify(votes)
            localStorage.setItem("votesEsland", updVotos);
        }        
    }, [votes]);

    const handleNavigation = (categoryIndex: number) => {
        if (categoryIndex < 0) categoryIndex = MAX_CATEGORY - 1;
        else if (categoryIndex > MAX_CATEGORY - 1) categoryIndex = 0;
        setCategory(categoryIndex);
    };

    const setPrevCategory = () => {
        const prevCategory = category > 0 ? category - 1 : MAX_CATEGORY - 1;
        setCategory(prevCategory);
    };

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
        // Comprobar si ha votado en esta categoería 4 veces entonces no le permite agregar un nuevo candidato
        // if (votesCategory.length >= 4) return;

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

    // TODO
    if (category == MAX_CATEGORY - 1) {
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
        <div class="relative w-full max-w-7xl h-screen mx-auto flex flex-col justify-center items-center">
            <CategorySystem>{categoryName}</CategorySystem>
            <div class="text-center text-xl font-bold mb-4">
                Votos realizados: {votesCategory.length}/{MAX_VOTES_CATEGORY}
            </div>
            <ul class="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-10">
                {candidatesPerPage?.map((candidato, i) => {
                    const { name, image, link, id } = candidato;
                    const voteIndex = votesCategory.indexOf(id);
                    const isVoted = voteIndex >= 0;

                    return (
                        <li
                            class={`${isVoted ? "bg-yellow-500" : "bg-blue-900"}
                                    group relative text-center rounded-lg hover:bg-sky-400 transition-colors overflow-hidden`}
                        >
                            {candidato.link && (
                                <a
                                    href={candidato.link}
                                    target="_blank"
                                    class="
                                            absolute top-2 right-2 inline-flex w-8 h-8 justify-center items-center border
                                            bg-white text-black rounded-full hover:bg-black hover:text-white z-10"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M17.3213 14.501c-.3204-.1755-.5195-.5117-.5195-.877v-3.2467c0-.3653.1991-.70155.5195-.87706l3.6075-1.9761c.6664-.36506 1.4804.11718 1.4804.87703v7.19893c0 .7598-.814 1.2421-1.4804.877l-3.6075-1.9761ZM8.43066 8.53223h4.12974v4.12967M5.91504 15.1943 12.438 8.67136"
                                        ></path>
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M3.59082 19.499c-1.10457 0-2-.8954-2-2V6.50193c0-1.10457.89543-2 2-2H14.8013c1.1045 0 2 .89543 2 2V17.499c0 1.1046-.8955 2-2 2H3.59082Z"
                                        ></path>
                                    </svg>
                                </a>
                            )}
                            <button
                                onClick={() =>
                                    handleVote({
                                        categoryName: category,
                                        candidato: id,
                                    })
                                }
                            >
                                <img
                                    class="rounded-t-lg group-hover:scale-110 transition-transform"
                                    src={`/images/voting-assets/${candidato.image}`}
                                    alt={candidato.name}
                                />
                                <p class="font-bold capitalize my-2">
                                    {candidato.name}
                                </p>
                            </button>
                        </li>
                    );
                })}
            </ul>
            <footer class="w-full p-2 flex justify-between items-center rounded bg-black/50">
                <div class="flex items-center gap-2">
                    <img
                        src={imageSession}
                        alt={nameSession}
                        class="w-10 h-10 rounded-full"
                    />
                    <div>
                        <span class="block">{nameSession}</span>
                        <button onClick={() => signOut()}>Cerrar sesion</button>
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => handleNavigation(category - 1)}
                        class="p-2 border rounded"
                    >
                        <Arrow rotate />
                    </button>
                    <span class="mx-4 font-bold text-xl">
                        Categoría
                        <span class="ml-4 text-2xl">
                            {category + 1} / {MAX_CATEGORY}
                        </span>
                    </span>
                    <button
                        onClick={() => handleNavigation(category + 1)}
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
        <h1 class="mb-20 text-4xl lg:text-6xl font-medium font-tomaso tracking-widest uppercase text-center">
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
