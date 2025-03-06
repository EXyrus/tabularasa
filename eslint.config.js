
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettierConfig from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";
import cypress from "eslint-plugin-cypress";

export default tseslint.config(
  { ignores: ["dist", "cypress/e2e/examples"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "prettier": prettierConfig,
      "cypress": cypress,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "warn",
      "no-multiple-empty-lines": ["error", { "max": 1 }],
      "prettier/prettier": "error"
    },
  },
  {
    files: ["cypress/**/*.{js,jsx,ts,tsx}"],
    ...cypress.configs.recommended
  }
);
