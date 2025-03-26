// @ts-check
import { test, expect } from '@playwright/test';

test.describe("light dark theming", () => {
  test("Light button sets light theme", async ({ page, browserName }) => {
    await page.goto("/");

    await page.getByRole('button', { name: 'Light mode' }).click();

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test("Dark button sets dark theme", async ({ page, browserName }) => {
    await page.goto("/");

    await page.getByRole('button', { name: 'Dark mode' }).click();

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test("Default button removes theme", async ({ page, browserName }) => {
    await page.goto("/");

    await page.getByRole('button', { name: 'Device default' }).click();

    await expect(page.locator('html')).not.toHaveAttribute('data-theme');
  });
});
  
