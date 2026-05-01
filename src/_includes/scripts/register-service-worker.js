/* eslint-disable-next-line */
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/sw.js', {
          type: 'module',
          scope: '/',
      });
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};
