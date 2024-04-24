// collections
const posts = require("./src/_11ty/collections/posts.js");

// filters
const dates = require("./src/_11ty/filters/dates.js");

module.exports = function (eleventyConfig) {
    
  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"));

  // collections
  eleventyConfig.addCollection("posts", posts);

  // filters
  eleventyConfig.addFilter("limit", require("./src/_11ty/filters/limit.js"));
  eleventyConfig.addFilter("excerpt", require("./src/_11ty/filters/excerpt.js"));
  eleventyConfig.addFilter("firstItem", require("./src/_11ty/filters/first.js"));
  eleventyConfig.addFilter("randomItem", require("./src/_11ty/filters/random.js"));
  eleventyConfig.addFilter("dateISO", dates.dateISO);
  eleventyConfig.addFilter("dateFeed", dates.dateFeed);
  eleventyConfig.addFilter("dateFull", dates.dateFull);
  eleventyConfig.addFilter("dateFormat", dates.dateFormat);
  eleventyConfig.addFilter("dateYear", dates.dateYear);
  eleventyConfig.addFilter("search", require("./src/_11ty/filters/searchFilter.js"));
  eleventyConfig.addFilter("arrayToCommaString", require("./src/_11ty/filters/arrayToCommaString.js"));
    
  // Return all the tags used in a collection, including the 
  // 1tty tags. The list of tags is sorted into alphabetical order.
  eleventyConfig.addFilter("getAllTags", collection => {
    let tagSet = new Set();
    for(let item of collection) {
     (item.data.tags || []).forEach(tag => tagSet.add(tag));
    }
    return Array.from(tagSet).sort();
  });

  // filter a list of tags to remove 11ty in-built and retain the 
  // tags explicitly added to posts.
  eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
    return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
  });
  
  // ignores
  eleventyConfig.ignores.add("src/assets/**/*");
  eleventyConfig.watchIgnores.add("src/assets/**/*");

  // passthrough copy
  
  eleventyConfig.addPassthroughCopy({ "./src/assets/js/*.js": "/js" });
  eleventyConfig.addPassthroughCopy({ "./src/assets/img/": "/img" });
  eleventyConfig.addPassthroughCopy({ "./src/assets/fonts/": "/fonts" });
  eleventyConfig.addPassthroughCopy({ "./src/content/*.txt": "/" });
  eleventyConfig.addPassthroughCopy({ "./src/assets/css/prism.css": "/css/prism.css"});
  
return {
    
    dir: {
      input: "src",
      includes: '_includes',
      layouts: '_includes/layouts',
      data: '_data'
    },

    templateFormats: [
      "md", 
      "njk", 
      "html", 
      "liquid"
    ],

    markdownTemplateEngine: "njk",
    
    htmlTemplateEngine: "njk",
    
    dataTemplateEngine: "njk",
  };
}
