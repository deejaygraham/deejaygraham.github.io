import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import postcss from "postcss";

const root = process.cwd();
const cssRoot = path.join(root, "src", "assets", "css");
const sourceRoot = path.join(root, "src");
const cssLayers = ["blocks", "compositions", "utilities"];

const getFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? getFiles(entryPath) : entryPath;
    }),
  );

  return files.flat();
};

const relative = (file) => path.relative(root, file).replaceAll("\\", "/");
const violations = [];
const declaredClasses = new Map();

for (const layer of cssLayers) {
  const directory = path.join(cssRoot, layer);
  const files = (await getFiles(directory)).filter((file) =>
    file.endsWith(".css"),
  );

  for (const file of files) {
    const css = await readFile(file, "utf8");
    const parsed = postcss.parse(css, { from: file });

    parsed.walkRules((rule) => {
      if (/#[a-zA-Z_][\w-]*/.test(rule.selector)) {
        violations.push(
          `${relative(file)} uses an ID selector: ${rule.selector}`,
        );
      }

      for (const match of rule.selector.matchAll(
        /\.(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)/g,
      )) {
        const filesForClass = declaredClasses.get(match[1]) ?? new Set();
        filesForClass.add(relative(file));
        declaredClasses.set(match[1], filesForClass);
      }
    });
  }
}

const sourceFiles = (await getFiles(sourceRoot)).filter(
  (file) =>
    !file.startsWith(cssRoot) &&
    !file.includes(`${path.sep}_generated${path.sep}`) &&
    /\.(html|js|md|njk)$/.test(file),
);
const sourceText = (
  await Promise.all(sourceFiles.map((file) => readFile(file, "utf8")))
).join("\n");

for (const [className, files] of declaredClasses) {
  const escapedClassName = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const classPattern = new RegExp(
    `(^|[^a-zA-Z0-9_-])${escapedClassName}([^a-zA-Z0-9_-]|$)`,
  );
  if (!classPattern.test(sourceText)) {
    violations.push(
      `${[...files].join(", ")} declares unused class .${className}`,
    );
  }
}

for (const file of sourceFiles.filter((file) => file.endsWith(".njk"))) {
  const template = await readFile(file, "utf8");
  if (/\sstyle\s*=/.test(template)) {
    violations.push(`${relative(file)} contains an inline style attribute`);
  }
}

const javascriptFiles = sourceFiles.filter((file) =>
  file.includes(`${path.sep}assets${path.sep}js-src${path.sep}`),
);
for (const file of javascriptFiles) {
  const javascript = await readFile(file, "utf8");
  if (/\.style\.[a-zA-Z]/.test(javascript)) {
    violations.push(
      `${relative(file)} assigns presentation through element.style`,
    );
  }
}

if (violations.length > 0) {
  console.error(violations.join("\n"));
  process.exitCode = 1;
} else {
  console.log("CSS architecture checks passed.");
}
