import { defineConfig } from "cypress";

export default defineConfig({
  pageLoadTimeout: 20_000,
  e2e: {
    baseUrl: "https://deejaygraham.github.io",
    viewportWidth: 1280,
  },
});
