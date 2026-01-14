// @ts-check
import { test, expect } from '@playwright/test';

test('service worker registers and controls the page', async ({ page }) => {
  await page.goto('/');

  // Wait for registration promise to resolve
  const readyState = await page.evaluate(() => {
    return navigator.serviceWorker.ready.then(() => 'ready');
  });
  expect(readyState).toBe('ready');

  // Ensure controller is present (page controlled by active SW)
  await expect.poll(async () => {
    return await page.evaluate(() => !!navigator.serviceWorker.controller);
  }, { timeout: 10_000 }).toBe(true);

  // (Optional) Log active registrations
  const registrations = await page.evaluate(async () => {
    const regs = await navigator.serviceWorker.getRegistrations();
    return regs.map(r => ({ scope: r.scope }));
  });
  expect(registrations.length).toBeGreaterThan(0);
});


test('SW caches static asset with custom expiry header', async ({ page }) => {
  await page.goto('/');

  // First fetch (network), then cached
  const header = await page.evaluate(async () => {
    const res = await fetch('/css/site.css', { cache: 'no-store' });
    return res.headers.get('SW-Cache-Expires');
  });

  expect(header).toBeTruthy();

  const expiresMs = await page.evaluate(h => Date.parse(h!), header);
  expect(expiresMs).toBeGreaterThan(Date.now());

  // Second fetch should come quickly; we can also read from Cache API to confirm
  const cacheHasEntry = await page.evaluate(async () => {
    const cache = await caches.open('core-v1b'); // your cache name
    const match = await cache.match('/css/site.css');
    return !!match;
  });
  expect(cacheHasEntry).toBe(true);
});

test('offline fallback page is served for navigations', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('/');
  // Confirm SW is ready and controlling
  await page.evaluate(() => navigator.serviceWorker.ready);
  await expect.poll(async () => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);

  // Go offline
  await context.setOffline(true);
  await page.goto('/about/', { waitUntil: 'domcontentloaded' });

  // Check offline page content (assert a known text)
  const content = await page.textContent('body');
  expect(content).toContain('no internet connection');

  await context.setOffline(false);
});


test('static CSS serves from cache while offline', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('/');
  // Prime the cache
  await page.evaluate(() => fetch('/css/site.css', { cache: 'no-store' }));

  await context.setOffline(true);
  const status = await page.evaluate(async () => {
    const res = await fetch('/css/site.css', { cache: 'no-store' }).catch(() => null);
    return res ? res.status : 0;
  });
  expect(status).toBe(200);
});


test('search-index.json is always available offline', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('/');

  const searchIndex = '/search-index.json';
  
  // Warm the cache
  await page.evaluate(() => fetch(searchIndex, { cache: 'no-store' }));

  await context.setOffline(true);

  // The index should still be fetchable
  const result = await page.evaluate(async () => {
    try {
      const res = await fetch(searchIndex, { cache: 'no-store' });
      const text = await res.text();
      return { ok: res.ok, len: text.length };
    } catch (e) {
      return { ok: false, len: 0 };
    }
  });

  expect(result.ok).toBe(true);
  expect(result.len).toBeGreaterThan(0);

  await context.setOffline(false);
});


test('cache contains entry with SW-Cache-Expires header', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => fetch('/css/site.css', { cache: 'no-store' }));

  const header = await page.evaluate(async () => {
    const cache = await caches.open('core-v1b');
    const res = await cache.match('/css/site.css');
    return res?.headers.get('SW-Cache-Expires') ?? null;
  });

  expect(header).toBeTruthy();
  const expiry = Date.parse(header!);
  expect(expiry).toBeGreaterThan(Date.now());
});

test.afterEach(async ({ page }) => {
  await page.evaluate(async () => {
    const regs = await navigator.serviceWorker.getRegistrations();
    await Promise.all(regs.map(r => r.unregister()));
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
  });
});
