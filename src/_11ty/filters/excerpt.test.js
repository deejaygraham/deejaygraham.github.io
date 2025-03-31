import test from "ava";
import excerpt from "./excerpt.js";

test("empty string returns empty string", (t) => {
  t.is(excerpt(""), "");
});

test("short post replaces last word with elipsis", (t) => {
  const shortPost = "This is not very long";
  t.regex(excerpt(shortPost), /This is not very...$/);
});

test("long post is truncated with elipsis", (t) => {
  const longPost = "This is a longer post ".repeat(10);
  t.regex(excerpt(longPost), /post This is a longer post...$/);
});
