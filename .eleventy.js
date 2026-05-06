import { buildServiceWorker } from "./scripts/build-service-worker.mjs";
import applyAssets from "./src/_11ty/config/apply-assets.js";
import applyCollections from "./src/_11ty/config/apply-collections.js";
import applyFilters from "./src/_11ty/config/apply-filters.js";
import applyLifecycle from "./src/_11ty/config/apply-lifecycle.js";
import applyPlugins from "./src/_11ty/config/apply-plugins.js";
import applyShortcodes from "./src/_11ty/config/apply-shortcodes.js";
import options from "./src/_11ty/config/options.js";

export default function (eleventyConfig) {
  eleventyConfig.setQuietMode(true);
  eleventyConfig.configureErrorReporting({ allowMissingExtensions: true });
  applyPlugins(eleventyConfig);
  applyCollections(eleventyConfig);
  applyFilters(eleventyConfig);
  applyShortcodes(eleventyConfig);
  applyAssets(eleventyConfig);
  applyLifecycle(eleventyConfig, { buildServiceWorker });

  return options;
}
