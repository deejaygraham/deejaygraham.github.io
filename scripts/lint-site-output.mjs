import { existsSync } from "fs";
import { exit } from "process";

const required = [
  "_site/js/site.js",
  "_site/js/search.js",
  "_site/css/site.css",
  "_site/sw.js",
];

const missing = required.filter((path) => !existsSync(path));

if (missing.length > 0) {
  console.error("Missing required site output:");
  for (const path of missing) {
    console.error(`  - ${path}`);
  }
  exit(1);
}

console.log("Site output assets ok:");
for (const path of required) {
  console.log(`  - ${path}`);
}
