// @ts-check
import { test, expect } from "@playwright/test";

test.describe("service worker", () => {
  test.use({ serviceWorkers: "allow" });
  test.skip(({ browserName }) => browserName !== "chromium", "Focused SW checks for Chromium.");

  test("registers and creates versioned caches", async ({ page }) => {
    await page.goto("/");

    await page.evaluate(async () => {
      await navigator.serviceWorker.ready;
    });
    await page.waitForFunction(() => Boolean(navigator.serviceWorker?.controller));

    // Runtime cache is created lazily on first eligible fetch.
    await page.evaluate(async () => {
      await fetch("/css/tailwind.css");
    });
    await page.waitForFunction(async () => {
      const names = await caches.keys();
      return names.some((n) => n.startsWith("runtime-"));
    });

    const cacheNames = await page.evaluate(async () => caches.keys());

    expect(cacheNames.some((n) => n.startsWith("precache-"))).toBeTruthy();
    expect(cacheNames.some((n) => n.startsWith("runtime-"))).toBeTruthy();
  });

  test("serves cached css and image when offline", async ({ context, page }) => {
    await page.goto("/");

    await page.evaluate(async () => {
      await navigator.serviceWorker.ready;
    });
    await page.waitForFunction(() => Boolean(navigator.serviceWorker?.controller));

    // Ensure assets are fetched at least once while online.
    await page.evaluate(async () => {
      await fetch("/css/tailwind.css");
      await fetch("/img/avatar.svg");
    });

    await context.setOffline(true);
    try {
      const css = await page.evaluate(async () => {
        const response = await fetch("/css/tailwind.css");
        return {
          ok: response.ok,
          status: response.status,
          hasExpiryHeader: Boolean(response.headers.get("SW-Cache-Expires")),
        };
      });

      const image = await page.evaluate(async () => {
        const response = await fetch("/img/avatar.svg");
        return {
          ok: response.ok,
          status: response.status,
          hasExpiryHeader: Boolean(response.headers.get("SW-Cache-Expires")),
        };
      });

      expect(css.ok).toBeTruthy();
      expect(css.status).toBe(200);
      expect(css.hasExpiryHeader).toBeTruthy();

      expect(image.ok).toBeTruthy();
      expect(image.status).toBe(200);
      expect(image.hasExpiryHeader).toBeTruthy();
    } finally {
      await context.setOffline(false);
    }
  });
});
