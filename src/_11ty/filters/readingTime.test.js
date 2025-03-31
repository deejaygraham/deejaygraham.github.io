import test from "ava";
import readingTime from "./readingTime.js";

test("reading time for short sentence is less than a minute", (t) => {
  t.is(readingTime('this is very short), /less than 1 minute/);
});
