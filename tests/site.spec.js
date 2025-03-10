// @ts-check
import { test, expect } from '@playwright/test';
import * as fs from 'fs';

const readJSON = (filePath) => {
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

const getAllLinksFromPage = async (page) => {
    // getByRole('link') only matches visible links
    //
    // if you want to check all links, you can use a CSS selector
    // like 'locator("a")'
    const links = page.getByRole("link");
  
    const allLinks = await links.all();
    const allLinkHrefs = await Promise.all(
      allLinks.map((link) => link.getAttribute("href"))
    );

    const validHrefs = allLinkHrefs.reduce((links, link) => {
      expect.soft(link, "link has no a proper href").not.toBeFalsy()
  
      if (link && !link?.startsWith("mailto:") && !link?.startsWith("#"))
        links.add(new URL(link, page.url()).href)
      return links;
    }, new Set());
  
    return validHrefs
  }

test("check all links on each page", async ({ page }, testInfo) => {
  // process mostly stolen from https://github.com/checkly/playwright-examples/blob/main/404-detection/tests/no-404s.spec.tsawait page.goto(goToUrl)
  const response = await page.goto('/spider.json');
  const content = await response.text();
  // console.log(content);
  
  const data = JSON.parse(content);
  const urls = data.urls;

  for (const url of urls) {
    await page.goto(url);
    const linkUrls = await getAllLinksFromPage(page);

    for (const url of linkUrls) {
        await test.step(`Checking link: ${url}`, async () => {
          try {
            // Note that some hosters / firewalls will block plain requests (Cloudflare, etc.)
            // if that's the case for you, consider using `page.goto`
            // or excluding particular URLs from the test
            const response = await page.request.get(url);
            const status = response.statusText();
            
            expect
              .soft(response.ok(), `${url} has no green status code: ${status}`)
              .toBeTruthy();
          } catch {
            expect.soft(null, `${url} has no green status code`).toBeTruthy();
          }
        });
      }
  
      testInfo.attach("checked-links.txt", {
        body: Array.from(linkUrls).join("\n"),
      });
  }
});
