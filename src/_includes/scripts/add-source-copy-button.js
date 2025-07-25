/* eslint-disable-next-line */
const addCopyButtonToSourceCode = () => {
  const snippets = document.querySelectorAll('pre[class*="shiki"]');
  const buttonClasses = [
    'button',
    'is-pulled-right',
    'copy-source-button',
  ];

  const copyGraphicSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
  const buttonText = 'copy';
  
  snippets.forEach((snippet, index) => {
    const button = document.createElement('button');
    button.classList.add(...buttonClasses);
    button.setAttribute('data-testid', `copy_button_${index}`);
    button.innerHTML = copyGraphicSvg + buttonText;
    button.addEventListener('click', () => {
      // skip over button and get content of <code> element
      navigator.clipboard.writeText(snippet.lastElementChild.textContent);

      button.innerHTML = copyGraphicSvg + 'copied';

      setTimeout(() => button.innerHTML = copyGraphicSvg + buttonText, 2000);
    });
    
    snippet.insertBefore(button, snippet.firstChild);
  });
};
