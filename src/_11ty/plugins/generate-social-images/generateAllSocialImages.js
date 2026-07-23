import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { DateTime } from "luxon";
import generateSocialImage from "./generateSocialImage.js";
import { SOCIAL_PREVIEW_CACHE_DIR } from "./paths.js";
import slugifySocialImageName from "./slugifySocialImageName.js";

const WATERMARK = "./src/assets/img/favicon.png";
const SITE_NAME = "d.j. graham";
const POSTS_DIR = "src/content/posts";
const CONTENT_DIR = "src/content";
const DEFAULT_CONCURRENCY = 8;

/** Match Eleventy fileSlug for YYYY-MM-DD-title content files. */
export function eleventyFileSlug(basename) {
  const name = basename.replace(/\.(md|njk|html)$/i, "");
  const match = name.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
  return match ? match[1] : name;
}

function dateFromFilename(basename) {
  const match = basename.match(/^(\d{4}-\d{2}-\d{2})-/);
  return match ? match[1] : null;
}

function formatDateFull(dateInput) {
  if (!dateInput) {
    return "";
  }

  const dt =
    dateInput instanceof Date
      ? DateTime.fromJSDate(dateInput)
      : DateTime.fromISO(String(dateInput), { zone: "utc" });

  if (!dt.isValid) {
    return "";
  }

  return dt.setLocale("en-GB").toLocaleString(DateTime.DATE_FULL);
}

async function collectTargets() {
  const targets = [];
  const seen = new Set();

  const addTarget = ({ slug, title, postDate }) => {
    if (!title) {
      return;
    }

    const imageName = slugifySocialImageName(slug);
    if (!imageName || seen.has(imageName)) {
      return;
    }

    seen.add(imageName);
    targets.push({
      imageName,
      title: String(title),
      postDate: postDate || "",
    });
  };

  const postFiles = await fs.readdir(POSTS_DIR);
  for (const file of postFiles) {
    if (!file.endsWith(".md")) {
      continue;
    }

    const raw = await fs.readFile(path.join(POSTS_DIR, file), "utf8");
    const { data } = matter(raw);
    if (data.draft === true || data.excludeFromSitemap) {
      continue;
    }

    addTarget({
      slug: eleventyFileSlug(file),
      title: data.title,
      postDate: formatDateFull(data.date || dateFromFilename(file)),
    });
  }

  const contentFiles = await fs.readdir(CONTENT_DIR);
  for (const file of contentFiles) {
    if (!/\.(md|njk)$/i.test(file)) {
      continue;
    }

    const raw = await fs.readFile(path.join(CONTENT_DIR, file), "utf8");
    const { data } = matter(raw);
    if (data.excludeFromSitemap || !data.title) {
      continue;
    }

    addTarget({
      slug: eleventyFileSlug(file),
      title: data.title,
      postDate: formatDateFull(data.date),
    });
  }

  return targets;
}

async function mapPool(items, concurrency, worker) {
  let index = 0;

  async function run() {
    while (index < items.length) {
      const current = index;
      index += 1;
      await worker(items[current], current);
    }
  }

  const runners = Array.from(
    { length: Math.min(concurrency, items.length) },
    () => run(),
  );
  await Promise.all(runners);
}

/**
 * Generate missing OG preview JPEGs into the build cache (skips existing files).
 */
export default async function generateAllSocialImages({
  outputDir = SOCIAL_PREVIEW_CACHE_DIR,
  watermark = WATERMARK,
  siteName = SITE_NAME,
  concurrency = DEFAULT_CONCURRENCY,
} = {}) {
  await fs.mkdir(outputDir, { recursive: true });

  const targets = await collectTargets();
  let generated = 0;
  let skipped = 0;

  await mapPool(targets, concurrency, async (target) => {
    const result = await generateSocialImage(
      target.imageName,
      target.title,
      target.postDate,
      siteName,
      outputDir,
      watermark,
    );

    if (result?.alreadyExists) {
      skipped += 1;
    } else {
      generated += 1;
    }
  });

  return { total: targets.length, generated, skipped };
}
