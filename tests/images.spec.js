// @ts-check
import { test, expect } from '@playwright/test';

test.describe("images on random page", () => {
  test("sketchnote appears on page", async ({ page }) => {
    await page.goto("/2025/03/01/solving-the-rubiks-cube-in-20-seconds/");
    await expect(page.getByRole('img', { name: 'Solving the Rubik\'s Cube in' })).toBeVisible();
  });

  test("hero appears on page", async ({ page }) => {
    await page.goto("/about/");
    await expect(page.getByRole('img', { name: 'Hey, Hi, Hello.' })).toBeVisible();
  });

  test("image appears in middle of post", async ({ page }) => {
    await page.goto("/2019/08/20/autonomous-microbit-vehicle/");
    await expect(page.getByRole('img', { name: 'straddling the line' })).toBeVisible();
  });
});
