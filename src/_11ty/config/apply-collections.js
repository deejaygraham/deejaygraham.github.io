import posts from "../collections/posts.js";

export default function applyCollections(eleventyConfig) {
  eleventyConfig.addCollection("posts", posts);
}
