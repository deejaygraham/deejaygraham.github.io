// @ts-check
import { test, expect } from '@playwright/test';
import checkResourceExists from './check-resource-exists.js';

const PRODUCTION_HOST = "deejaygraham.github.io";

/**
 * Treat same-origin links as internal (local `eleventy --serve`) and production host.
 * @param {string} link absolute URL from `HTMLAnchorElement.href`
 * @param {string} pageUrl current document URL
 */
const validLink = (link, pageUrl) => {
  if (
    !link
    || link.startsWith("mailto:")
    || link.endsWith(".yml")
    || link.includes("#")
    || !link.startsWith("http")
  ) {
    return false;
  }
  try {
    const u = new URL(link);
    const base = new URL(pageUrl);
    return u.origin === base.origin || u.hostname === PRODUCTION_HOST;
  } catch {
    return false;
  }
};

/**
 * Meta/canonical URLs use the production host; rewrite to the local served origin
 * so newly built assets (e.g. og:image) are checked against `_site`, not live.
 * @param {string} url
 * @param {string} pageUrl
 */
const toLocalUrl = (url, pageUrl) => {
  try {
    const absolute = new URL(url, pageUrl);
    if (absolute.hostname !== PRODUCTION_HOST) {
      return absolute.href;
    }
    return new URL(
      `${absolute.pathname}${absolute.search}${absolute.hash}`,
      new URL(pageUrl).origin,
    ).href;
  } catch {
    return url;
  }
};

const getAllLinksFromPage = async (page) => {
    const allLinkHrefs = await page.getByRole("link")
      .evaluateAll(anchors => anchors.map(anchor => anchor.href));

    const validHrefs = allLinkHrefs.reduce((links, link) => {
      if (validLink(link, page.url())) {
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

  for (const imageUrl of imagesOnThisPage) {
    if (imageUrl) {
        const localUrl = toLocalUrl(imageUrl, page.url());
        await test.step(`Checking image: ${localUrl}`, async () => {
          await checkResourceExists(page, localUrl);
    });
    }
  }
  
  for (const linkUrl of linksOnThisPage) {
    if (linkUrl) {
        const localUrl = toLocalUrl(linkUrl, page.url());
        await test.step(`Checking link: ${localUrl}`, async () => {
            const response = await page.request.get(localUrl);
            await expect(response?.status()).toBe(200);
            const body = await response.text();
            expect(body.toLowerCase()).not.toContain("blog is missing");
        });
    }
   }
}
