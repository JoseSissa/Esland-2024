import { ui, defaultLang, routes } from "./ui";
import type { LanguageKeyUi, RouteKeyUi } from "@/types/types";
import type { Routes } from "@/i18n/ui";
type Language = keyof Routes;
type RouteKey<T extends Language> = keyof Routes[T];

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split("/");
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
    return function t(key: keyof (typeof ui)[typeof defaultLang]) {
        return ui[lang][key] || ui[defaultLang][key];
    };
}

function quitarTildes(texto: string) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function getRouteOfLanguage(lang: LanguageKeyUi, route: RouteKeyUi) {
    return quitarTildes(ui[lang][route]);
}

export function translateRoute(
    key: LanguageKeyUi,
    idiom: LanguageKeyUi,
    route: RouteKey<Language>
) {
    const r = routes[idiom][route];
    if (key == "es") {
        const href = `/${ui[key][r]}`;
        return quitarTildes(href);
    } else {
        const href = `/${key}/${ui[key][r]}`;
        return quitarTildes(href);
    }
}
