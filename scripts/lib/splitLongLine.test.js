import test from "ava";
import splitLongLine from "./splitLongLine.js";

test("short line returns single line array", (t) => {
  t.is(splitLongLine("short title", 200, 2).length, 1);
});

test("longer line returns two line array", (t) => {
  const title = "this is a longer line that can be split";
  const lines = splitLongLine(title, 10, 20);

  t.is(lines.length, 5);
  t.is(lines[0], "this is");
  t.is(lines[1], "a longer");
  t.is(lines[4], "be split");
});

test("longest line is truncated with ellipsis", (t) => {
  const title = "this is a longer line that can be split";
  const lines = splitLongLine(title, 10, 2);

  t.is(lines.length, 2);
  t.is(lines[0], "this is");
  t.is(lines[1], "a longer...");
});
