import { existsSync, readdirSync, readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { findMissingAssetImages } from "./lib/asset-image-references.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");

const SOURCE_ROOTS = [
  path.join(REPO_ROOT, "src", "content"),
  path.join(REPO_ROOT, "src", "_data"),
];

const collectSourceFiles = (directory, { jsOnly = false } = {}) => {
  const files = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (!jsOnly) {
        files.push(...collectSourceFiles(entryPath));
      }
      continue;
    }

    if (!entry.isFile() || entry.name.endsWith(".template.md")) {
      continue;
    }

    if (jsOnly && entry.name.endsWith(".js")) {
      files.push(entryPath);
      continue;
    }

    if (!jsOnly && entry.name.endsWith(".md")) {
      files.push(entryPath);
    }
  }

  return files;
};

const lintAssetImages = () => {
  const issuesByUrl = new Map();

  for (const sourceRoot of SOURCE_ROOTS) {
    if (!existsSync(sourceRoot)) {
      continue;
    }

    for (const filePath of collectSourceFiles(sourceRoot, {
      jsOnly: sourceRoot.endsWith("_data"),
    })) {
      const content = readFileSync(filePath, "utf8");
      const missing = findMissingAssetImages(
        content,
        REPO_ROOT,
        filePath.endsWith(".js") ? "javascript" : "markdown",
      );
      const relativeFile = path.relative(REPO_ROOT, filePath);

      for (const { url, diskPath } of missing) {
        const relativeDiskPath = path.relative(REPO_ROOT, diskPath);
        const existing = issuesByUrl.get(url);

        if (existing) {
          existing.files.push(relativeFile);
          continue;
        }

        issuesByUrl.set(url, {
          url,
          diskPath: relativeDiskPath,
          files: [relativeFile],
        });
      }
    }
  }

  if (issuesByUrl.size === 0) {
    return;
  }

  const issues = [...issuesByUrl.values()].sort((left, right) =>
    left.url.localeCompare(right.url),
  );

  console.error("Missing asset image references:");
  for (const issue of issues) {
    console.error(`  - ${issue.url}`);
    console.error(`    expected at ${issue.diskPath}`);
    for (const file of [...new Set(issue.files)].sort()) {
      console.error(`    referenced in ${file}`);
    }
  }
  process.exit(1);
};

lintAssetImages();
