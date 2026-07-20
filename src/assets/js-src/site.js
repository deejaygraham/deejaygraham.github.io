import { registerServiceWorker } from "../../_includes/scripts/register-service-worker.js";
import { registerThemeSwitch } from "../../_includes/scripts/theme-switcher.js";
import { addCopyButtonToSourceCode } from "../../_includes/scripts/add-source-copy-button.js";
import { renderMicrobits } from "../../_includes/scripts/microbit.js";
import { initNarratePostContent } from "../../_includes/scripts/read-content-aloud.js";

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
