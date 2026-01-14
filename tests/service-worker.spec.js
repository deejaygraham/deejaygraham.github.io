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

