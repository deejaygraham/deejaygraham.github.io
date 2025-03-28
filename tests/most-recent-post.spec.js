// @ts-check
import { test, expect } from '@playwright/test';

const validLink = (link) => {
    const internalLinksRegex = /deejaygraham.github.io/;
    return link && !link?.startsWith("mailto:") && !link?.startsWith("#") && (link.startsWith('http') && link.match(internalLinksRegex));
}

const getAllLinksFromPage = async (page) => {
    const allLinkHrefs = await page.getByRole("link")
      .evaluateAll(anchors => anchors.map(anchor => anchor.href));

    const validHrefs = allLinkHrefs.reduce((links, link) => {
      if (validLink(link)) {
        links.add(new URL(link, page.url()).href);
      }
      
      return links;
    }, new Set());
  
    return validHrefs
  }

const getAllImagesOnPage = async (page) => {
    const images = await page.getByRole('img').all();
    const allImageSrcLinks = await Promise.all(
        images.map((img) => img.getAttribute("src"))
    );

    return allImageSrcLinks;
}

test("check all links on most recent page", async ({ page, context
 }, testInfo) => {
    
  page.on('requestfailed', request => {
    console.log(request.url() + ' ' + request.failure().errorText);
  });
    
  // process mostly stolen from https://github.com/checkly/playwright-examples/blob/main/404-detection/tests/no-404s.spec.tsawait page.goto(goToUrl)
  const spiderPage = await page.goto('/spider.json');
  const siteUrlsAsJson = await spiderPage.text();
  
  const data = JSON.parse(siteUrlsAsJson);
  const siteUrls = new Set(data.urls);

  const url = siteUrls.values().next().value;

  await page.goto(url);
    
  const imagesOnThisPage = await getAllImagesOnPage(page);
  const linksOnThisPage = await getAllLinksFromPage(page);

  for (const url of imagesOnThisPage) {
    if (url) {
        await test.step(`Checking image: ${url}`, async () => {
          await page.goto(url);
    });
    }
  }
  
  for (const url of linksOnThisPage) {
    if (url) {
        await test.step(`Checking link: ${url}`, async () => {
            await page.goto(url);
        });
    }
   }
});
