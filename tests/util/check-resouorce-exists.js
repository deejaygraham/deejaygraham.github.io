// @ts-check
import { expect } from '@playwright/test';

/**
 * Check a web resource exists by making a request to it and checking the ok response. 
 * @param {import('@playwright/test').Page} page
 * @param {string} url
 */
export default async function (page, url) {
  const response = await page.request.get(url)
  expect.soft(response.ok(), `${url} is not available`).toBeTruthy();
}
