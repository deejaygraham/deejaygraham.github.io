// collections
const posts = require("./src/_11ty/collections/posts.js");

// filters
const dates = require("./src/_11ty/filters/dates.js");

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

  // exclude a page from a collection so that we don't have self-referential data.
  // must be a nunjucks filter to allow use of default page url.
  eleventyConfig.addNunjucksFilter("excludeFromCollection", function(collection = [], pageUrl = this.ctx.page.url) {
      return collection.filter(post => post.url !== pageUrl);
  });

  eleventyConfig.addFilter("filterByTags", function(collection = [], ...requiredTags) {
      const flatTags = requiredTags.flat();
      return collection.filter(post => {
          return flatTags.every(tag => post.data.tags.includes(tag));
      });
  });
    
  // ignores
  eleventyConfig.ignores.add("src/assets/**/*");
  eleventyConfig.watchIgnores.add("src/assets/**/*");

  // passthrough copy
  
  eleventyConfig.addPassthroughCopy({ "./src/assets/js/*.js": "/js" });
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
