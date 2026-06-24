import { IdAttributePlugin, InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import favicons from "eleventy-plugin-gen-favicons";

import syntaxHighlighter from "../plugins/shiki-syntax-highlighter/index.js";
import socialImages from "../plugins/generate-social-images/index.js";

export default function applyPlugins(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlighter);
  eleventyConfig.addPlugin(IdAttributePlugin);
  eleventyConfig.addPlugin(socialImages, { siteName: "d.j. graham" });
  eleventyConfig.addPlugin(favicons);
  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: "html",
    formats: ["jpg", "webp"],
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    },
  });
}
