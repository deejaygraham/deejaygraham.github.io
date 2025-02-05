// @ts-check
import { test, expect } from '@playwright/test';

test("Projects page renders with links to other projects", async ({ page }) => {
  await page.goto("/projects/");

  await expect(page).toHaveTitle(/projects/);
  await expect(page.getByRole("heading", { name: "Things What I Have Made"})).toBeVisible();

  await expect(page.getByText("NDifference")).toBeVisible();
  await expect(page.getByText("Scrum Planning Poker")).toBeVisible();
});
