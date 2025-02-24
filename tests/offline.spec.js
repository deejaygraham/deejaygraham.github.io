// @ts-check
import { test, expect } from '@playwright/test';

test.describe("offline page", () => {
  test("offline page exists", async ({ page }) => {
    await page.goto('/offline.html');

    await expect(page.getByRole('heading', { name: 'Erm...' })).toBeVisible();
    await expect(page.getByText("no internet connection at the moment")).toBeVisible();
  });
});
