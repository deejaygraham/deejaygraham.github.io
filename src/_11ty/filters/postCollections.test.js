import test from "ava";
import { excludePostsByUrls, findPostByUrl } from "./postCollections.js";

const posts = [
  { url: "/2025/06/02/microbit-shyness/", data: { title: "A" } },
  { url: "/2025/05/29/microbit-musicbox/", data: { title: "B" } },
  { url: "/2024/01/01/other/", data: { title: "C" } },
];

test("findPostByUrl matches with or without trailing slash", (t) => {
  t.is(findPostByUrl(posts, "/2025/06/02/microbit-shyness/")?.data.title, "A");
  t.is(findPostByUrl(posts, "/2025/06/02/microbit-shyness")?.data.title, "A");
});

test("excludePostsByUrls removes featured URLs", (t) => {
  const featured = [{ url: "/2025/06/02/microbit-shyness/", blurb: "x" }];
  const out = excludePostsByUrls(posts, featured);
  t.is(out.length, 2);
  t.false(out.some((p) => p.url.includes("microbit-shyness")));
});

test("excludePostsByUrls returns collection unchanged when featured empty", (t) => {
  t.is(excludePostsByUrls(posts, []).length, 3);
});
