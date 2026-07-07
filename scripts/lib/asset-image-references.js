import { existsSync } from "fs";
import path from "path";

export const ASSET_IMG_URL_PREFIX = "/assets/img/";

const REFERENCE_PATTERNS = [
  /!\[[^\]]*\]\((\/assets\/img\/[^)\s"]+)/g,
  /\bsrc=["'](\/assets\/img\/[^"']+)["']/g,
  /(?:thumbnail|url):\s*["']?(\/assets\/img\/[^\s"']+)/g,
];

const TEMPLATE_INTERPOLATION = /[#$]\{/;

export function stripVerbatimMarkdown(markdown) {
  return markdown
    .replace(/^```[\s\S]*?^```/gm, "")
    .replace(/`[^`\n]+`/g, "");
}

export function isLiteralAssetImageReference(url) {
  return (
    url.startsWith(ASSET_IMG_URL_PREFIX) && !TEMPLATE_INTERPOLATION.test(url)
  );
}

export function extractAssetImageReferences(content) {
  const scannable = stripVerbatimMarkdown(content);
  const references = new Set();

  for (const pattern of REFERENCE_PATTERNS) {
    for (const match of scannable.matchAll(pattern)) {
      const url = match[1];
      if (isLiteralAssetImageReference(url)) {
        references.add(url);
      }
    }
  }

  return [...references].sort();
}

export function assetImageUrlToDiskPath(url, repoRoot) {
  if (!isLiteralAssetImageReference(url)) {
    return null;
  }

  const relativePath = url.slice(1).split("/");
  return path.join(repoRoot, "src", ...relativePath);
}

export function findMissingAssetImages(content, repoRoot) {
  const missing = [];

  for (const url of extractAssetImageReferences(content)) {
    const diskPath = assetImageUrlToDiskPath(url, repoRoot);
    if (!diskPath || !existsSync(diskPath)) {
      missing.push({ url, diskPath });
    }
  }

  return missing;
}
