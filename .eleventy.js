// collections
import posts from "./src/_11ty/collections/posts.js";

// filters
import dates from "./src/_11ty/filters/dates.js";
import limit from "./src/_11ty/filters/limit.js";
import excerpt from "./src/_11ty/filters/excerpt.js";
import firstItem from "./src/_11ty/filters/first.js";
import randomItem from "./src/_11ty/filters/random.js";
import searchFilter from "./src/_11ty/filters/searchFilter.js";
import arrayToCommaString from "./src/_11ty/filters/arrayToCommaString.js";
import getAllTags from "./src/_11ty/filters/getAllTags.js";
import filterTagList from "./src/_11ty/filters/filterTagList.js";
import splitLines from "./src/_11ty/filters/splitLines.js";
import excludePost from "./src/_11ty/filters/excludePost.js";
import readingTime from "./src/_11ty/filters/readingTime.js";

// shortcodes
import randomColour from "./src/_11ty/shortcodes/randomcolour.js";
import youtube from "./src/_11ty/shortcodes/youtube.js";
import vimeo from "./src/_11ty/shortcodes/vimeo.js";

// plugins
import syntaxHighlighter from "@11ty/eleventy-plugin-syntaxhighlight";
import socialImages from "@11tyrocks/eleventy-plugin-social-images";
import favicons from "eleventy-plugin-gen-favicons";

export default function (eleventyConfig) {
  eleventyConfig.setQuietMode(true);

  // plugins
  eleventyConfig.addPlugin(syntaxHighlighter);
  // eleventyConfig.on('eleventy.after', require("./src/_11ty/plugins/generate-socials"));
  eleventyConfig.addPlugin(socialImages);
  eleventyConfig.addPlugin(favicons);

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
  //eleventyConfig.addPassthroughCopy({ "./src/assets/img/favicon.ico": "/favicon.ico" });
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
}
