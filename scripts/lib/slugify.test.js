import test from "ava";
import slugify from "./slugify.js";

test("matches Eleventy slugify on titles", (t) => {
  t.is(slugify("Portal Theme on Microbit"), "portal-theme-on-microbit");
  t.is(slugify("Microbit Bird Song2"), "microbit-bird-song2");
  t.is(slugify("Tell Don't Ask"), "tell-dont-ask");
});
