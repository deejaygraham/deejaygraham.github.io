// collections
const posts = require("./src/_11ty/collections/posts.js");

module.exports = function (eleventyConfig) {
    
  // collections
  eleventyConfig.addCollection("posts", posts);

  // ignores
  eleventyConfig.ignores.add("src/assets/**/*");
  eleventyConfig.watchIgnores.add("src/assets/**/*");

  // passthrough copy
  eleventyConfig.addPassthroughCopy({ "./src/assets/img/": "/img" });
  eleventyConfig.addPassthroughCopy({ "./src/assets/fonts/": "/fonts" });
  eleventyConfig.addPassthroughCopy({ "./src/content/*.txt": "/" });
    
return {
    dir: {
      input: "src/content",
      layouts: '../_includes/layouts'
    },
    templateFormats: ["md", "njk", "html", ],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    html: true
  };
};
