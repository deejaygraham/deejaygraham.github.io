import test from "ava";
import filterTagList from "./filterTagList.js";

test("empty tag list returns empty list", (t) => {
  t.deepEqual(filterTagList([]), []);
});

test("tag list without global tags is untouched", (t) => {
  const tags = ["code", "foo", "bar"];
  t.deepEqual(filterTagList(tags), tags);
});

test("tags list containing global tags is filtered", (t) => {
  const tags = ["code", "all", "posts"];
  t.deepEqual(filterTagList(tags), ["code"]);
});
