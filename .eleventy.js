// collections
import posts from "./src/_11ty/collections/posts.js"

// filters
import dates from "./src/_11ty/filters/dates"
import limit from "./src/_11ty/filters/limit"
import excerpt from "./src/_11ty/filters/excerpt"
import firstItem from "./src/_11ty/filters/first"
import randomItem from "./src/_11ty/filters/random"
import searchFilter from "./src/_11ty/filters/searchFilter"
import arrayToCommaString from "./src/_11ty/filters/arrayToCommaString"
import getAllTags from "./src/_11ty/filters/getAllTags"
import filterTagList from "./src/_11ty/filters/filterTagList"
import splitLines from "./src/_11ty/filters/splitLines"  
import excludePost from "./src/_11ty/filters/excludePost"
import readingTime from "./src/_11ty/filters/readingTime"

// shortcodes
import randomColour from "./src/_11ty/shortcodes/randomcolour"
import youtube from "./src/_11ty/shortcodes/youtube"
import vimeo from "./src/_11ty/shortcodes/vimeo"

// plugins
import syntaxHighlighter from "@11ty/eleventy-plugin-syntaxhighlight"

export default function (eleventyConfig) {

  eleventyConfig.setQuietMode(true);
  
  // plugins
  eleventyConfig.addPlugin(syntaxHighlighter);
  // eleventyConfig.on('eleventy.after', require("./src/_11ty/plugins/generate-socials"));
  
  // collections
  eleventyConfig.addCollection("posts", posts);

  // filters
  eleventyConfig.addFilter("limit", limit);
  eleventyConfig.addFilter("excerpt", excerpt);
  eleventyConfig.addFilter("firstItem", firstItem);
  eleventyConfig.addFilter("randomItem", randomItem);
  eleventyConfig.addFilter("dateISO", dates.dateISO);
  eleventyConfig.addFilter("dateFeed", dates.dateFeed);
  eleventyConfig.addFilter("dateFull", dates.dateFull);
  eleventyConfig.addFilter("dateFormat", dates.dateFormat);
  eleventyConfig.addFilter("dateYear", dates.dateYear);
  eleventyConfig.addFilter("search", searchFilter);
  eleventyConfig.addFilter("arrayToCommaString", arrayToCommaString);
  eleventyConfig.addFilter("getAllTags", getAllTags);
  eleventyConfig.addFilter("filterTagList", filterTagList);
  eleventyConfig.addFilter("splitlines", splitLines);
  eleventyConfig.addFilter("excludePost", excludePost);
  eleventyConfig.addFilter("readingTime", readingTime);
  
  // shortcodes
  eleventyConfig.addShortcode("randomcolour", randomColour);
  eleventyConfig.addShortcode("youtube", youtube);
  eleventyConfig.addShortcode("vimeo", vimeo);
  
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
