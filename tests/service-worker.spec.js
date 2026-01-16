import { test, expect } from '@playwright/test';
 
const CACHE_NAME = 'core-v1b';                     // must match SW cache name exactly
const CSS_PATH = '/css/site.css';
//const SEARCH_INDEX = '/search-index.json';
//const NOT_FOUND_PATH = '/404.html';
//const OFFLINE_TEXT = /offline|you are offline/i;  

test.describe('Service Worker core behaviors', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');             
    await ensureSwReadyAndControlled(page);
  });

  test.afterEach(async ({ page }) => {
    await page.evaluate(async () => {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r => r.unregister()));
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    });
  });

  test('registers SW and controls page', async ({ page }) => {
    const registrations = await page.evaluate(async () => {
      const regs = await navigator.serviceWorker.getRegistrations();
      return regs.map(r => ({ scope: r.scope }));
    });
    expect(registrations.length).toBeGreaterThan(0);

    const controlled = await page.evaluate(() => !!navigator.serviceWorker.controller);
    expect(controlled).toBe(true);
  });

  test('SW caches CSS with SW-Cache-Expires header (same-origin)', async ({ page }) => {
    await warmUrl(page, CSS_PATH);

    const header = await expect
      .poll(async () => {
        return await readCacheHeader(page, { cacheName: CACHE_NAME, url: CSS_PATH });
      }, {
        timeout: 5_000,
        intervals: [250, 250, 500, 1000, 1000],
        message: `Header SW-Cache-Expires not found in cache ${CACHE_NAME} for ${CSS_PATH}`
      })
      .toBeTruthy();

    const expiryMs = Date.parse(header);
    expect(expiryMs).toBeGreaterThan(Date.now());
  });
 /*
  test('offline navigation serves offline fallback', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('/');
    await ensureSwReadyAndControlled(page);

    await context.setOffline(true);
    await page.goto('/some/route/', { waitUntil: 'domcontentloaded' });

    const bodyText = await page.textContent('body');
    expect(bodyText).toMatch(OFFLINE_TEXT);

    await context.setOffline(false);
    await context.close();
  });

  test('CSS serves from cache while offline', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('/');
    await ensureSwReadyAndControlled(page);

    await warmUrl(page, CSS_PATH);

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

  test('search-index.json is available offline', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('/');
    await ensureSwReadyAndControlled(page);

    await warmUrl(page, SEARCH_INDEX);

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

  test('404 page is cached in core cache', async ({ page }) => {
    const cached = await page.evaluate(async ({ cacheName, notFoundPath }) => {
      const cache = await caches.open(cacheName);
      const res = await cache.match(notFoundPath);
      return !!res;
    }, { cacheName: CACHE_NAME, notFoundPath: NOT_FOUND_PATH });
    expect(cached).toBe(true);
  });
  */
});

async function ensureSwReadyAndControlled(page, opts = { timeout: 10_000 }) {
  await page.evaluate(() => navigator.serviceWorker.ready);
  await expect
    .poll(() => page.evaluate(() => !!navigator.serviceWorker.controller), {
      timeout: opts.timeout,
      message: 'Service Worker did not take control of the page'
    })
    .toBe(true);
}

async function warmUrl(page, url) {
  const status = await page.evaluate(async (u) => {
    const res = await fetch(u, { cache: 'no-store' });
    return res.status;
  }, url);
  expect(status).toBe(200);
}

async function readCacheHeader(page, { cacheName, url, headerName = 'SW-Cache-Expires' }) {
  return await page.evaluate(async ({ cacheName, url, headerName }) => {
    const cache = await caches.open(cacheName);
    const res = await cache.match(url);
    return res?.headers.get(headerName) ?? null;
  }, { cacheName, url, headerName });
}

