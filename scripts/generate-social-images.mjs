import generateAllSocialImages from "./lib/generateAllSocialImages.js";

const { total, generated, skipped } = await generateAllSocialImages();
console.log(
  `Social previews: ${total} targets, ${generated} generated, ${skipped} cached`,
);
