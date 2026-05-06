import dates from "../filters/dates.js";
import limit from "../filters/limit.js";
import excerpt from "../filters/excerpt.js";
import firstItem from "../filters/first.js";
import randomItem from "../filters/random.js";
import searchFilter from "../filters/searchFilter.js";
import arrayToCommaString from "../filters/arrayToCommaString.js";
import getAllTags from "../filters/getAllTags.js";
import filterTagList from "../filters/filterTagList.js";
import excludePost from "../filters/excludePost.js";
import readingTime from "../filters/readingTime.js";
import wordCount from "../filters/wordCount.js";

export default function applyFilters(eleventyConfig) {
  eleventyConfig.addFilter("debugger", (...args) => {
    console.log(...args);
    debugger;
  });

  eleventyConfig.addFilter("limit", limit);
  eleventyConfig.addFilter("excerpt", excerpt);
  eleventyConfig.addFilter("firstItem", firstItem);
  eleventyConfig.addFilter("randomItem", randomItem);
  eleventyConfig.addFilter("dateISO", dates.dateISO);
  eleventyConfig.addFilter("dateOnlyISO", dates.dateOnlyISO);
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
}
