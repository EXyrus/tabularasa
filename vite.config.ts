
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
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      
      // Auth token can be obtained from Sentry account settings
      authToken: process.env.SENTRY_AUTH_TOKEN,
      
      // Release information for Sentry
      release: {
        name: process.env.SENTRY_RELEASE || "0.0.1",
      },
      
      // Disable telemetry if needed
      telemetry: false,
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
  },
  server: {
    port: 8080,
    host: true,
  },
});
