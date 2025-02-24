import test from "ava";
import bust from "./cacheBust.js";

test("url has query parameter appended", (t) => {
  t.regex(bust("style.css"), "/style.css?v=/");
});
