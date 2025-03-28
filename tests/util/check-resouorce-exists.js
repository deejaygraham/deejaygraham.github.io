// @ts-check
import { expect } from '@playwright/test';

/**
 * Check a web resource exists by making a request to it and checking the ok response. 
 * @param {import('@playwright/test').Page} page
 * @param {string} url
 */
export default async function (page, url) {
  try {
    const response = await page.request.get(url);
    const status = response.statusText();
    
    expect
      .soft(response.ok(), `${url} is not available: ${status}`)
      .toBeTruthy();
    } catch(error) {
     expect
       .soft(null, `${url} is not available: ${error}`)
       .toBeTruthy();
   }
}
