
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { componentTagger } from "lovable-tagger";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tsconfigPaths(),
    mode === 'development' && componentTagger(),
    sentryVitePlugin({
      org: "tabula-rasa",
      project: "school-management-system",
      // Auth token can be obtained from https://sentry.io/settings/account/api/auth-tokens/
      // authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ].filter(Boolean),
  server: {
    host: "::",
    port: 8080
  },
  build: {
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}));
