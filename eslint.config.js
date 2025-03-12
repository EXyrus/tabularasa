
// @ts-check
// Migrate built-in rules to @stylistic/js namespace
/* eslint @stylistic/migrate/migrate-js: "error" */
// Migrate `@typescript-eslint` rules to @stylistic/ts namespace
/* eslint @stylistic/migrate/migrate-ts: "error" */

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import * as prettierPlugin from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";
import cypress from "eslint-plugin-cypress";
import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import stylistic from "@stylistic/eslint-plugin";
import stylisticMigrate from "@stylistic/eslint-plugin-migrate";
import getifyProperArrows from "@getify/eslint-plugin-proper-arrows";
import pluginQuery from '@tanstack/eslint-plugin-query';
import _import from "eslint-plugin-import";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import lodash from "eslint-plugin-lodash";
import react from "eslint-plugin-react";
import unicorn from "eslint-plugin-unicorn";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  ...pluginQuery.configs['flat/recommended'],
  {
    ignores: ["dist", "cypress/e2e/examples", "**/build", "**/*.d.ts", "node_modules/**"],
  },
  ...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
    "plugin:cypress/recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
  )),
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          experimentalObjectRestSpread: true,
          jsx: true,
        },
        project: ["tsconfig.json", "tsconfig.node.json", "cypress/tsconfig.json"],
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "prettier": prettierPlugin,
      "cypress": cypress,
      "@getify/proper-arrows": getifyProperArrows,
      import: fixupPluginRules(_import),
      "jsx-a11y": jsxA11Y,
      lodash,
      react: fixupPluginRules(react),
      unicorn,
      '@stylistic': stylistic,
      '@stylistic/migrate': stylisticMigrate,
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: ["tsconfig.json", "tsconfig.node.json", "cypress/tsconfig.json"],
        },
        node: {
          paths: "src",
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": ["warn", {
        "vars": "all",
        "args": "after-used",
        "caughtErrors": "none",
        "ignoreRestSiblings": false,
        "reportUsedIgnorePattern": false
      }],
      "no-multiple-empty-lines": ["error", { "max": 1 }],
      "prettier/prettier": "error",
      
      // Added custom rules
      "jsx-quotes": ["error", "prefer-single"],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "single", {
        avoidEscape: true,
      }],
      "semi": ["error", "always"],
      "template-curly-spacing": ["error", "never"],
      "func-style": ["error", "expression", {
        allowArrowFunctions: true,
      }],
      "no-console": ["error", {
        allow: ["warn", "error"],
      }],
      "spaced-comment": ["error", "always", {
        exceptions: ["-", "+"],
        markers: ["/"],
      }],
      "lodash/import-scope": [2, "method"],
      "react/jsx-boolean-value": 1,
      
      // Import rules
      "import/order": ["error", {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        pathGroups: [{
          pattern: "src/**",
          group: "internal",
        }],
        "newlines-between": "never",
      }],
      
      "import/no-anonymous-default-export": ["error", {
        allowArray: false,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowCallExpression: true,
        allowLiteral: false,
        allowObject: false,
      }],
      
      // React component rules
      "react/react-in-jsx-scope": "off",
      "react/function-component-definition": ["error", {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      }],
      "react/jsx-no-useless-fragment": ["error", {
        allowExpressions: true,
      }],
      "react/destructuring-assignment": ["error", "always", {
        ignoreClassFields: true,
      }],
      
      // Unicorn rules
      "unicorn/filename-case": ["error", {
        cases: {
          pascalCase: true,
          kebabCase: true,
          camelCase: true,
        },
        ignore: ["\\.cy\\.js$", "\\.cy\\.ts$"],
      }],
      
      // TypeScript rules
      "@typescript-eslint/array-type": ["error", {
        default: "array",
      }],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/prefer-as-const": "error",
      "@typescript-eslint/prefer-includes": "error",
    },
  },
  {
    files: ["cypress/**/*.{js,jsx,ts,tsx}"],
    ...cypress.configs.recommended
  }
];
