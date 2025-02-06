// @ts-check
import { test, expect } from '@playwright/test';

test.describe("home page", () => {
  test.beforeEach(async ({ page }) => {
      await page.goto("/");
    });
  
  test("contain home icon", async ({ page }) => {
    const avatar = await page.getByAltText('a triumph of style over substance');

    await expect(avatar).toBeVisible();
  });

  test("navigation menu is shown", async ({ page }) => {
    await expect(page.getByRole('link', { name: 'home' })).toBeVisible();
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
