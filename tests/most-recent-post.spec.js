// @ts-check
import { test } from '@playwright/test';
import checkPageLinksExist from './util/check-page-links-exist.js';

test("check all links on most recent page", async ({ page }) => {
    
  page.on('requestfailed', request => {
    console.log(request.url() + ' ' + request.failure().errorText);
  });
    
  // process mostly stolen from https://github.com/checkly/playwright-examples/blob/main/404-detection/tests/no-404s.spec.ts
  const spiderPage = await page.goto('/spider.json');
  const siteUrlsAsJson = await spiderPage.text();
  
  const data = JSON.parse(siteUrlsAsJson);
  const siteUrls = new Set(data.urls);

  const url = siteUrls.values().next().value;

  await checkPageLinksExist(page, url);
});
