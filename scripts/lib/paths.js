/** Persisted between builds; restored from GitHub Actions cache on CI. */
export const SOCIAL_PREVIEW_CACHE_DIR = "build-cache/img/previews";

/** Published under /img/previews/ on the deployed site. */
export const SOCIAL_PREVIEW_SITE_DIR = "_site/img/previews";

/** Shared OG image for non-post pages (about, index, archive, …). */
export const SOCIAL_PREVIEW_DEFAULT_SLUG = "default";
export const SOCIAL_PREVIEW_DEFAULT_FILE = `${SOCIAL_PREVIEW_DEFAULT_SLUG}.jpg`;
