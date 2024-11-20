import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://deejaygraham.github.io",
    viewportWidth: 1280,
  },
});
