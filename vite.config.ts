
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProdEnv = mode === "production";

  return {
    server: {
      //       port: 3000,
      // host: isProdEnv ? "tabularasa.ng" : "tabularasa.internal",
      port: 8080,
      host: "localhost", // Changed from tabularasa.internal to localhost
      allowedHosts: ["tabularasa.ng", "tabularasa.internal", "localhost"],
    },
    plugins: [
      react(),
      // sentryVitePlugin({
      //   org: "xyrus-code",
      //   project: process.env.npm_package_name,
      //   telemetry: false,
      //   release: {
      //     name: `${process.env.npm_package_name}@${process.env.npm_package_version}`,
      //   },
      //   authToken: process.env.SENTRY_AUTH_TOKEN,
      // }),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
