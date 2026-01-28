import test from "ava";
import generateExcerpt from "./generateExcerpt.js";

test("html tags removed", (t) => {
  const content = '<body><h1>Title</h1> Hello World</body>';
  t.is('Title Hello World', generateExcerpt(content, 1000));
});

test("markdown links retain link text", (t) => {
  const content = 'Search [google](https://google.com) website';
  t.is('Search google website', generateExcerpt(content, 1000));
});

test("newline characters removed", (t) => {
  const content = 'Hello\nWorld\nHello';
  t.is('Hello World Hello', generateExcerpt(content, 1000));
});

test("short text is unchanged", (t) => {
  const content = 'This is some short text';
  t.is(content, generateExcerpt(content, 1000));
});

test("long text is truncated at space closest to limit", (t) => {
  const content = 'This is some longer text';
  t.is('This is some', generateExcerpt(content, 15));
});

test("shortcodes are removed", (t) => {
  const content = 'This is a youtube video {% youtube "12345" %}';
  t.is('This is a youtube video', generateExcerpt(content, 100));
});

test("title hashes are removed", (t) => {
  const content = 'This is a blog post ## Sub heading goes here';
  t.is('This is a blog post', generateExcerpt(content, 100));
});

test("code fences are removed", (t) => {
  const content = 'This is some awesome code ```python i = 1 ```';
  t.is('This is some awesome code', generateExcerpt(content, 100));
});
