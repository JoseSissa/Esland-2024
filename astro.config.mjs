import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import vercel from '@astrojs/vercel/serverless';

import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact(), auth()],
  output: 'server',
  adapter: vercel(),
  i18n: {
    // Idioma por defecto
    defaultLocale: 'es',
    // Los idiomas soportados
    locales: ['es', 'ca', 'en'],
    // Enrutamiento de los idiomas
    routing: {
      // El idioma por defecto ES, y poner la sgte propiedad en false, evitamos que nos ponga el URL/es en la ruta
      prefixDefaultLocale: false // -> si es false ES -> URL/ y  CS URL/ca || si es true ES -> URL/es y  CS URL/ca
    }
  }
});