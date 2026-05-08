import test from "ava";
import relatedPosts from "./relatedPosts.js";

const page = (inputPath, date, tags, url = "/post/") => ({
  inputPath,
  date,
  url,
  data: { tags },
});

test("returns empty list when current page has no tags", (t) => {
  const result = relatedPosts(
    [page("/posts/a.md", "2024-01-01", ["code"], "/a/")],
    { inputPath: "/posts/current.md" },
    [],
    6,
  );

  t.deepEqual(result, []);
});

test("excludes current post and ranks by shared tag count then recency", (t) => {
  const posts = [
    page("/posts/current.md", "2024-01-05", ["code", "python"], "/current/"),
    page("/posts/b.md", "2024-01-04", ["code"], "/b/"),
    page("/posts/c.md", "2024-01-06", ["code", "python"], "/c/"),
    page("/posts/d.md", "2024-01-03", ["python"], "/d/"),
    page("/posts/e.md", "2024-01-02", ["music"], "/e/"),
  ];

  const result = relatedPosts(
    posts,
    { inputPath: "/posts/current.md" },
    ["code", "python"],
    3,
  );

  t.deepEqual(
    result.map((post) => post.url),
    ["/c/", "/b/", "/d/"],
  );
});

test("ignores system tags", (t) => {
  const posts = [
    page("/posts/current.md", "2024-01-01", ["posts", "code"], "/current/"),
    page("/posts/one.md", "2024-01-02", ["posts"], "/one/"),
    page("/posts/two.md", "2024-01-03", ["code"], "/two/"),
  ];

  const result = relatedPosts(
    posts,
    { inputPath: "/posts/current.md" },
    ["posts", "code"],
    6,
  );

  t.deepEqual(
    result.map((post) => post.url),
    ["/two/"],
  );
});
