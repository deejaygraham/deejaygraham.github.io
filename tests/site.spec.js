// @ts-check
import { test, expect } from '@playwright/test';
import * as fs from 'fs';

const readJSON = (filePath) => {
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

test("check all links on each page", async ({ page }) => {
  const data = readJSON('../_site/spider.json');
  const urls = data.urls;

  for (const url of urls) {
    await page.goto(url);
      
    // find all the links on the page...
  }
});
