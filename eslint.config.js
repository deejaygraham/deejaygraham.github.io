import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      "**/node_modules/**",
      "src/_includes/code/**",
      "src/assets/js/**,
      "src/_generated/**",
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
    files: ["src/service-worker/**/*.js", "_site/js/search.js"],
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
    files: ["_site/sw.js"],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
      },
    },
  },
  {
    files: ["_site/js/search.js"],
    languageOptions: {
      globals: {
        elasticlunr: "readonly",
      },
    },
  },
];
