import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      "**/node_modules/**",
      "src/_includes/code/**",
      "src/assets/js/**",
      "src/_generated/**",
      // Built/minified bundles — lint sources under src/ instead
      "_site/js/**",
      "_site/sw.js",
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        process: "readonly",
      },
    },
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
  {
    files: ["generate-thumbnails.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        Buffer: "readonly",
      },
    },
  },
];
