// @ts-check
import { test, expect } from '@playwright/test';


const validLink = (link) => {
    const internalLinksRegex = /deejaygraham.github.io/;
    return link && !link?.startsWith("mailto:") && !link?.startsWith("#") && (link.startsWith('http') && link.match(internalLinksRegex));
}

const getAllLinksFromPage = async (page) => {
    // getByRole('link') only matches visible links
    //
    // if you want to check all links, you can use a CSS selector
    // like 'locator("a")'
    const allLinkHrefs = await page.locator("a").evaluateAll(anchors => anchors.map(anchor => anchor.href));
    const title = await page.title();
    //const allLinkHrefs = await Promise.all(
    //    links.map((link) => link.getAttribute("href"))
    //);

    //console.log(JSON.stringify(allLinkHrefs, null, 2));

    const validHrefs = allLinkHrefs.reduce((links, link) => {
      //expect.soft(link, `link ${link} on page: ${title} has no a proper href`).not.toBeFalsy()

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
  // process mostly stolen from https://github.com/checkly/playwright-examples/blob/main/404-detection/tests/no-404s.spec.tsawait page.goto(goToUrl)
  const spiderPage = await page.goto('/spider.json');
  const siteUrlsAsJson = await spiderPage.text();
  
  const data = JSON.parse(siteUrlsAsJson);
  const siteUrls = new Set(data.urls);

  // do difference with urls I have already visited
  // for now let's just check each page is navigable
  const url of siteUrls[0];
  const sitePage = await context.newPage();
  await sitePage.goto(url);
    
    //     const imagesOnThisPage = await getAllImagesOnPage(page);
    //     imagesOnThisPage.forEach(imageUrls.add, imageUrls);
    
    //     console.log(imageUrls);
    
    //     const linksOnThisPage = await getAllLinksFromPage(page);
    //     linksOnThisPage.forEach(pageUrls.add, pageUrls);
    //     break;

  // pages to check...
  // build a set of all urls across all pages.
  // add urls to a SET
  // add other urls...
  
//   const imageUrls = new Set();
//   const pageUrls = new Set([...siteUrls]);

//   // build a list of links and images to check
//   // across the whole site...
//   for (const url of siteUrls) {
//     await page.goto(url);

//     const imagesOnThisPage = await getAllImagesOnPage(page);
//     imagesOnThisPage.forEach(imageUrls.add, imageUrls);

//     console.log(imageUrls);

//     const linksOnThisPage = await getAllLinksFromPage(page);
//     linksOnThisPage.forEach(pageUrls.add, pageUrls);
//     break;
//   }

//   // now attempt to check each one...
//   // images first...
//   for (const url of imageUrls) {
//     await test.step(`Checking image: ${url}`, async () => {
//       try {
//         // Note that some hosters / firewalls will block plain requests (Cloudflare, etc.)
//         // if that's the case for you, consider using `page.goto`
//         // or excluding particular URLs from the test
//         const response = await page.request.get(url);
//         const status = response.statusText();
        
//         expect
//           .soft(response.ok(), `${url} has no green status code: ${status}`)
//           .toBeTruthy();
//       } catch {
//         expect.soft(null, `${url} has no green status code`).toBeTruthy();
//       }
//     });
//   }

  //testInfo.attach("checked-links.txt", {
  //  body: Array.from(linkUrls).join("\n"),
  //});

    // for (const url of pageUrls) {
    //     await test.step(`Checking link: ${url}`, async () => {
    //         try {
    //         // Note that some hosters / firewalls will block plain requests (Cloudflare, etc.)
    //         // if that's the case for you, consider using `page.goto`
    //         // or excluding particular URLs from the test
    //         const response = await page.request.get(url);
    //         const status = response.statusText();
            
    //         expect
    //             .soft(response.ok(), `${url} has no green status code: ${status}`)
    //             .toBeTruthy();
    //         } catch {
    //         expect.soft(null, `${url} has no green status code`).toBeTruthy();
    //         }
    //     });
    //     }

    //     // testInfo.attach("checked-links.txt", {
    //     //   body: Array.from(linkUrls).join("\n"),
    // // });


    
});
