import generateAllSocialImages from "../src/_11ty/plugins/generate-social-images/generateAllSocialImages.js";

const { total, generated, skipped } = await generateAllSocialImages();
console.log(
  `Social previews: ${total} targets, ${generated} generated, ${skipped} cached`,
);
