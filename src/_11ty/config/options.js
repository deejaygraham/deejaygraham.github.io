export default {
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
