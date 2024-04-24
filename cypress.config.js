const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://deejaygraham.github.io",
    viewportWidth: 1280,
  },
});
