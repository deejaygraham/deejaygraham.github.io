// @ts-check
import { test, expect } from '@playwright/test';

test.describe("home page", () => {
  test.beforeEach(async ({ page }) => {
      await page.goto("/");
    });
  
  test("contain home icon", async ({ page }) => {
    await expect(page.locator('a').filter({ hasText: 'g { fill: var(--bulma-body-' })).toBeVisible();
  });

  test("navigation menu is shown", async ({ page }) => {
    await expect(page.getByRole('link', { name: 'blog', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'search' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'tags' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'projects' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'talks' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'about' })).toBeVisible();
  });

  test("contains footer with social links", async ({ page }) => {
    await expect(page.getByRole('link', { name: 'rss' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'github' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'linkedin' })).toBeVisible();
  });
});
