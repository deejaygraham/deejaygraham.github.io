import test from "ava";
import socialImageFile, {
  isBlogPostInputPath,
  ogImageFile,
} from "./socialImageFile.js";

test("returns slugified jpg filename", (t) => {
  t.is(socialImageFile("aggressive-dates"), "aggressive-dates.jpg");
  t.is(socialImageFile("Hello World"), "hello-world.jpg");
});

test("detects blog post input paths", (t) => {
  t.true(
    isBlogPostInputPath("./src/content/posts/2026-07-13-aggressive-dates.md"),
  );
  t.true(
    isBlogPostInputPath("src\\content\\posts\\2026-07-13-aggressive-dates.md"),
  );
  t.false(isBlogPostInputPath("./src/content/about.md"));
  t.false(isBlogPostInputPath("./src/content/index.njk"));
});

test("ogImageFile uses per-post slug for posts and default otherwise", (t) => {
  t.is(
    ogImageFile("./src/content/posts/2026-07-13-aggressive-dates.md", "aggressive-dates"),
    "aggressive-dates.jpg",
  );
  t.is(ogImageFile("./src/content/about.md", "about"), "default.jpg");
  t.is(ogImageFile("./src/content/index.njk", ""), "default.jpg");
});
