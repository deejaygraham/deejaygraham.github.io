import test from "ava";
import { mkdtempSync, mkdirSync, writeFileSync } from "fs";
import os from "os";
import path from "path";

import {
  assetImageUrlToDiskPath,
  extractAssetImageReferences,
  findMissingAssetImages,
  stripVerbatimMarkdown,
} from "./asset-image-references.js";

test("stripVerbatimMarkdown removes fenced and inline code", (t) => {
  const markdown = `
Prose with ![image](/assets/img/posts/example/real.jpg)

\`\`\`ruby
file.puts "![image](/assets/img/posts/example/fake.jpg)"
\`\`\`

Inline \`![image](/assets/img/posts/example/inline.jpg)\` text
`;

  const stripped = stripVerbatimMarkdown(markdown);
  t.true(stripped.includes("/assets/img/posts/example/real.jpg"));
  t.false(stripped.includes("fake.jpg"));
  t.false(stripped.includes("inline.jpg"));
});

test("extractAssetImageReferences finds markdown, html, and sketchnote paths", (t) => {
  const content = `
---
thumbnail: "/assets/img/thumbnails/notebook-420x255.png"
sketchnote:
  url: "/assets/img/posts/example/example.jpg"
---

![screenshot](/assets/img/posts/example/screenshot.png)

<img src="/assets/img/posts/example/inline.html.png" alt="grid" />
`;

  t.deepEqual(extractAssetImageReferences(content), [
    "/assets/img/posts/example/example.jpg",
    "/assets/img/posts/example/inline.html.png",
    "/assets/img/posts/example/screenshot.png",
  ]);
});

test("extractAssetImageReferences finds thumbnails in javascript data files", (t) => {
  const content = `
export default [
  {
    thumbnail: "/assets/img/posts/talks/example.png",
  },
];
`;

  t.deepEqual(extractAssetImageReferences(content, "javascript"), [
    "/assets/img/posts/talks/example.png",
  ]);
});

test("extractAssetImageReferences ignores template interpolation", (t) => {
  const content = String.raw`![image](/assets/img/posts/#{slug}/image.png)`;
  t.deepEqual(extractAssetImageReferences(content), []);
});

test("assetImageUrlToDiskPath maps site URLs to src files", (t) => {
  const repoRoot = "/repo";
  t.is(
    assetImageUrlToDiskPath("/assets/img/posts/foo/bar.jpg", repoRoot),
    path.join(repoRoot, "src", "assets", "img", "posts", "foo", "bar.jpg"),
  );
});

test("findMissingAssetImages reports only missing files", (t) => {
  const repoRoot = mkdtempSync(path.join(os.tmpdir(), "asset-image-lint-"));
  const imagePath = path.join(
    repoRoot,
    "src",
    "assets",
    "img",
    "posts",
    "demo",
    "exists.jpg",
  );

  mkdirSync(path.dirname(imagePath), { recursive: true });
  writeFileSync(imagePath, "image");

  const content = `
![exists](/assets/img/posts/demo/exists.jpg)
![missing](/assets/img/posts/demo/missing.jpg)
`;

  const missing = findMissingAssetImages(content, repoRoot);
  t.is(missing.length, 1);
  t.is(missing[0].url, "/assets/img/posts/demo/missing.jpg");
});
