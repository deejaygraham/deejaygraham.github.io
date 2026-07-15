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
  notification.className = "d-alert d-alert-info d-alert-vertical sm:d-alert-horizontal";
  notification.setAttribute("role", "alert");
  notification.style.margin = "0 auto";
  notification.style.maxWidth = "38rem";

  const message = document.createElement("span");
  message.textContent = "A newer version of this site is available.";

  const actions = document.createElement("div");
  actions.className = "flex gap-2 shrink-0";

  const refreshButton = document.createElement("button");
  refreshButton.type = "button";
  refreshButton.className = "d-btn d-btn-sm";
  refreshButton.textContent = "Refresh";
  refreshButton.addEventListener("click", () => {
    refreshButton.disabled = true;
    onRefresh();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "d-btn d-btn-sm d-btn-ghost";
  deleteBtn.type = "button";
  deleteBtn.setAttribute("aria-label", "dismiss update notification");
  deleteBtn.textContent = "Dismiss";
  deleteBtn.addEventListener("click", () => {
    wrapper.remove();
  });

  actions.appendChild(refreshButton);
  actions.appendChild(deleteBtn);
  notification.appendChild(message);
  notification.appendChild(actions);
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
