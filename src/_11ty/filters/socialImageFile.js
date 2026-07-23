import slugifySocialImageName from "../plugins/generate-social-images/slugifySocialImageName.js";

/** Predictable OG preview filename: `{slugified-fileSlug}.jpg` */
export default function socialImageFile(fileSlug) {
  return `${slugifySocialImageName(fileSlug)}.jpg`;
}
