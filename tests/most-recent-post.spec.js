// @ts-check
import { test } from '@playwright/test';
import checkPageLinksExist from './util/check-page-links-exist.js';

test("check all links on most recent pages", async ({ page }) => {
  // process mostly stolen from https://github.com/checkly/playwright-examples/blob/main/404-detection/tests/no-404s.spec.ts
  const spiderPage = await page.goto('/spider.json');
  const siteUrlsAsJson = await spiderPage.text();
  
  const data = JSON.parse(siteUrlsAsJson);
  const siteUrls = new Set(data.urls);

  for(const url of siteUrls) {
    await test.step(`Checking links on ${url}`, async () => {
      await checkPageLinksExist(page, url);
    });
  }
});
