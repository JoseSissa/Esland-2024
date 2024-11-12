import SpainFlag from "@/components/flags/Spain.astro";
import AndorraFlag from "@/components/flags/Andorra.astro";
import USAFlag from "@/components/flags/USA.astro";

export const languages: Record<
    string,
    { code: string; name: string; flag: typeof SpainFlag }
> = {
    ca: {
        code: "ca",
        name: "Català",
        flag: AndorraFlag,
    },
    en: {
        code: "en",
        name: "English",
        flag: USAFlag,
    },
    es: {
        code: "es",
        name: "Español",
        flag: SpainFlag,
    },
};

export const ui = {
    es: {
        "nav.inicio": "/",
        "nav.vota": "vota",
        "nav.info": "información",
        "nav.archivo": "archivo",
        "nav.legal": "aviso-legal",
        "nav.privacidad": "privacidad",
        "nav.cookies": "cookies",
    },
    en: {
        "nav.inicio": "/en/",
        "nav.vota": "vote",
        "nav.info": "information",
        "nav.archivo": "archive",
        "nav.legal": "legal-notice",
        "nav.privacidad": "privacy",
        "nav.cookies": "cookies",
    },
    ca: {
        "nav.inicio": "/ca/",
        "nav.vota": "vota",
        "nav.info": "informació",
        "nav.archivo": "arxiu",
        "nav.legal": "avis-legal",
        "nav.privacidad": "privacitat",
        "nav.cookies": "cookies",
    },
} as const;

export const routes = {
    es: {
        home: "nav.inicio",
        vota: "nav.vota",
        informacion: "nav.info",
        archivo: "nav.archivo",
        "aviso-legal": "nav.legal",
        privacidad: "nav.privacidad",
        cookies: "nav.cookies",
    },
    en: {
        home: "nav.inicio",
        vote: "nav.vota",
        information: "nav.info",
        archive: "nav.archivo",
        "legal-notice": "nav.legal",
        privacy: "nav.privacidad",
        cookies: "nav.cookies",
    },
    ca: {
        home: "nav.inicio",
        vota: "nav.vota",
        informacio: "nav.info",
        arxiu: "nav.archivo",
        "avis-legal": "nav.legal",
        privacitat: "nav.privacidad",
        cookies: "nav.cookies",
    },
} as const;

export type Routes = typeof routes;

export const showDefaultLang = false;
export const defaultLang = "es";
