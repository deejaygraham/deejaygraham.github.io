import fs from "fs/promises";
import { minify } from "html-minifier-terser";
import pageContentLinter from "../linters/page-content/index.js";
import generateAllSocialImages from "../../../scripts/lib/generateAllSocialImages.js";
import {
  SOCIAL_PREVIEW_CACHE_DIR,
  SOCIAL_PREVIEW_SITE_DIR,
} from "../../../scripts/lib/paths.js";

async function copySocialPreviewsToSite() {
  try {
    await fs.access(SOCIAL_PREVIEW_CACHE_DIR);
  } catch {
    return;
  }

  await fs.mkdir(SOCIAL_PREVIEW_SITE_DIR, { recursive: true });
  await fs.cp(SOCIAL_PREVIEW_CACHE_DIR, SOCIAL_PREVIEW_SITE_DIR, { recursive: true, force: true });
}

export default function applyLifecycle(eleventyConfig, { buildServiceWorker }) {
  eleventyConfig.on("eleventy.before", async () => {
    await Promise.all([buildServiceWorker(), generateAllSocialImages()]);
  });

  eleventyConfig.on("eleventy.after", async () => {
    await copySocialPreviewsToSite();
  });
  
  eleventyConfig.addPreprocessor("drafts", "*", (data) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
      return false;
    }
  });

  eleventyConfig.addLinter("page-content", pageContentLinter);

  eleventyConfig.addTransform("html-minifier", async function (content) {
    if (
      process.env.ELEVENTY_RUN_MODE === "build" &&
      (this.page.outputPath || "").endsWith(".html")
    ) {
      return minify(content, {
        collapseWhitespace: true,
        conservativeCollapse: true,
      });
    }

    return content;
  });
}
