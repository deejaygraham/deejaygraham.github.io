import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { DateTime } from "luxon";
import site from "../../../src/_data/site.js";
import generateSocialImage, { OG_LAYOUT_VERSION } from "./generateSocialImage.js";
import slugify from "./slugify.js";
import {
  SOCIAL_PREVIEW_CACHE_DIR,
  SOCIAL_PREVIEW_DEFAULT_SLUG,
} from "./paths.js";

const AVATAR = "./src/assets/img/favicon.png";
const POSTS_DIR = "src/content/posts";
const DEFAULT_CONCURRENCY = 8;
const LAYOUT_VERSION_FILE = ".layout-version";

/** Always brand OG images with the public host, even during local serve. */
function siteDisplayUrl() {
  try {
    return new URL("https://deejaygraham.github.io").host;
  } catch {
    return "deejaygraham.github.io";
  }
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

async function ensureLayoutVersion(outputDir) {
  const versionPath = path.join(outputDir, LAYOUT_VERSION_FILE);
  let current = "";
  try {
    current = await fs.readFile(versionPath, "utf8");
  } catch {
    current = "";
  }

  if (current.trim() === OG_LAYOUT_VERSION) {
    return;
  }

  const entries = await fs.readdir(outputDir).catch(() => []);
  await Promise.all(
    entries
      .filter((name) => name.endsWith(".jpg") || name.endsWith(".svg"))
      .map((name) => fs.unlink(path.join(outputDir, name)).catch(() => {})),
  );
  await fs.writeFile(versionPath, `${OG_LAYOUT_VERSION}\n`, "utf8");
}

async function collectTargets() {
  const targets = [];
  const seen = new Set();
  const siteUrl = siteDisplayUrl();

  const addTarget = ({ slug, title, postDate, variant }) => {
    if (!title) {
      return;
    }

    const imageName = slugify(slug);
    if (!imageName || seen.has(imageName)) {
      return;
    }

    seen.add(imageName);
    targets.push({
      imageName,
      title: String(title),
      postDate: postDate || "",
      variant,
      siteUrl,
    });
  };

  addTarget({
    slug: SOCIAL_PREVIEW_DEFAULT_SLUG,
    title: site.title,
    postDate: "",
    variant: "default",
  });

  const postFiles = await fs.readdir(POSTS_DIR);
  for (const file of postFiles) {
    if (!file.endsWith(".md")) {
      continue;
    }

    const raw = await fs.readFile(path.join(POSTS_DIR, file), "utf8");
    const { data } = matter(raw);
    if (data.draft === true || data.excludeFromSitemap || !data.title) {
      continue;
    }

    addTarget({
      slug: data.title,
      title: data.title,
      postDate: formatDateFull(data.date || dateFromFilename(file)),
      variant: "post",
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
  avatarPath = AVATAR,
  concurrency = DEFAULT_CONCURRENCY,
} = {}) {
  await fs.mkdir(outputDir, { recursive: true });
  await ensureLayoutVersion(outputDir);

  const targets = await collectTargets();
  let generated = 0;
  let skipped = 0;

  await mapPool(targets, concurrency, async (target) => {
    const result = await generateSocialImage(
      target.imageName,
      target.title,
      target.postDate,
      target.siteUrl,
      outputDir,
      avatarPath,
      { variant: target.variant },
    );

    if (result?.alreadyExists) {
      skipped += 1;
    } else {
      generated += 1;
    }
  });

  return { total: targets.length, generated, skipped };
}
