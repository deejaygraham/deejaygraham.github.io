// The following code is based off a toggle menu by @Bradcomp
// source: https://gist.github.com/Bradcomp/a9ef2ef322a8e8017443b626208999c1
const addBulmaBurgerMenu = () => {
    var burger = document.querySelector('.navbar-burger');
    var menu = document.querySelector('#' + burger.dataset.target);
    burger.addEventListener('click', function () {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });
};


const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
      });
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

const addCopyButtonToSourceCode = () => {
    
  const snippets = document.querySelectorAll('pre[class*="language"]');

  const buttonClasses = [
    'button',
    'is-pulled-right',
  ];

  const copyGraphicSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';

  snippets.forEach((snippet) => {
    const button = document.createElement('button');
    button.classList.add(...buttonClasses);
    button.innerHTML = copyGraphicSvg;
    button.addEventListener('click', () => {
      navigator.clipboard.writeText(snippet.textContent);
    });

    snippet.insertBefore(button, snippet.firstChild);
    //snippet.appendChild(button);
  });
};

registerServiceWorker();
addBulmaBurgerMenu();
addCopyButtonToSourceCode();
