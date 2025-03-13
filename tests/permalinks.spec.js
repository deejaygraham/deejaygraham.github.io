// @ts-check
import { test, expect } from '@playwright/test';

test("About page permalink", async ({ page }) => {
  await checkResourceExists(page, '/about/index.html');
});

// Check permalinks work for each kind of post

test("Sketchnote post permalink", async ({ page }) => {
  await checkResourceExists(page, '2014/10/23/sketchote2-from-ddd-north-2014/');
});

test("Quote post permalink", async ({ page }) => {
  await checkResourceExists(page, "2015/06/15/orwell's-hen-house/");
});

test("Code post permalink", async ({ page }) => {
  await checkResourceExists(page, '2014/05/08/unit-testing-with-httpclient/');
});

test("Video post permalink", async ({ page }) => {
  await checkResourceExists(page, '2014/08/10/think-different/');
});

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} url
 */
async function checkResourceExists(page, url) {
  const response = await page.request.get(url)
  expect.soft(response.ok(), `${url} is not available`).toBeTruthy();
}
