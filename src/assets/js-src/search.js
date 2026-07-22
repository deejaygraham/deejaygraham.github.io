import { registerServiceWorker } from "./register-service-worker.js";
import { registerThemeSwitch } from "./theme-switcher.js";
import { loadSearchIndex } from "./search-site.js";

const runWhenDocumentReady = (callback) => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback, { once: true });
    return;
  }

  callback();
};

runWhenDocumentReady(() => {
  registerServiceWorker();
  registerThemeSwitch();
  loadSearchIndex();
});
