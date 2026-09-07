import fs from "fs";
import path from "path";

export const REQUIRED_OUTPUT_FILES = [
  "index.html",
  "404.html",
  "offline.html",
  "js/site.js",
  "js/search.js",
  "css/site.css",
  "sw.js",
  "search-index.json",
  "sitemap.xml",
  "rss.xml",
  "img/previews/default.jpg",
];

export const MINIMUM_HTML_FILE_COUNT = 100;

function findHtmlFiles(directory) {
  const files = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...findHtmlFiles(entryPath));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(entryPath);
    }
  }

  return files;
}

function attributeValue(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}=["']([^"']+)["']`, "i"));
  return match?.[1] || "";
}

function socialPreviewReferences(html) {
  return (html.match(/<meta\b[^>]*>/gi) || [])
    .filter((tag) => attributeValue(tag, "property").toLowerCase() === "og:image")
    .map((tag) => attributeValue(tag, "content"))
    .filter(Boolean);
}

function validateSocialPreview(siteDir, htmlFile, reference, issues) {
  let pathname;
  try {
    pathname = new URL(reference, "https://example.invalid").pathname;
  } catch {
    issues.push(`${path.relative(siteDir, htmlFile)} has an invalid og:image URL: ${reference}`);
    return;
  }

  if (!/^\/img\/previews\/[^/]+\.jpg$/i.test(pathname)) {
    issues.push(
      `${path.relative(siteDir, htmlFile)} has an unexpected og:image path: ${pathname}`,
    );
    return;
  }

  const previewPath = path.join(siteDir, ...pathname.split("/").filter(Boolean));
  try {
    const stats = fs.statSync(previewPath);
    if (!stats.isFile() || stats.size === 0) {
      issues.push(`${path.relative(siteDir, htmlFile)} references an empty social preview: ${pathname}`);
    }
  } catch {
    issues.push(`${path.relative(siteDir, htmlFile)} references a missing social preview: ${pathname}`);
  }
}

export function validateSiteOutput(
  siteDir,
  { minimumHtmlFileCount = MINIMUM_HTML_FILE_COUNT } = {},
) {
  const issues = [];
  const checkedFiles = [];

  if (!fs.existsSync(siteDir) || !fs.statSync(siteDir).isDirectory()) {
    return { issues: [`Site output directory does not exist: ${siteDir}`], checkedFiles, htmlCount: 0 };
  }

  for (const relativePath of REQUIRED_OUTPUT_FILES) {
    const outputPath = path.join(siteDir, relativePath);
    try {
      const stats = fs.statSync(outputPath);
      if (!stats.isFile()) {
        issues.push(`Required output is not a file: ${relativePath}`);
      } else if (stats.size === 0) {
        issues.push(`Required output is empty: ${relativePath}`);
      } else {
        checkedFiles.push(relativePath);
      }
    } catch {
      issues.push(`Missing required output: ${relativePath}`);
    }
  }

  const searchIndexPath = path.join(siteDir, "search-index.json");
  if (fs.existsSync(searchIndexPath)) {
    try {
      JSON.parse(fs.readFileSync(searchIndexPath, "utf8"));
    } catch {
      issues.push("Generated search-index.json is not valid JSON");
    }
  }

  const htmlFiles = findHtmlFiles(siteDir);
  if (htmlFiles.length < minimumHtmlFileCount) {
    issues.push(
      `Expected at least ${minimumHtmlFileCount} HTML files, but found ${htmlFiles.length}`,
    );
  }

  let socialPreviewCount = 0;
  for (const htmlFile of htmlFiles) {
    const html = fs.readFileSync(htmlFile, "utf8");
    if (html.trim() === "") {
      issues.push(`Generated HTML is empty: ${path.relative(siteDir, htmlFile)}`);
      continue;
    }

    for (const reference of socialPreviewReferences(html)) {
      socialPreviewCount += 1;
      validateSocialPreview(siteDir, htmlFile, reference, issues);
    }
  }

  if (socialPreviewCount === 0) {
    issues.push("No og:image references were found in generated HTML");
  }

  return {
    issues,
    checkedFiles,
    htmlCount: htmlFiles.length,
    socialPreviewCount,
  };
}
