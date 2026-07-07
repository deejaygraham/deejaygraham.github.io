import test from "ava";
import {
  findImageMarkdownIssues,
  lintPageContent,
  stripNonProseHtml,
} from "./index.js";

test("stripNonProseHtml removes pre and code blocks", (t) => {
  const html = `
    <p>Visible prose</p>
    <pre><code>![image](/assets/example.png)</code></pre>
    <p><code>![inline](/assets/inline.png)</code></p>
  `;

  t.false(stripNonProseHtml(html).includes("![image]"));
  t.true(stripNonProseHtml(html).includes("Visible prose"));
});

test("findImageMarkdownIssues ignores markdown image syntax in code blocks", (t) => {
  const html = `
    <article>
      <pre class="language-ruby"><code>file.puts "![image](/posts/example/image.png)"</code></pre>
    </article>
  `;

  t.deepEqual(findImageMarkdownIssues(html), []);
});

test("findImageMarkdownIssues reports unrendered markdown images in prose", (t) => {
  const html = `<p>Broken image: ![screenshot](/assets/missing.png)</p>`;

  t.deepEqual(findImageMarkdownIssues(html), [
    "Image markdown not rendered: ![screenshot](/assets/missing.png)",
  ]);
});

test("lintPageContent skips non-html output", (t) => {
  t.deepEqual(
    lintPageContent("![image](/x.png)", "post.md", "feed.xml"),
    [],
  );
});

test("lintPageContent reports issues for html output", (t) => {
  const issues = lintPageContent(
    `<p>![image](/x.png)</p>`,
    "src/content/posts/example.md",
    "_site/example/index.html",
  );

  t.is(issues.length, 1);
  t.true(issues[0].includes("src/content/posts/example.md"));
});
