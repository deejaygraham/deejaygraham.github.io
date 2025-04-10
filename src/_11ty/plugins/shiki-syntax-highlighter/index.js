import { createHighlighter } from 'shiki'

// use shiki https://shiki.style as the syntax highlighter 
export default function(eleventyConfig, options) {
  // empty call to notify 11ty that we use this feature
  // eslint-disable-next-line no-empty-function
  eleventyConfig.amendLibrary('md', () => {});

  eleventyConfig.on('eleventy.before', async () => {
    const highlighter = await createHighlighter(options);
    
    eleventyConfig.amendLibrary('md', (library) => {
      library.set({
        highlight: (code, language) => {
          return highlighter.codeToHtml(code, { 
              lang: language,
              theme: options.theme
            });
      });
    });
  });
};
