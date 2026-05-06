import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      "src/_includes/code/**",
      "src/assets/js/elasticlunr.min.js",
      "src/assets/js/p5.min.js",
      "src/assets/js/qrcode.js",
      "_site/js/elasticlunr.min.js",
      "_site/js/p5.min.js",
      "_site/js/qrcode.js",
    ],
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
