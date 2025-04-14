// @ts-check
import { test, expect } from '@playwright/test';

test.describe("about page", () => {
  test("renders correctly", async ({ page }) => {
    await page.goto("/about/");

    await expect(page).toHaveTitle(/Hey, Hi, Hello./);
    await expect(page.getByText("My name is Derek Graham and this is my personal blog.")).toBeVisible();

    // banner image has to exist
    await expect(page.getByAltText('Hey, Hi, Hello.')).toHaveAttribute('src', '/img/heroes/hero-makers-and-creators.webp');
  });
});
