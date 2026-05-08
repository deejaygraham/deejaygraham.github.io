import { readdirSync, readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { allowedTags, normalizeTag } from "../src/content/posts/tag-taxonomy.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, "..", "src", "content", "posts");
const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---/;
const TAGS_ARRAY_PATTERN = /^tags:\s*\[([\s\S]*?)\]/m;

function extractTagsFromFrontmatter(content) {
  const frontmatterMatch = content.match(FRONTMATTER_PATTERN);
  if (!frontmatterMatch) {
    return [];
  }

  const tagsMatch = frontmatterMatch[1].match(TAGS_ARRAY_PATTERN);
  if (!tagsMatch) {
    return [];
  }

  return tagsMatch[1]
    .split(",")
    .map((value) => value.trim().replace(/^['"]|['"]$/g, ""))
    .filter(Boolean);
}

function lintUnknownTags() {
  const files = readdirSync(POSTS_DIR).filter((entry) => entry.endsWith(".md"));
  const unknownTags = [];

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const content = readFileSync(filePath, "utf8");
    const tags = extractTagsFromFrontmatter(content);

    for (const tag of tags) {
      const normalized = normalizeTag(tag);
      if (normalized && !allowedTags.has(normalized)) {
        unknownTags.push({ file, tag, normalized });
      }
    }
  }

  if (unknownTags.length === 0) {
    return;
  }

  console.error("Unknown tags found in post frontmatter:");
  for (const issue of unknownTags) {
    console.error(`  - ${issue.file}: "${issue.tag}" (normalized: "${issue.normalized}")`);
  }
  console.error("");
  console.error("Add valid tags to src/content/posts/tag-taxonomy.js if intentional.");
  process.exit(1);
}

lintUnknownTags();
