// file renamed to exclude it from default loading for all other .spec tests.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; 

test.describe('run accessibility tests', { tag: '@a11y' }, () => {
  [
    '/',
    '/search/',
    '/tags/',
    '/projects/',
    '/talks/',
    '/about/',
    '/2025/03/25/efficiency/', //  quote example
    '/2025/04/11/microbit-haiku/', // code example
    '/2025/03/15/hexagonal-rails/', // sketchnote example
  ].forEach((url) => {
    test(`Checking ${url} has no accessibility problems`, async ({ page }) => {
      await page.goto(url);
     
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });
});

test("Skip link at top of page works", { tag: '@a11y' }, async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("header")).toMatchAriaSnapshot(`
    - link "Jump to main content"
    `);

  await page.keyboard.press("Tab");

  expect(
    await page.evaluate(() => {
      return document.activeElement?.textContent;
    }),
  ).toEqual("Jump to main content");

  await page.keyboard.press("Enter");

  expect(
    await page.evaluate(() => {
      return document.activeElement?.localName;
    }),
  ).toEqual("main");
});
