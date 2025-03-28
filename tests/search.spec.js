// @ts-check
import { test, expect } from '@playwright/test';

test("search the site for a post by title shows single match", async ({ page }) => {
  await page.goto("/search/");
  await expect(page).toHaveTitle(/search/);

  const searchTerm = "jazz";
  const expectedPostTitle = "Make A Jazz Noise Here";

  const searchBox = await page.getByPlaceholder('search');
  
  await searchBox.pressSequentially(searchTerm, { delay: 100 });
  await expect(page.getByText(expectedPostTitle)).toBeVisible();
});

test("search the site for a post by quotation author shows single match", async ({ page }) => {
  await page.goto("/search/");

  const searchTerm = "Lehman";
  const expectedPostTitle = "Deteriorating Structure";

  const searchBox = await page.getByPlaceholder('search');
  
  await searchBox.pressSequentially(searchTerm, { delay: 100 });
  await expect(page.getByText(expectedPostTitle)).toBeVisible();
});

test("search the site for a post by tag shows single match", async ({ page }) => {
  await page.goto("/search/");

  const searchTerm = "build";
  const expectedPostTitle = "Creating Builds in TFS 2015";

  const searchBox = await page.getByPlaceholder('search');
  
  await searchBox.pressSequentially(searchTerm, { delay: 100 });
  await expect(page.getByText(expectedPostTitle)).toBeVisible();
});

test("search the site for a nonsense term returns no results", async ({ page }) => {
  await page.goto("/search/");
  
  const searchTerm = "blargleargle";

  const searchBox = await page.getByPlaceholder('search');
  
  await searchBox.pressSequentially(searchTerm, { delay: 100 });
  await expect(page.getByText("Unable to find any posts for")).toBeVisible();
});
