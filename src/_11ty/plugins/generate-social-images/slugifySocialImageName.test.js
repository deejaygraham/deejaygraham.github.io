import test from "ava";
import slugifySocialImageName from "./slugifySocialImageName.js";

test("lowercases and keeps kebab slugs", (t) => {
  t.is(slugifySocialImageName("Aggressive-Dates"), "aggressive-dates");
});

test("replaces unsafe characters", (t) => {
  t.is(slugifySocialImageName("Hello World!"), "hello-world-");
});

test("handles empty input", (t) => {
  t.is(slugifySocialImageName(""), "");
  t.is(slugifySocialImageName(null), "");
});
