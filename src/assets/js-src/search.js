import { addBulmaBurgerMenu } from "../../_includes/scripts/bulma-burger.js";
import { registerServiceWorker } from "../../_includes/scripts/register-service-worker.js";
import { registerThemeSwitch } from "../../_includes/scripts/theme-switcher.js";
import { loadSearchIndex } from "../../_includes/scripts/search-site.js";

const runWhenDocumentReady = (callback) => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback, { once: true });
    return;
  }

  callback();
};

runWhenDocumentReady(() => {
  registerServiceWorker();
  addBulmaBurgerMenu();
  registerThemeSwitch();
  loadSearchIndex();
});
