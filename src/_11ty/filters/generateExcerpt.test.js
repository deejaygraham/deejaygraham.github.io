import test from "ava";
import generateExcerpt from "./generateExcerpt.js";

test("html tags removed", (t) => {
  const content = '<body><h1>Title</h1> Hello World</body>';
  t.is(generateExcerpt(content, 1000), 'Title Hello World');
});

test("markdown links retain link text", (t) => {
  const content = 'Search [google](https://google.com) website';
  t.is(generateExcerpt(content, 1000), 'Search google website');
});

test("newline characters removed", (t) => {
  const content = 'Hello\nWorld\nHello';
  t.is(generateExcerpt(content, 1000), 'Hello World Hello');
});

test("short text is unchanged", (t) => {
  const content = 'This is some short text';
  t.is(generateExcerpt(content, 1000), content);
});

test("long text is truncated at space closest to limit", (t) => {
  const content = 'This is some longer text';
  t.is(generateExcerpt(content, 15), 'This is some');
});

test("shortcodes are removed", (t) => {
  const safe = 'This is a youtube video ';
  const forbidden = '{% youtube "12345" %}';
  t.is(generateExcerpt(safe + forbidden, 100), safe);
});

test("title markdown hashes are removed", (t) => {
  const safe = 'This is a blog post ';
  const forbidden = '## Sub heading goes here';
  t.is(generateExcerpt(safe + forbidden, 100), safe);
});

test("code fences are removed", (t) => {
  const safe = 'This is some awesome code ';
  const forbidden = '```python i = 1 ```';
  t.is(generateExcerpt(safe + forbidden, 100), safe);
});
