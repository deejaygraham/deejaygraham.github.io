// collections
const posts = require("./src/_11ty/collections/posts.js");

// filters
const dates = require("./src/_11ty/filters/dates.js");
const searchFilter = require("./src/_11ty/filters/searchFilter");

module.exports = function (eleventyConfig) {
    
  // collections
  eleventyConfig.addCollection("posts", posts);

  // filters
  eleventyConfig.addFilter("limit", require("./src/_11ty/filters/limit.js"));
  eleventyConfig.addFilter("dateISO", dates.dateISO);
  eleventyConfig.addFilter("dateFeed", dates.dateFeed);
  eleventyConfig.addFilter("dateFull", dates.dateFull);
  eleventyConfig.addFilter("dateFormat", dates.dateFormat);
  eleventyConfig.addFilter("dateYear", dates.dateYear);
  eleventyConfig.addFilter("search", require("./src/_11ty/filters/searchFilter"));

  // Return all the tags used in a collection
  eleventyConfig.addFilter("getAllTags", collection => {
    let tagSet = new Set();
    for(let item of collection) {
     (item.data.tags || []).forEach(tag => tagSet.add(tag));
    }
    return Array.from(tagSet).sort();
  });

  eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
    return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
  });

  // plugins
  // eleventyConfig.on('eleventy.after', require("./src/_11ty/plugins/search-index-generator"));
    
  // ignores
  eleventyConfig.ignores.add("src/assets/**/*");
  eleventyConfig.watchIgnores.add("src/assets/**/*");

  // passthrough copy
  
  eleventyConfig.addPassthroughCopy({ "./src/assets/js/*.js": "/js" });
  eleventyConfig.addPassthroughCopy({ "./node_modules/elasticlunr/elasticlunr.min.js": "/js"});
  eleventyConfig.addPassthroughCopy({ "./src/assets/img/": "/img" });
  eleventyConfig.addPassthroughCopy({ "./src/assets/fonts/": "/fonts" });
  eleventyConfig.addPassthroughCopy({ "./src/content/*.txt": "/" });
  
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
