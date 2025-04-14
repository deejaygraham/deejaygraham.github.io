// @ts-check
import { test, expect } from '@playwright/test';
import checkPageLinksExist from './util/check-page-links-exist.js';

test.describe("talks page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/talks/");
  });

  test("contains correct title",async ({ page }) => {
    await expect(page).toHaveTitle(/talks/);
  });

  test("contains talk tiles", async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Married to the Mob (' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'no SOLID evidence' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'The Elements of Style' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sketchnoting for Developers' }).first()).toBeVisible();
  });

  test('Page links are correct', async ({page}) => {
    await checkPageLinksExist(page, '/talks/');
  });
});
