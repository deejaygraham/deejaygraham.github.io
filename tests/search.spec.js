// @ts-check
import { test, expect } from '@playwright/test';

const waitForSearchToBeReady = async (page) => {
  await page.waitForFunction(() => {
    const searchBox = document.getElementById("search-box");
    return Boolean(window.searchIndex) && Boolean(searchBox);
  });
};

test("search the site for a post by title shows single match", async ({ page }) => {
  await page.goto("/search/");
  await expect(page).toHaveTitle(/search/);
  await waitForSearchToBeReady(page);

  const searchTerm = "jazz";
  const expectedPostTitle = "Make A Jazz Noise Here";

  const searchBox = await page.getByPlaceholder('search');
  
  await searchBox.pressSequentially(searchTerm, { delay: 100 });
  await expect(page.getByText(expectedPostTitle, { exact: true })).toBeVisible();
});

test("search the site for a post by quotation author shows single match", async ({ page }) => {
  await page.goto("/search/");
  await waitForSearchToBeReady(page);

  const searchTerm = "Lehman";
  const expectedPostTitle = "Deteriorating Structure";

  const searchBox = await page.getByPlaceholder('search');
  
  await searchBox.pressSequentially(searchTerm, { delay: 100 });
  await expect(page.getByText(expectedPostTitle, { exact: true })).toBeVisible();
});

test("search the site for a post by tag shows single match", async ({ page }) => {
  await page.goto("/search/");
  await waitForSearchToBeReady(page);

  const searchTerm = "build";
  const expectedPostTitle = "Creating Builds in TFS 2015";

  const searchBox = await page.getByPlaceholder('search');
  
  await searchBox.pressSequentially(searchTerm, { delay: 100 });
  await expect(page.getByText(expectedPostTitle, { exact: true })).toBeVisible();
});

test("search the site for a nonsense term returns no results", async ({ page }) => {
  await page.goto("/search/");
  await waitForSearchToBeReady(page);
  
  const searchTerm = "blargleargle";

  const searchBox = await page.getByPlaceholder('search');
  
  await searchBox.pressSequentially(searchTerm, { delay: 100 });
  await expect(page.getByText("Unable to find any posts for")).toBeVisible();
});
