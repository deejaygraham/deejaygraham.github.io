// use shiki https://shiki.style as the syntax highlighter 
export default function(eleventyConfig, options) {
  // empty call to notify 11ty that we use this feature
  eleventyConfig.amendLibrary('md', () => {});

  eleventyConfig.on('eleventy.before', async () => {
    const shiki = await import('shiki');

    const highlighter = await shiki.createHighlighter({
      themes: [
        'vitesse-dark', 
        'github-dark-high-contrast', 
        'github-light-high-contrast',
      ],
      langs: [
        'bat',
        'cpp',
        'csharp',
        'elixir',
        'js',
        'json',
        'ruby',
        'powershell',
        'python',
        'rust',
        'sql',
        'vb',
        'xml',
      ],
    });
    
    eleventyConfig.amendLibrary('md', (library) => {
      library.set({
        highlight: (code, language) => {

          return highlighter.codeToHtml(code, {
            lang: language,
            theme: options.theme
          });
        }
      });
    });
  });
};
