// @ts-check
import { test, expect } from '@playwright/test';

test.describe("404 page", () => {
  test("shows a 404 message when navigating to a non-existent page", async ({ page }) => {

    await page.goto('/blargleargle/').then(response => {
      expect(response?.status()).toEqual(404);
      });

      await expect(page.getByRole('heading', { name: 'Erm...' })).toBeVisible();
    await expect(page.getByText("The page you were looking for does not exist")).toBeVisible();
  });
  
  test("404 handler page exists", async ({ page }) => {
    await page.goto('/404');

    await expect(page.getByRole('heading', { name: 'Erm...' })).toBeVisible();
    await expect(page.getByText("The page you were looking for does not exist")).toBeVisible();
  });
});
