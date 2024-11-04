import { ui, routes } from "@/i18n/ui";

export type LanguageKeyUi = keyof typeof ui;
export type RouteKeyUi = keyof (typeof ui)["es"];
export type LanguageKeyRoutes = keyof typeof routes;
