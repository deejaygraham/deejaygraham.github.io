import slugifySocialImageName from "../plugins/generate-social-images/slugifySocialImageName.js";
import { SOCIAL_PREVIEW_DEFAULT_FILE } from "../plugins/generate-social-images/paths.js";

/** Predictable per-post OG preview filename: `{slugified-fileSlug}.jpg` */
export default function socialImageFile(fileSlug) {
  return `${slugifySocialImageName(fileSlug)}.jpg`;
}

export function isBlogPostInputPath(inputPath = "") {
  return /[/\\]content[/\\]posts[/\\]/.test(String(inputPath));
}

/**
 * OG preview filename for any page: per-post slug, or the shared default.
 * Usage: {{ page.inputPath | ogImageFile(page.fileSlug) }}
 */
export function ogImageFile(inputPath, fileSlug) {
  if (isBlogPostInputPath(inputPath)) {
    return socialImageFile(fileSlug || "index");
  }
  return SOCIAL_PREVIEW_DEFAULT_FILE;
}
