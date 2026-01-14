
// tests/service-worker.spec.js
import { test, expect } from '@playwright/test';

const CACHE_NAME = 'core-v1b'; // adjust if your SW cache version differs
const CSS_PATH = '/css/site.css';
const SEARCH_INDEX = '/search-index.json';
const NOT_FOUND_PAGE = '/404.html';

// Utility: ensure SW is ready and controls the page
async function ensureSwReadyAndControlled(page) {
  // Wait for registration to be ready
  await page.evaluate(() => navigator.serviceWorker.ready);

  // Wait until controller is present
  await expect.poll(async () => {
    return await page.evaluate(() => !!navigator.serviceWorker.controller);
  }, { timeout: 10_000, message: 'Service Worker did not take control of the page' }).toBe(true);
}

test.describe('Service Worker (core behaviors, no TTL simulation)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/'); 
    await ensureSwReadyAndControlled(page);
  });

  test.afterEach(async ({ page }) => {
    // Unregister SW and clear caches to isolate tests
    await page.evaluate(async () => {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r => r.unregister()));
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    });
  });

  // --- Registration & control ---
  test('registers service worker and controls the page', async ({ page }) => {
    const isReady = await page.evaluate(async () => {
      await navigator.serviceWorker.ready;
      return !!navigator.serviceWorker.controller;
    });
    expect(isReady).toBe(true);

    const registrations = await page.evaluate(async () => {
      const regs = await navigator.serviceWorker.getRegistrations();
      return regs.map(r => ({ scope: r.scope }));
    });
    expect(registrations.length).toBeGreaterThan(0);
  });

  // --- Cache header presence for static asset ---
  test('SW caches CSS with SW-Cache-Expires header', async ({ page }) => {
    // Prime the cache via network fetch
    const status = await page.evaluate(async (path) => {
      const res = await fetch(path, { cache: 'no-store' });
      return res.status;
    }, CSS_PATH);
    expect(status).toBe(200);

    // Inspect Cache Storage for the header
    const header = await page.evaluate(async (cacheName, path) => {
      const cache = await caches.open(cacheName);
      const res = await cache.match(path);
      return res?.headers.get('SW-Cache-Expires') ?? null;
    }, CACHE_NAME, CSS_PATH);

    expect(header).toBeTruthy();
    const expiryMs = Date.parse(header);
    expect(expiryMs).toBeGreaterThan(Date.now());
  });

  // --- Offline fallback for navigations ---
  test('offline fallback page is served on navigation when offline', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('/');
    await ensureSwReadyAndControlled(page);

    // Go offline
    await context.setOffline(true);

    // Navigate to a route that would normally require network
    await page.goto('/some/route/', { waitUntil: 'domcontentloaded' });

    // Assert offline page content (update the text to match your offline.html)
    const bodyText = await page.textContent('body');
    expect(bodyText).toMatch(/offline/i);

    await context.setOffline(false);
    await context.close();
  });

  // --- Static asset serves from cache while offline ---
  test('CSS serves from cache while offline', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('/');
    await ensureSwReadyAndControlled(page);

    // Prime the cache
    await page.evaluate(async (path) => {
      await fetch(path, { cache: 'no-store' });
    }, CSS_PATH);

    // Go offline and fetch again
    await context.setOffline(true);
    const status = await page.evaluate(async (path) => {
      try {
        const res = await fetch(path, { cache: 'no-store' });
        return res.status;
      } catch {
        return 0;
      }
    }, CSS_PATH);

    expect(status).toBe(200);

    await context.setOffline(false);
    await context.close();
  });

  // --- search-index.json reliably offline ---
  test('search-index.json is available offline', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('/');
    await ensureSwReadyAndControlled(page);

    // Warm the search cache
    const warmStatus = await page.evaluate(async (path) => {
      const res = await fetch(path, { cache: 'no-store' });
      return res.status;
    }, SEARCH_INDEX);
    expect(warmStatus).toBe(200);

    await context.setOffline(true);

    const result = await page.evaluate(async (path) => {
      try {
        const res = await fetch(path, { cache: 'no-store' });
        const text = await res.text();
        return { ok: res.ok, len: text.length };
      } catch {
        return { ok: false, len: 0 };
      }
    }, SEARCH_INDEX);

    expect(result.ok).toBe(true);
    expect(result.len).toBeGreaterThan(0);

    await context.setOffline(false);
    await context.close();
  });

  // --- 404 navigation handling ---
  test('document 404 falls back to cached notFound page when online', async ({ page }) => {
     // Hit a guaranteed missing route 
     await page.evaluate(async () => {
      const res = await fetch('/this-route-should-not-exist/', { cache: 'no-store' });
      return res.status;
    });

    const notFoundCacheHit = await page.evaluate(async (cacheName, notFoundPath) => {
      const cache = await caches.open(cacheName);
      const res = await cache.match(notFoundPath);
      return !!res;
    }, CACHE_NAME, NOT_FOUND_PAGE);

    expect(notFoundCacheHit).toBe(true);
  });
});
