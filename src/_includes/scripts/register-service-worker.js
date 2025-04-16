/* eslint-disable-next-line */
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
        });
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    });
  }
};
