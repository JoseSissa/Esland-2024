import { ui, routes } from "@/i18n/ui";

export type LanguageKeyUi = keyof typeof ui;
export type RouteKeyUi = keyof (typeof ui)["es"];
export type LanguageKeyRoutes = keyof typeof routes;
export type CandidateType = {
    id: string;
    name: string;
    image: string;
    link?: string;
};
export type editionsVoteType = {
    categoryName: string;
    candidates: Array<CandidateType>;
    id: string;
};

export type typeVote = [number, string, string, string, number];
