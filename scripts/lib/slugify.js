/**
 * Eleventy's built-in slugify filter (same function as `| slugify` in templates).
 * Loaded via file URL because `@11ty/eleventy` does not export this path publicly.
 */
const { default: slugify } = await import(
  new URL("./Filters/Slugify.js", import.meta.resolve("@11ty/eleventy")),
);

export default slugify;
