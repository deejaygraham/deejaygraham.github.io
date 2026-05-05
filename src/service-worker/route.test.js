import test from "ava";
import { getFetchRoute } from "./route.js";

const ORIGIN = "https://example.com";

function req(overrides) {
  return {
    method: "GET",
    mode: "same-origin",
    destination: "",
    url: `${ORIGIN}/path`,
    ...overrides,
  };
}

test("non-GET returns none", (t) => {
  t.is(getFetchRoute(req({ method: "POST", url: `${ORIGIN}/a.css` }), ORIGIN), "none");
});

test("navigate mode returns navigate", (t) => {
  t.is(getFetchRoute(req({ mode: "navigate", url: `${ORIGIN}/page` }), ORIGIN), "navigate");
});

test("document destination returns navigate", (t) => {
  t.is(
    getFetchRoute(req({ mode: "cors", destination: "document", url: `${ORIGIN}/x` }), ORIGIN),
    "navigate",
  );
});

test("same-origin style destination returns cssjs", (t) => {
  t.is(
    getFetchRoute(req({ destination: "style", url: `${ORIGIN}/assets/x.css` }), ORIGIN),
    "cssjs",
  );
});

test("same-origin script destination returns cssjs", (t) => {
  t.is(
    getFetchRoute(req({ destination: "script", url: `${ORIGIN}/app.js` }), ORIGIN),
    "cssjs",
  );
});

test("same-origin pathname ending in .css returns cssjs", (t) => {
  t.is(
    getFetchRoute(req({ destination: "", url: `${ORIGIN}/dir/styles.css` }), ORIGIN),
    "cssjs",
  );
});

test("same-origin pathname ending in .js returns cssjs", (t) => {
  t.is(getFetchRoute(req({ url: `${ORIGIN}/bundle.js` }), ORIGIN), "cssjs");
});

test("cross-origin .css does not return cssjs", (t) => {
  t.is(
    getFetchRoute(req({ destination: "style", url: "https://cdn.example/lib.css" }), ORIGIN),
    "default",
  );
});

test("same-origin image destination returns image", (t) => {
  t.is(
    getFetchRoute(req({ destination: "image", url: `${ORIGIN}/pic.png` }), ORIGIN),
    "image",
  );
});

test("image extension match is case-sensitive (.JPEG is default)", (t) => {
  t.is(getFetchRoute(req({ url: `${ORIGIN}/i/photo.JPEG` }), ORIGIN), "default");
});

test("jpeg extension matches", (t) => {
  t.is(getFetchRoute(req({ url: `${ORIGIN}/i/photo.jpeg` }), ORIGIN), "image");
});

test("jpg extension matches", (t) => {
  t.is(getFetchRoute(req({ url: `${ORIGIN}/i/photo.jpg` }), ORIGIN), "image");
});

test("webp and svg match", (t) => {
  t.is(getFetchRoute(req({ url: `${ORIGIN}/a.webp` }), ORIGIN), "image");
  t.is(getFetchRoute(req({ url: `${ORIGIN}/a.svg` }), ORIGIN), "image");
});

test("cross-origin image URL returns default", (t) => {
  t.is(
    getFetchRoute(req({ destination: "image", url: "https://other.origin/img.png" }), ORIGIN),
    "default",
  );
});

test("navigate wins over css pathname", (t) => {
  t.is(
    getFetchRoute(req({ mode: "navigate", url: `${ORIGIN}/file.css` }), ORIGIN),
    "navigate",
  );
});

test("same-origin GET font returns default", (t) => {
  t.is(
    getFetchRoute(req({ destination: "font", url: `${ORIGIN}/fonts/a.woff2` }), ORIGIN),
    "default",
  );
});
