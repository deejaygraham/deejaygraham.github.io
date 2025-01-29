import { defineConfig } from "cypress";

export default defineConfig({
  pageLoadTimeout: 60_000,
  e2e: {
    baseUrl: "http://localhost:4222",
    viewportWidth: 1280,
  },
});
