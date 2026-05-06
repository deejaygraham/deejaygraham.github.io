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
  notification.className = "notification is-info is-light";
  notification.style.margin = "0 auto";
  notification.style.maxWidth = "38rem";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.type = "button";
  deleteBtn.setAttribute("aria-label", "dismiss update notification");
  deleteBtn.addEventListener("click", () => {
    wrapper.remove();
  });

  const content = document.createElement("div");
  content.className = "is-flex is-justify-content-space-between is-align-items-center";

  const message = document.createElement("span");
  message.textContent = "A newer version of this site is available.";

  const refreshButton = document.createElement("button");
  refreshButton.type = "button";
  refreshButton.className = "button is-small is-info";
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

function watchForServiceWorkerUpdate(registration) {
  const promptToUpdate = () => {
    showSwUpdateNotification(() => {
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

/* eslint-disable-next-line */
const registerServiceWorker = async () => {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing) {
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

    watchForServiceWorkerUpdate(registration);
  } catch (error) {
    console.error(`Registration failed with ${error}`);
  }
};
