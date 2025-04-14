// use shiki https://shiki.style as the syntax highlighter 
export default function(eleventyConfig) {
  // empty call to notify 11ty that we use this feature
  eleventyConfig.amendLibrary('md', () => {});

  eleventyConfig.on('eleventy.before', async () => {
    const shiki = await import('shiki');

    const darkThemeName = 'github-dark-high-contrast';
    const lightThemeName = 'github-light-high-contrast';
    
    const highlighter = await shiki.createHighlighter({
      // themes from https://textmate-grammars-themes.netlify.app/
      themes: [
        // 'vitesse-dark', 
        darkThemeName, 
        lightThemeName,
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
            theme: darkThemeName,
            /*themes: { 
              light: lightThemeName,
              dark: darkThemeName,
            }*/
          });
        }
      });
    });
  });
};
