import { useState, useEffect } from "preact/hooks";
import { MAX_CATEGORY } from "@/const/const";
import { type typeVotesInLocal, type pageInfo, type typeVoteInDB } from "@/types/types";


export const useVoteSystem = () => {
    // Nos crea el estado que será un array con una logitud MAX_CATEGORY y donde cada elemento es un array vacío
    // La categoria define la posición del array y cada posición puede tener hasta 4 candidatos
    // [[candidatos], [candidatos]]
    const [votes, setVotes] = useState<typeVotesInLocal>(
        Array.from({ length: MAX_CATEGORY }, () => [])
    );
    const [pageInfo, setPageInfo] = useState<pageInfo>();
    const [category, setCategory] = useState(0);

    // Search candidates from JSON and set pages for category
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

    // Search info of votes in DB and update votes state
    useEffect(() => {
        async function fetchVotes() {
            //  TODO: Decomment this section
            // const response = await fetch("/api/getVotes");
            // const dataFromDB = await response.json();
            // let dataProcessed = [];
            // for (let i = 0; i < dataFromDB.rows.length; i = i + MAX_VOTES_CATEGORY) {
            //     const arr = dataFromDB.rows.slice(i, i + MAX_VOTES_CATEGORY);
            //     dataProcessed.push(arr.map((elem: typeVote) => elem[3]));
            // }
            // localStorage.setItem("votesEsland", JSON.stringify(dataProcessed));
            // setVotes(dataProcessed);

            const newData = JSON.parse(localStorage.getItem("votesEsland"));
            console.log(JSON.stringify(newData));
            setVotes(newData);
        }
        fetchVotes();
    }, []);

    // Update votes in localStorage
    useEffect(() => {
        if(votes[0].length !== 0) {
            const updVotos = JSON.stringify(votes)
            localStorage.setItem("votesEsland", updVotos);
        }        
    }, [votes]);

    // Handles pages navigarion
    const handlePagesNavigation = (categoryIndex: number) => {
        if (categoryIndex < 0) categoryIndex = MAX_CATEGORY - 1;
        else if (categoryIndex > MAX_CATEGORY - 1) categoryIndex = 0;
        setCategory(categoryIndex);
    };

    return { votes, setVotes, pageInfo, category, setCategory, handlePagesNavigation };

}