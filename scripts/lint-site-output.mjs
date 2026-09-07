import path from "path";
import { validateSiteOutput } from "./lib/site-output-validation.js";

const siteDir = path.resolve(process.argv[2] || "_site");
const result = validateSiteOutput(siteDir);

if (result.issues.length > 0) {
  console.error("Site output validation failed:");
  for (const issue of result.issues) {
    console.error(`  - ${issue}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `Site output ok: ${result.checkedFiles.length} required files, ` +
      `${result.htmlCount} HTML files, ${result.socialPreviewCount} social preview references`,
  );
}
