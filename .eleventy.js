// collections
const posts = require("./src/_11ty/collections/posts.js");

// filters
const dates = require("./src/_11ty/filters/dates.js");

module.exports = function (eleventyConfig) {

  eleventyConfig.setQuietMode(true);
  
  // plugins
  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"));
  eleventyConfig.on('eleventy.after', require("./src/_11ty/plugins/generate-socials"));
  
  // collections
  eleventyConfig.addCollection("posts", posts);

  // filters
  eleventyConfig.addFilter("limit", require("./src/_11ty/filters/limit.js"));
  eleventyConfig.addFilter(
    "excerpt",
    require("./src/_11ty/filters/excerpt.js"),
  );
  eleventyConfig.addFilter(
    "firstItem",
    require("./src/_11ty/filters/first.js"),
  );
  eleventyConfig.addFilter(
    "randomItem",
    require("./src/_11ty/filters/random.js"),
  );
  eleventyConfig.addFilter("dateISO", dates.dateISO);
  eleventyConfig.addFilter("dateFeed", dates.dateFeed);
  eleventyConfig.addFilter("dateFull", dates.dateFull);
  eleventyConfig.addFilter("dateFormat", dates.dateFormat);
  eleventyConfig.addFilter("dateYear", dates.dateYear);
  eleventyConfig.addFilter(
    "search",
    require("./src/_11ty/filters/searchFilter.js"),
  );
  eleventyConfig.addFilter(
    "arrayToCommaString",
    require("./src/_11ty/filters/arrayToCommaString.js"),
  );
  eleventyConfig.addFilter(
    "getAllTags",
    require("./src/_11ty/filters/getAllTags.js"),
  );
  eleventyConfig.addFilter(
    "filterTagList",
    require("./src/_11ty/filters/filterTagList.js"),
  );
  eleventyConfig.addFilter(
    "splitlines",
     require("./src/_11ty/filters/splitLines.js"),
  );
  eleventyConfig.addFilter(
    "excludePost",
    require("./src/_11ty/filters/excludePost.js"),
  );
  
  // shortcodes
  eleventyConfig.addShortcode("randomcolour", require("./src/_11ty/shortcodes/randomcolour.js"));
  eleventyConfig.addShortcode("youtube", require("./src/_11ty/shortcodes/youtube.js"));
  eleventyConfig.addShortcode("vimeo", require("./src/_11ty/shortcodes/vimeo.js"));
  
  // ignores
  eleventyConfig.ignores.add("src/assets/**/*");
  eleventyConfig.watchIgnores.add("src/assets/**/*");

  // passthrough copy

  eleventyConfig.addPassthroughCopy({ "./src/assets/js/*.js": "/js" });
  eleventyConfig.addPassthroughCopy({ "./src/assets/img/": "/img" });
  eleventyConfig.addPassthroughCopy({ "./src/assets/img/favicon.ico": "/favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "./src/assets/fonts/": "/fonts" });
  eleventyConfig.addPassthroughCopy({ "./src/content/*.txt": "/" });
  eleventyConfig.addPassthroughCopy({ "./src/content/sw.js": "/" });
  eleventyConfig.addPassthroughCopy({
    "./src/assets/css/prism.css": "/css/prism.css",
  });
  eleventyConfig.addPassthroughCopy("./src/assets/downloads");
  
  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data",
    },

    templateFormats: ["md", "njk", "html", "liquid"],

    markdownTemplateEngine: "njk",

    htmlTemplateEngine: "njk",

    dataTemplateEngine: "njk",
  };
};
