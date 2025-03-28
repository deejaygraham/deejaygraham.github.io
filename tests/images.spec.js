// @ts-check
import { test, expect } from '@playwright/test';
import checkImageExists from "./check-image-exists.js";

test.describe("images on random page", () => {
  test("sketchnote appears on page", async ({ page }) => {
    await page.goto("/2025/03/01/solving-the-rubiks-cube-in-20-seconds/");

    const sketchnote = await page.getByRole('img', { name: 'Solving the Rubik\'s Cube in' });
    await checkImageExists(page, sketchnote);
  });

  test("hero appears on page", async ({ page }) => {
    await page.goto("/about/");
    const about = await page.getByRole('img', { name: 'Hey, Hi, Hello.' });
    await checkImageExists(page, about);
  });

  test("image appears in middle of post", async ({ page }) => {
    await page.goto("/2019/08/20/autonomous-microbit-vehicle/");
    const image = await page.getByRole('img', { name: 'straddling the line' });
    await checkImageExists(page, image);
  });
});
