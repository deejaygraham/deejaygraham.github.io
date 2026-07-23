import { IdAttributePlugin, InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import favicons from "eleventy-plugin-gen-favicons";

import syntaxHighlighter from "../plugins/shiki-syntax-highlighter/index.js";

export default function applyPlugins(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlighter);
  eleventyConfig.addPlugin(IdAttributePlugin);
  eleventyConfig.addPlugin(favicons);
  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: "html",
    formats: ["jpg", "webp"],
    widths: [320, 640, 960, 1280],
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
      sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px",
    },
  });
}
