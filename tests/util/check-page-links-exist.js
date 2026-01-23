// @ts-check
import { test, expect } from '@playwright/test';
import checkResourceExists from './check-resource-exists.js';

const validLink = (link) => {
    const internalLinksRegex = /deejaygraham.github.io/;
    return link 
    && !link?.startsWith("mailto:") 
    && !link?.endsWith(".yml") 
    && !link?.includes("#") 
    && (link.startsWith('http') 
    && link.match(internalLinksRegex));
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

/*
const getMetaTag = (page, name) => {
  return page.locator(`head > meta[name="${name}"]`);
}
*/

const getOgMetaTag = (page, name) => {
  return page.locator(`head > meta[property="og:${name}"]`);
}

export default async function (page, url) {
  // process mostly stolen from https://github.com/checkly/playwright-examples/blob/main/404-detection/tests/no-404s.spec.ts
  await page.goto(url);
    
  let imagesOnThisPage = await getAllImagesOnPage(page);

  const metaOgImage = getOgMetaTag(page, "image");
  const ogImageUrl = await metaOgImage.getAttribute('content');
  imagesOnThisPage = [...imagesOnThisPage, ogImageUrl];
    
  const linksOnThisPage = await getAllLinksFromPage(page);

  for (const url of imagesOnThisPage) {
    if (url) {
        await test.step(`Checking image: ${url}`, async () => {
          await checkResourceExists(page, url);
    });
    }
  }
  
  for (const url of linksOnThisPage) {
    if (url) {
        await test.step(`Checking link: ${url}`, async () => {
            const response = await page.goto(url);
            await expect(response?.status()).toBe(200);
            // make sure the title of this page is not "Erm....
            await expect(page).not.toHaveTitle(/blog is missing/)
        });
    }
   }
}
