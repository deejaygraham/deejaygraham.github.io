export const tagAliases = new Map([
  ["mac-os", "macos"],
]);

export const allowedTags = new Set([
  "11ty",
  "agile",
  "architecture",
  "automation",
  "azure",
  "books",
  "build",
  "ci",
  "cloud",
  "code",
  "cpp",
  "csharp",
  "cynefin",
  "cypress",
  "dddnorth",
  "debugging",
  "deliberate-practice",
  "elementary-os",
  "engineering",
  "git",
  "github",
  "graphics",
  "gtd",
  "illustration",
  "javascript",
  "kata",
  "lean",
  "linux",
  "macos",
  "management",
  "mermaid",
  "meta",
  "microbit",
  "minecraft",
  "midi",
  "mono",
  "msbuild",
  "music",
  "naming",
  "ndifference",
  "oo",
  "open-source",
  "optimism",
  "p5",
  "pi",
  "playground",
  "poetry",
  "politics",
  "posts",
  "powershell",
  "pragprog",
  "presentations",
  "processing",
  "psychology",
  "python",
  "quote",
  "raspberry-pi",
  "refactoring",
  "ruby",
  "scratch",
  "shakespeare",
  "signs",
  "sketchnotes",
  "software",
  "solid",
  "spooky",
  "stationery",
  "toc",
  "tdd",
  "tfs",
  "video",
  "wodehouse", 
  "wtc",
  "xp",
]);

export const normalizeTag = (tag) => {
  if (typeof tag !== "string") {
    return "";
  }

  const normalized = tag.trim().toLowerCase();
  return tagAliases.get(normalized) || normalized;
};

export const normalizeTags = (tags) => {
  const values = Array.isArray(tags) ? tags : typeof tags === "string" ? [tags] : [];

  const seen = new Set();
  const normalizedTags = [];
  for (const tag of values) {
    const normalized = normalizeTag(tag);
    if (!normalized || seen.has(normalized)) {
      continue;
    }

    seen.add(normalized);
    normalizedTags.push(normalized);
  }

  return normalizedTags;
};
