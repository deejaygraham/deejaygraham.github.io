import test from "ava";
import isBlogPost from "./isBlogPost.js";

test("detects blog post input paths", (t) => {
  t.true(isBlogPost("./src/content/posts/2026-07-13-aggressive-dates.md"));
  t.true(isBlogPost("src\\content\\posts\\2026-07-13-aggressive-dates.md"));
  t.false(isBlogPost("./src/content/about.md"));
  t.false(isBlogPost("./src/content/index.njk"));
});
