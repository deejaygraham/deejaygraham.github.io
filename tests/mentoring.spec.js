// @ts-check
import { test, expect } from '@playwright/test';
import checkPageLinksExist from './util/check-page-links-exist.js';

test.describe("mentoring page", () => {
  test("renders correctly", async ({ page }) => {
    await page.goto("/mentoring/");

    await expect(page.getByText("We Think Code")).toBeVisible();
    await expect(page.getByText("My Mentoring Philosophy")).toBeVisible();
    await expect(page.getByText("What I Can Help With")).toBeVisible();
  });

  test('Page links are correct', async ({page}) => {
    await checkPageLinksExist(page, '/mentoring/');
  });
});
