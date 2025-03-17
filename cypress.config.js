import { defineConfig } from "cypress";

export default defineConfig({
  pageLoadTimeout: 60_000,
  e2e: {
    baseUrl: "https://deejaygraham.github.io",
    viewportWidth: 1280,
    excludeSpecPattern: [
        "cypress/e2e/**/homepage.cy.js", // problem with cypress loading the page
   ],
  },
});
