/* eslint-disable-next-line */
const addCopyButtonToSourceCode = () => {
  const snippets = document.querySelectorAll('pre[class*="language"]');
  const buttonClasses = [
    'button',
    'is-pulled-right',
  ];

  const copyGraphicSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
  const buttonText = 'copy code';
  
  snippets.forEach((snippet, index) => {
    const button = document.createElement('button');
    button.classList.add(...buttonClasses);
    button.setAttribute('data-testid', `copy_button_${index}`);
    button.innerHTML = copyGraphicSvg + buttonText;
    button.addEventListener('click', () => {
      navigator.clipboard.writeText(snippet.textContent);
    });

    snippet.insertBefore(button, snippet.firstChild);
  });
};
