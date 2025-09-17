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
import excludePost from "./src/_11ty/filters/excludePost.js";
import readingTime from "./src/_11ty/filters/readingTime.js";
import wordCount from "./src/_11ty/filters/wordCount.js";
import safeDump from "./src/11ty/filters/safeDump.js";

// shortcodes
import randomColour from "./src/_11ty/shortcodes/randomcolour.js";
import youtube from "./src/_11ty/shortcodes/youtube.js";
import vimeo from "./src/_11ty/shortcodes/vimeo.js";
import poison from "./src/_11ty/shortcodes/poison-ai.js";
import mermaid from "./src/_11ty/shortcodes/mermaid-diagram.js";
import microbit from "./src/_11ty/shortcodes/microbit-diagram.js";
import externalLink from "./src/_11ty/shortcodes/external-link.js";

// plugins
import { IdAttributePlugin } from "@11ty/eleventy";
import syntaxHighlighter from "./src/_11ty/plugins/shiki-syntax-highlighter/index.js";
import socialImages from "./src/_11ty/plugins/generate-social-images/index.js";
import favicons from "eleventy-plugin-gen-favicons";
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import { InputPathToUrlTransformPlugin } from "@11ty/eleventy";

// transforms
import * as prettier from "prettier";

// linters
import pageContentLinter from "./src/_11ty/linters/page-content/index.js";

export default function (eleventyConfig) {
  eleventyConfig.setQuietMode(true);
	
  // plugins
  eleventyConfig.addPlugin(syntaxHighlighter);
  eleventyConfig.addPlugin(IdAttributePlugin);   
  eleventyConfig.addPlugin(socialImages, 
    { 
      siteName: 'd.j. graham' 
    });
  eleventyConfig.addPlugin(favicons);
  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: 'html',
    formats: ['jpg', 'png', 'webp'],
    // optional, output image widths
    // widths: ['auto', 400, 800],
    defaultAttributes: {
        loading: 'lazy',
        // sizes: '100vw',
        decoding: 'async',
    },
  });
  
  // collections
  eleventyConfig.addCollection("posts", posts);

  // filters
  // debug use in template {{ post.data | debugger }}
  eleventyConfig.addFilter("debugger", (...args) => {
    console.log(...args)
    debugger;
  });
	
  eleventyConfig.addFilter("limit", limit);
  eleventyConfig.addFilter("excerpt", excerpt);
  eleventyConfig.addFilter("firstItem", firstItem);
  eleventyConfig.addFilter("randomItem", randomItem);
  eleventyConfig.addFilter("dateISO", dates.dateISO);
  eleventyConfig.addFilter("dateFeed", dates.dateRFC2822);
  eleventyConfig.addFilter("dateFull", dates.dateFull);
  eleventyConfig.addFilter("dateFormat", dates.dateFormat);
  eleventyConfig.addFilter("dateYear", dates.dateYear);
  eleventyConfig.addFilter("search", searchFilter);
  eleventyConfig.addFilter("arrayToCommaString", arrayToCommaString);
  eleventyConfig.addFilter("getAllTags", getAllTags);
  eleventyConfig.addFilter("filterTagList", filterTagList);
  eleventyConfig.addFilter("excludePost", excludePost);
  eleventyConfig.addFilter("readingTime", readingTime);
  eleventyConfig.addFilter("wordCount", wordCount);
  eleventyConfig.addFilter("safedump", safeDump);
	
  // shortcodes
  eleventyConfig.addShortcode("randomcolour", randomColour);
  eleventyConfig.addShortcode("youtube", youtube);
  eleventyConfig.addShortcode("vimeo", vimeo);
  eleventyConfig.addShortcode("poison", poison);
  eleventyConfig.addPairedShortcode("mermaid", mermaid);
  eleventyConfig.addShortcode("microbit", microbit);
  eleventyConfig.addShortcode("externalLink", externalLink);
	
  // ignores
  eleventyConfig.ignores.add("src/assets/**/*");
  eleventyConfig.watchIgnores.add("src/assets/**/*");

  // passthrough copy

  eleventyConfig.addPassthroughCopy({ "./src/assets/js/*.js": "/js" });
	
  // don't copy all images from img folder - 11ty will generate it's own using img plugin
  //eleventyConfig.addPassthroughCopy({ "./src/assets/img/": "/img" });
  // specific images linked from external sites
  eleventyConfig.addPassthroughCopy({ "./src/assets/img/posts/sketchnoting-challenge/*.*": "/img/posts/sketchnoting-challenge/" });
  eleventyConfig.addPassthroughCopy({ "./src/assets/img/posts/sketchnoting-at-dddnorth-2015/*.*": "/img/posts/sketchnoting-at-dddnorth-2015/" });
  eleventyConfig.addPassthroughCopy({ "./src/assets/img/posts/sketchnotes-from-ace-2014/*.*": "/img/posts/sketchnotes-from-ace-2014/" });
  // about page image
  eleventyConfig.addPassthroughCopy({ "./src/assets/img/heroes/makers-and-creators.jpg": "/img/heroes/makers-and-creators.jpg" });
  // avatars
  eleventyConfig.addPassthroughCopy({ "./src/assets/img/avatar.svg": "/img/avatar.svg" });
  eleventyConfig.addPassthroughCopy({ "./src/assets/img/favicon.png": "/img/favicon.png" });
	
  //eleventyConfig.addPassthroughCopy({ "./src/assets/img/favicon.ico": "/favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "./src/assets/fonts/": "/fonts" });
  eleventyConfig.addPassthroughCopy({ "./src/content/*.txt": "/" });
  eleventyConfig.addPassthroughCopy({ "./src/content/google*.html": "/" });
  eleventyConfig.addPassthroughCopy({ "./src/content/sw.js": "/" });
  eleventyConfig.addPassthroughCopy({
    "./src/assets/css/prism.css": "/css/prism.css",
  });
  eleventyConfig.addPassthroughCopy({ "./src/assets/downloads/*.zip": "/downloads" });
  eleventyConfig.addPassthroughCopy({ "./src/assets/downloads/*.pdf": "/downloads" });
	
  // preprocessing

  // drafts are excluded from full builds
  eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});

  // post-processing 

  // lint html output
  eleventyConfig.addLinter('page-content', pageContentLinter);
	
  eleventyConfig.addTransform("prettier", async function (content) {
	  if ((this.page.outputPath || "").endsWith(".html")) {
     	const prettified = await prettier.format(content, {
        bracketSameLine: true,
        printWidth: 250,
        parser: "html",
        tabWidth: 2
      });
        
      return prettified;
    }

    // If not an HTML output, return content as-is
    return content;
  });
	
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
