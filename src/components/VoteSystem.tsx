import { useEffect, useState } from "preact/hooks";

interface pageInfo {
    categoria: string;
    candidatos: Candidate[];
}
interface Candidate {
    nombre: string;
    imagen: string;
    enlace?: string;
}

type typeVotes = Array<Array<number>>;

const MAX_CATEGORY = 12;
const MAX_VOTES_CATEGORY = 4

export function VoteSystem() {
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
        }

        fetchCandidates();
    }, [category]);

    const handleNavigation = (categoryIndex: number) => {
        if (categoryIndex < 0) categoryIndex = MAX_CATEGORY - 1;
        else if (categoryIndex > MAX_CATEGORY - 1) categoryIndex = 0;
        setCategory(categoryIndex);
    };

    const handleVote = ({ categoria, candidato }: { categoria: number; candidato: number;}) => {
        const votesCategory = votes[categoria];
        
        // Comprobrar si ha votado, si es así entonces remover el candidato
        if (votesCategory.includes(candidato)) {
            const newVotes = votesCategory.filter((candidatoInArray) => candidatoInArray !== candidato)
            setVotes(prevVotes => prevVotes.with(categoria, newVotes))
            return
        }
        // Comprobar si ha votado en esta categoería 4 veces entonces no le permite agregar un nuevo candidato
        // if (votesCategory.length >= 4) return;

        // Comprobar si ha votado en esta categoería 4 veces, si selecciona un 5to candidato, elimina el primero seleccionado y agrega el último al final
        if (votesCategory.length >= 4) {
            setVotes(prevVotes => prevVotes.with(categoria, [...votesCategory.slice(1), candidato]));
            return
        };
        // Agregar un voto
        setVotes(prevVotes => prevVotes.with(categoria, [...votesCategory, candidato]))
    };

    const { categoria = "", candidatos } = pageInfo ?? {};
    const votesCategory = votes[category]

    return (
        <div class="absolute w-full h-full flex flex-col justify-center items-center">
            <CategorySystem>{categoria}</CategorySystem>
            <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {candidatos?.map((candidato, i) => {
                    const isVoted = votesCategory.includes(candidatos.indexOf(candidato))
                    return (
                        <li class={`${isVoted ? 'bg-yellow-500' : 'bg-blue-900'} p-1 hover:bg-sky-500 transition-colors text-center`}>
                            {/* <a href={candidato.enlace} target="_blank"> */}
                            <button onClick={() => handleVote({ categoria: category, candidato: i})}>
                                <img
                                    src={`/images/voting-assets/${candidato.imagen}`}
                                    alt={candidato.nombre}
                                    />
                                <p>{candidato.nombre}</p>
                            </button>
                            {/* </a> */}
                        </li>
                    );
                })}
            </ul>
            <footer>
                <div>
                    Votos realizados: {votesCategory.length}/{MAX_VOTES_CATEGORY}
                </div>
                <button onClick={() => handleNavigation(category - 1)}>
                    <Arrow rotate />
                </button>
                Categoría {category + 1} / {MAX_CATEGORY}
                <button onClick={() => handleNavigation(category + 1)}>
                    <Arrow />
                </button>
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
 