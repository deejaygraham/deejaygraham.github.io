// collections
const posts = require("./src/_11ty/collections/posts.js");

module.exports = function (eleventyConfig) {
    
  // collections
  eleventyConfig.addCollection("posts", posts;

  // ignores
  eleventyConfig.ignores.add("src/assets/**/*");
  eleventyConfig.watchIgnores.add("src/assets/**/*");

  // passthrough copy
  eleventyConfig.addPassthroughCopy("./src/assets/img/");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts/");
    
return {
    dir: {
      input: "src/content",
      output: '_site'
    },
    templateFormats: ["md", "njk", "html", ],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    html: true
  };
};
