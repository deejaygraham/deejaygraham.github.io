import { readdirSync, readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { findMissingAssetImages } from "./lib/asset-image-references.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");
const CONTENT_DIR = path.join(REPO_ROOT, "src", "content");

const collectMarkdownFiles = (directory) => {
  const files = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectMarkdownFiles(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md") && !entry.name.endsWith(".template.md")) {
      files.push(entryPath);
    }
  }

  return files;
};

const lintAssetImages = () => {
  const issues = [];

  for (const filePath of collectMarkdownFiles(CONTENT_DIR)) {
    const content = readFileSync(filePath, "utf8");
    const missing = findMissingAssetImages(content, REPO_ROOT);

    for (const { url, diskPath } of missing) {
      issues.push({
        file: path.relative(REPO_ROOT, filePath),
        url,
        diskPath: path.relative(REPO_ROOT, diskPath),
      });
    }
  }

  if (issues.length === 0) {
    return;
  }

  console.error("Missing asset image references:");
  for (const issue of issues) {
    console.error(
      `  - ${issue.file}: ${issue.url} (expected at ${issue.diskPath})`,
    );
  }
  process.exit(1);
};

lintAssetImages();
