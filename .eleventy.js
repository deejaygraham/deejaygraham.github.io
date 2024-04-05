
return {
    dir: {
      input: "src/content",
      output: '_site'
    },
    templateFormats: ["md", "njk", "html", ],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    html: true
  };
