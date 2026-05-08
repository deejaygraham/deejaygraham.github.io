// npm run new-post
// or
// npm run new-post -- code "My New Post" "python, cpp"
// or 
// node scripts/new-post.mjs --type code --title "My New Post" --tags "powershell, c#"


import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import readline from "readline/promises";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.join(__dirname, "..", "src", "content", "posts");

const templateFiles = {
  code: "1111-blog-code.template.md",
  quote: "1111-blog-quote.template.md",
  sketchnote: "1111-blog-sketchnote.template.md",
  video: "1111-blog-video.template.md",
};

const types = Object.keys(templateFiles);

const parseArgs = () => {
  const args = process.argv.slice(2);
  const parsed = {};
  const positional = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg.startsWith("--")) {
      positional.push(arg);
      continue;
    }

    const [rawKey, rawValue] = arg.slice(2).split("=", 2);
    const key = rawKey;
    if (rawValue !== undefined) {
      parsed[key] = rawValue;
      continue;
    }

    const next = args[i + 1];
    if (!next || next.startsWith("--")) {
      parsed[key] = true;
      continue;
    }

    parsed[key] = next;
    i++;
  }

  if (!parsed.type && positional[0]) {
    parsed.type = positional[0];
  }

  if (!parsed.title && positional[1]) {
    parsed.title = positional[1];
  }

  if (!parsed.tags && positional[2]) {
    parsed.tags = positional[2];
  }

  return parsed;
};

const todayDate = () => {
  const now = new Date();
  const year = `${now.getFullYear()}`;
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const slugify = (value) => {
  return `${value || ""}`
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

const splitTags = (raw) => {
  if (!raw) {
    return [];
  }

  return raw
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
};

const toTagLine = (tags) => `tags: [${tags.join(", ")}]`;

const replaceFrontmatterLine = (content, key, value) => {
  const pattern = new RegExp(`^${key}:\\s*.*$`, "m");
  if (pattern.test(content)) {
    return content.replace(pattern, `${key}: ${value}`);
  }

  const frontmatterClosePattern = /\n---/;
  return content.replace(frontmatterClosePattern, `\n${key}: ${value}\n---`);
};

const applyFrontmatter = ({ templateContent, title, tags }) => {
  let content = templateContent;
  content = replaceFrontmatterLine(content, "title", title);

  if (tags.length > 0) {
    content = replaceFrontmatterLine(content, "tags", `[${tags.join(", ")}]`);
  }

  if (!/^draft:\s*(true|false)\s*$/m.test(content)) {
    content = replaceFrontmatterLine(content, "draft", "true");
  }

  return content;
};

const updateTypeSpecificPlaceholders = ({ content, type, title, slug }) => {
  if (type === "sketchnote") {
    content = content.replace(
      /url:\s*["'][^"']*["']/,
      `url: "/assets/img/posts/${slug}/${slug}.jpg"`,
    );
    content = content.replace(/alt:\s*["'][^"']*["']/, `alt: "${title}"`);
    content = content.replace(/name:\s*["']title["']/, `name: "${title}"`);
  }

  if (type === "quote") {
    content = content.replace(/^attribution:\s*.*$/m, "attribution: Person");
    content = content.replace(/^publication:\s*.*$/m, "publication: Source");
  }

  return content;
};

const promptIfMissing = async (options) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const resolved = { ...options };

    if (!resolved.type) {
      const answer = await rl.question(`Post type (${types.join(", ")}): `);
      resolved.type = answer.trim().toLowerCase();
    }

    if (!resolved.title) {
      const answer = await rl.question("Post title: ");
      resolved.title = answer.trim();
    }

    if (!resolved.tags) {
      const answer = await rl.question("Tags (comma-separated, optional): ");
      resolved.tags = answer.trim();
    }

    return resolved;
  } finally {
    rl.close();
  }
};

const usage = () => {
  console.log("Usage:");
  console.log(
    "  npm run new-post -- --type <code|quote|sketchnote|video> --title \"My Post\" [--tags \"tag1, tag2\"] [--date YYYY-MM-DD] [--slug my-slug] [--dry-run]",
  );
};

const main = async () => {
  const args = parseArgs();
  if (args.help) {
    usage();
    return;
  }

  const options = await promptIfMissing(args);
  const type = `${options.type || ""}`.toLowerCase();

  if (!types.includes(type)) {
    console.error(`Unknown type "${options.type}". Expected one of: ${types.join(", ")}`);
    process.exit(1);
  }

  const title = `${options.title || ""}`.trim();
  if (!title) {
    console.error("A title is required.");
    process.exit(1);
  }

  const date = options.date || todayDate();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    console.error('Date must be in format "YYYY-MM-DD".');
    process.exit(1);
  }

  const slug = options.slug ? slugify(options.slug) : slugify(title);
  if (!slug) {
    console.error("Could not generate a valid slug. Provide --slug.");
    process.exit(1);
  }

  const filename = `${date}-${slug}.md`;
  const outputPath = path.join(postsDir, filename);
  if (existsSync(outputPath)) {
    console.error(`File already exists: ${outputPath}`);
    process.exit(1);
  }

  const templatePath = path.join(postsDir, templateFiles[type]);
  const templateContent = readFileSync(templatePath, "utf8");
  const tags = splitTags(options.tags);

  let output = applyFrontmatter({ templateContent, title, tags });
  output = updateTypeSpecificPlaceholders({
    content: output,
    type,
    title,
    slug,
  });

  if (options["dry-run"]) {
    console.log(`Would create: ${outputPath}`);
    console.log(`Type: ${type}`);
    console.log(`Title: ${title}`);
    if (tags.length > 0) {
      console.log(toTagLine(tags));
    }
    return;
  }

  writeFileSync(outputPath, output, "utf8");

  console.log(`Created new ${type} post: ${outputPath}`);
  console.log("Next steps:");
  console.log("  1) Edit content");
  console.log("  2) Set draft: false when ready");
  console.log("  3) Run npm run build");
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
