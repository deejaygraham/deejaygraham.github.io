// file renamed to exclude it from default loading for all other .spec tests.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; 

test.describe('run accessibility tests', { tag: '@a11y' }, () => {
  test('homepage has no accessibility problems', async ({ page }) => {
    await page.goto('/'); 

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // quote page

  // code example page

  // sketchnote page

  // search page

  // tags page

  // projects page

  // talks page

  // about page
  test('homepage has no accessibility problems', async ({ page }) => {
    await page.goto('/about/'); 

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
