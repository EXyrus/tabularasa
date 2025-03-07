
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { sentryVitePlugin } from '@sentry/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    sentryVitePlugin({
      org: "tabula-rasa",
      project: "school-management-system",
      // Auth token can be obtained from https://sentry.io/settings/account/api/auth-tokens/
      // authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
  server: {
    port: 8080
  },
  build: {
    sourcemap: true
  }
});
