import { readdirSync, readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, "..", "src", "content", "posts");
const FILENAME_PATTERN = /^\d{4}-\d{2}-\d{2}-.+\.md$/;
const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
const BOOLEAN_PATTERN = /^(true|false)$/;

const parseFrontmatter = (frontmatter) => {
  const values = new Map();

  for (const line of frontmatter.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!match) {
      continue;
    }

    values.set(match[1], match[2].trim());
  }

  return values;
};

const parseTags = (frontmatter) => {
  const match = frontmatter.match(/^tags:\s*\[(.*?)\]\s*$/m);
  if (!match) {
    return null;
  }

  return match[1]
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
};

const lintFile = (filename, content) => {
  const errors = [];

  if (!FILENAME_PATTERN.test(filename)) {
    errors.push("filename must match YYYY-MM-DD-slug.md");
  }

  const frontmatterMatch = content.match(FRONTMATTER_PATTERN);
  if (!frontmatterMatch) {
    errors.push("missing YAML frontmatter block");
    return errors;
  }

  const frontmatter = frontmatterMatch[1];
  const body = frontmatterMatch[2] || "";
  const fields = parseFrontmatter(frontmatter);

  const title = fields.get("title");
  if (!title || !title.trim()) {
    errors.push("title is required");
  }

  const tags = parseTags(frontmatter);
  if (!tags || tags.length === 0) {
    errors.push("tags must be a non-empty array on one line (tags: [a, b])");
  }

  const draft = fields.get("draft");
  if (draft && !BOOLEAN_PATTERN.test(draft)) {
    errors.push("draft must be true or false when defined");
  }

  const layout = fields.get("layout");
  if (layout && !["post", "quotation", "sketchnote"].includes(layout)) {
    errors.push(`layout "${layout}" is not one of: post, quotation, sketchnote`);
  }

  if (layout === "quotation") {
    const attribution = fields.get("attribution");
    if (!attribution || !attribution.trim()) {
      errors.push('quotation posts must define attribution: "..."');
    }
  }

  if (layout === "sketchnote") {
    if (!/^sketchnote:\s*$/m.test(frontmatter)) {
      errors.push("sketchnote posts must define a sketchnote block");
    }
    if (!/^\s{2}url:\s*["'][^"']+["']\s*$/m.test(frontmatter)) {
      errors.push('sketchnote.url is required (e.g.  url: "/assets/...")');
    }
    if (!/^\s{2}alt:\s*["'][^"']+["']\s*$/m.test(frontmatter)) {
      errors.push('sketchnote.alt is required (e.g.  alt: "description")');
    }
  }

  if (!body.trim()) {
    errors.push("post body is empty");
  }

  return errors;
};

const lintPosts = () => {
  const files = readdirSync(POSTS_DIR)
    .filter((entry) => entry.endsWith(".md"))
    .filter((entry) => !entry.endsWith(".template.md"));

  const issues = [];
  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const content = readFileSync(filePath, "utf8");
    const errors = lintFile(file, content);

    for (const error of errors) {
      issues.push({ file, error });
    }
  }

  if (issues.length === 0) {
    return;
  }

  console.error("Frontmatter/content lint failures:");
  for (const issue of issues) {
    console.error(`  - ${issue.file}: ${issue.error}`);
  }
  process.exit(1);
};

lintPosts();
