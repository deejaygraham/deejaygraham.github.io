// file renamed to exclude it from default loading for all other .spec tests.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; 

test.describe('run accessibility tests', { tag: '@a11y' }, () => {
 test('homepage has no accessibility problems', async ({ page }) => {
    await checkPageForAccessibility(page, '/');
  });

  // quote page

  // code example page

  // sketchnote page

 test('search page has no accessibility problems', async ({ page }) => {
    await checkPageForAccessibility(page, '/search/');
  });
 
 test('tags page has no accessibility problems', async ({ page }) => {
    await checkPageForAccessibility(page, '/tags/');
  });
 
 test('projects page has no accessibility problems', async ({ page }) => {
    await checkPageForAccessibility(page, '/projects/');
  });
 
 test('speaking page has no accessibility problems', async ({ page }) => {
    await checkPageForAccessibility(page, '/talks/');
  });
 
  test('about has no accessibility problems', async ({ page }) => {
    await checkPageForAccessibility(page, '/about/');
  });
});

const checkPageForAccessibility = async (page, url) => {
  await page.goto(url);
 
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 
  expect(accessibilityScanResults.violations).toEqual([]);
}
