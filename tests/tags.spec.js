// @ts-check
import { test, expect } from '@playwright/test';

test("Tags page contains entries for each tagged topic", async ({ page }) => {
  await page.goto("/tags/");

  await expect(page.getByText("11ty")).toBeVisible();
  await expect(page.getByText("python")).toBeVisible();
  await expect(page.getByText("agile")).toBeVisible();
});
