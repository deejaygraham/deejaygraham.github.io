import * as prettier from "prettier";

import pageContentLinter from "../linters/page-content/index.js";

export default function applyLifecycle(eleventyConfig, { buildServiceWorker }) {
  eleventyConfig.on("eleventy.before", async () => {
    await buildServiceWorker();
  });

  eleventyConfig.addPreprocessor("drafts", "*", (data) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
      return false;
    }
  });

  eleventyConfig.addLinter("page-content", pageContentLinter);

  eleventyConfig.addTransform("prettier", async function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      return prettier.format(content, {
        bracketSameLine: true,
        printWidth: 250,
        parser: "html",
        tabWidth: 2,
      });
    }

    return content;
  });
}
