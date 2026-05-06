// @ts-check
import { test, expect } from "@playwright/test";

test.describe("service worker update prompt", () => {
  test.skip(({ browserName }) => browserName !== "chromium", "Focused SW checks for Chromium.");

  test("shows Bulma notification and posts SKIP_WAITING", async ({ page }) => {
    await page.addInitScript(() => {
      const swListeners = new Map();
      const registrationListeners = new Map();
      const waitingWorker = {
        postMessage(message) {
          window.__swMessages.push(message);
        },
      };

      window.__swMessages = [];
      window.__swRegistration = {
        waiting: waitingWorker,
        installing: null,
        addEventListener(type, handler) {
          registrationListeners.set(type, handler);
        },
        __emit(type) {
          const handler = registrationListeners.get(type);
          if (handler) handler();
        },
      };

      const fakeServiceWorker = {
        ready: Promise.resolve(window.__swRegistration),
        register: async () => window.__swRegistration,
        addEventListener(type, handler) {
          swListeners.set(type, handler);
        },
        controller: { state: "activated" },
      };

      Object.defineProperty(navigator, "serviceWorker", {
        configurable: true,
        value: fakeServiceWorker,
      });
    });

    await page.goto("/");

    const notice = page.locator("#sw-update-notification");
    await expect(notice).toBeVisible();
    await expect(notice).toContainText("A newer version of this site is available.");

    await page.getByRole("button", { name: "Refresh" }).click();

    const messages = await page.evaluate(() => window.__swMessages);
    expect(messages).toContain("SKIP_WAITING");
  });
});
