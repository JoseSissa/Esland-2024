import GitHub from '@auth/core/providers/github';
import Twitch from '@auth/core/providers/twitch';
import { defineConfig } from 'auth-astro';

export default defineConfig({
  providers: [
    GitHub({
      clientId: import.meta.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    }),
    Twitch({
      clientId: import.meta.env.TWITCH_CLIENT_ID,
      clientSecret: import.meta.env.TWITCH_CLIENT_SECRET,
    }),
  ],
});