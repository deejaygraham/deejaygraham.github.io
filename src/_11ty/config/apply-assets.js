export default function applyAssets(eleventyConfig) {
  eleventyConfig.ignores.add("src/assets/**/*");
  eleventyConfig.watchIgnores.add("src/assets/**/*");

  eleventyConfig.addPassthroughCopy({ "./src/assets/js/*.js": "/js" });
  eleventyConfig.addPassthroughCopy({ "./src/_includes/code/p5js/*.js": "/js" });

  eleventyConfig.addPassthroughCopy({
    "./src/assets/img/posts/sketchnoting-challenge/*.*": "/img/posts/sketchnoting-challenge/",
  });
  eleventyConfig.addPassthroughCopy({
    "./src/assets/img/posts/sketchnoting-at-dddnorth-2015/*.*": "/img/posts/sketchnoting-at-dddnorth-2015/",
  });
  eleventyConfig.addPassthroughCopy({
    "./src/assets/img/posts/sketchnotes-from-ace-2014/*.*": "/img/posts/sketchnotes-from-ace-2014/",
  });
  eleventyConfig.addPassthroughCopy({
    "./src/assets/img/heroes/makers-and-creators.jpg": "/img/heroes/makers-and-creators.jpg",
  });
  eleventyConfig.addPassthroughCopy({ "./src/assets/img/avatar.svg": "/img/avatar.svg" });
  eleventyConfig.addPassthroughCopy({ "./src/assets/img/favicon.png": "/img/favicon.png" });
  eleventyConfig.addPassthroughCopy({ "./src/assets/fonts/": "/fonts" });

  eleventyConfig.addPassthroughCopy({ "./src/content/*.txt": "/" });
  eleventyConfig.addPassthroughCopy({ "./src/content/google*.html": "/" });
  eleventyConfig.addPassthroughCopy({ "./src/content/qrcode.html": "/qrcode.html" });
  eleventyConfig.addPassthroughCopy({ "./src/_generated/sw.js": "/sw.js" });

  eleventyConfig.addPassthroughCopy({
    "./src/assets/css/prism.css": "/css/prism.css",
  });
  eleventyConfig.addPassthroughCopy({
    "./src/_generated/css/tailwind.css": "/css/site.css",
  });
  eleventyConfig.addPassthroughCopy({ "./src/assets/downloads/*.zip": "/downloads" });
  eleventyConfig.addPassthroughCopy({ "./src/assets/downloads/*.pdf": "/downloads" });
}
