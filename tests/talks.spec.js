// @ts-check
import { test, expect } from '@playwright/test';

test.describe("talks page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/talks/");
  });

  test("contains correct title",async ({ page }) => {
    await expect(page).toHaveTitle(/talks/);
  });

  test("contains talk tiles", async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Married to the Mob (' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'no SOLID evidence' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'The Elements of Style', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sketchnoting for Developers' })).toBeVisible();
  });
});
