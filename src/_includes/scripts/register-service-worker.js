function showSwUpdateNotification(onRefresh) {
  const existing = document.getElementById("sw-update-notification");
  if (existing) {
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.id = "sw-update-notification";
  wrapper.style.position = "fixed";
  wrapper.style.left = "1rem";
  wrapper.style.right = "1rem";
  wrapper.style.bottom = "1rem";
  wrapper.style.zIndex = "9999";

  const notification = document.createElement("div");
  notification.className = "notification is-info";
  notification.style.margin = "0 auto";
  notification.style.maxWidth = "38rem";
  // Reserve space for Bulma's absolute-positioned delete button.
  notification.style.paddingRight = "3.5rem";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.type = "button";
  deleteBtn.setAttribute("aria-label", "dismiss update notification");
  deleteBtn.addEventListener("click", () => {
    wrapper.remove();
  });

  const content = document.createElement("div");
  content.className = "is-flex is-justify-content-space-between is-align-items-center";
  content.style.gap = "0.75rem";
  content.style.flexWrap = "wrap";

  const message = document.createElement("span");
  message.textContent = "A newer version of this site is available.";

  const refreshButton = document.createElement("button");
  refreshButton.type = "button";
  refreshButton.className = "button is-small is-info";
  refreshButton.style.flexShrink = "0";
  refreshButton.textContent = "Refresh";
  refreshButton.addEventListener("click", () => {
    refreshButton.disabled = true;
    refreshButton.classList.add("is-loading");
    onRefresh();
  });

  content.appendChild(message);
  content.appendChild(refreshButton);
  notification.appendChild(deleteBtn);
  notification.appendChild(content);
  wrapper.appendChild(notification);
  document.body.appendChild(wrapper);
}

function watchForServiceWorkerUpdate(registration, onRefreshRequested) {
  const promptToUpdate = () => {
    showSwUpdateNotification(() => {
      onRefreshRequested();
      if (registration.waiting) {
        registration.waiting.postMessage("SKIP_WAITING");
      }
    });
  };

  if (registration.waiting) {
    promptToUpdate();
  }

  registration.addEventListener("updatefound", () => {
    const newWorker = registration.installing;
    if (!newWorker) {
      return;
    }

    newWorker.addEventListener("statechange", () => {
      if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
        promptToUpdate();
      }
    });
  });
}

export const registerServiceWorker = async () => {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  let refreshRequestedByUser = false;
  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    // Only reload after the user accepts an available update.
    // Avoiding unconditional reloads prevents navigation races in tests.
    if (!refreshRequestedByUser || refreshing) {
      return;
    }

    refreshing = true;
    window.location.reload();
  });

  try {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      type: "module",
      scope: "/",
    });

    watchForServiceWorkerUpdate(registration, () => {
      refreshRequestedByUser = true;
    });
  } catch (error) {
    console.error(`Registration failed with ${error}`);
  }
};
