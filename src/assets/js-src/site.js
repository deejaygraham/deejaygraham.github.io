import { registerServiceWorker } from "./register-service-worker.js";
import { registerThemeSwitch } from "./theme-switcher.js";
import { addCopyButtonToSourceCode } from "./add-source-copy-button.js";
import { renderMicrobits } from "./microbit.js";
import { initNarratePostContent } from "./read-content-aloud.js";

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
  addCopyButtonToSourceCode();
  renderMicrobits();
  initNarratePostContent();
});
