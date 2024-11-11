import { ui, routes } from "@/i18n/ui";

export type LanguageKeyUi = keyof typeof ui;
export type RouteKeyUi = keyof (typeof ui)["es"];
export type LanguageKeyRoutes = keyof typeof routes;
export type typeVoteInDB = [number, string, string, string, number];
export type typeVotesInLocal = Array<Array<string>>;

export interface CandidateType {
    id: string;
    name: string;
    image: string;
    link?: string;
};
export interface editionsVoteType {
    categoryName: string;
    candidates: Array<CandidateType>;
    id: string;
};

export interface pageInfo {
    categoryName: string;
    candidates: Array<CandidateType>;
};