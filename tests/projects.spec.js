// @ts-check
import { test, expect } from '@playwright/test';
import checkPageLinksExist from './util/check-page-links-exist.js';

test("Projects page renders with links to other projects", async ({ page }) => {
  await page.goto("/projects/");

  await expect(page).toHaveTitle(/projects/);
  await expect(page.getByRole("heading", { name: "things what i have made"})).toBeVisible();

  await expect(page.getByText("NDifference")).toBeVisible();
  await expect(page.getByText("Scrum Planning Poker")).toBeVisible();
});

test('Page links are correct', async ({page}) => {
  await checkPageLinksExist(page, '/projects/');
});
