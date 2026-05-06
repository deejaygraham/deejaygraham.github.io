import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["src/_includes/code/**"],
  },
  {
    languageOptions:
    {
      globals: {
        ...globals.browser,
        process: "readonly",
      }
    }
  },
  pluginJs.configs.recommended,
  {
    files: ["src/service-worker/**/*.js"],
    ignores: ["src/service-worker/**/*.test.js"],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
      },
    },
  },
];
