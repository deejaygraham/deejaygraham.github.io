/** True when the page is a markdown post under src/content/posts/. */
export default function isBlogPost(inputPath = "") {
  return /[/\\]content[/\\]posts[/\\]/.test(String(inputPath));
}
