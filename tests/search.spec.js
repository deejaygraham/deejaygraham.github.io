// @ts-check
import { test, expect } from '@playwright/test';

/**
 * Wait until elasticlunr index is loaded and bound (see `search-site.js`).
 * Also wait for the index fetch so failures distinguish "bad HTML" from "404 JSON".
 * @param {import('@playwright/test').Page} page
 */
async function waitForSearchReady(page) {
  const indexResponse = page.waitForResponse(
    (r) => r.url().includes("/search-index.json") && r.status() === 200,
  );
  await page.goto("/search/");
  await indexResponse;
  await page.waitForFunction(() => Boolean(window.searchIndex) && Boolean(document.getElementById("search-box")));
}

test.describe("search page", () => {
  test.beforeEach(async ({ page }) => {
    await waitForSearchReady(page);
    await expect(page).toHaveTitle(/search/);
  });

  test("search-index.json is valid elasticlunr export", async ({ request }) => {
    const res = await request.get("/search-index.json");
    expect(res.ok(), `search-index.json HTTP ${res.status()}`).toBeTruthy();
    const ct = (res.headers()["content-type"] || "").toLowerCase();
    expect(ct.includes("json"), `expected JSON content-type, got ${ct}`).toBeTruthy();
    const data = await res.json();
    expect(data).toHaveProperty("version");
    expect(data).toHaveProperty("documentStore");
    expect(data.documentStore).toHaveProperty("docs");
    expect(Object.keys(data.documentStore.docs).length, "index should list at least one post").toBeGreaterThan(0);
  });

  test("search by title shows a matching result with a working post link", async ({ page }) => {
    const searchBox = page.getByLabel(/keywords/i);
    await searchBox.fill("jazz");
    const hit = page.locator("#search-results").getByText("Make A Jazz Noise Here", { exact: true });
    await expect(hit).toBeVisible();
    const postLink = page.locator("#search-results a").filter({ hasText: "Make A Jazz Noise Here" });
    await expect(postLink).toHaveAttribute("href", /make-a-jazz-noise-here/);
    await expect(postLink).toHaveCount(1);
  });

  test("search by quotation author finds the expected post", async ({ page }) => {
    await page.getByLabel(/keywords/i).fill("Lehman");
    await expect(page.locator("#search-results").getByText("Deteriorating Structure", { exact: true })).toBeVisible();
  });

  test("search term matching excerpt finds the expected post", async ({ page }) => {
    await page.getByLabel(/keywords/i).fill("build");
    await expect(page.locator("#search-results").getByText("Creating Builds in TFS 2015", { exact: true })).toBeVisible();
  });

  test("nonsense term shows empty state copy", async ({ page }) => {
    await page.getByLabel(/keywords/i).fill("blargleargle");
    await expect(page.getByText("Unable to find any posts for")).toBeVisible();
    await expect(page.getByText(/blargleargle/)).toBeVisible();
  });

  test("very short nonsense query adds the length hint when there are no hits", async ({ page }) => {
    await page.getByLabel(/keywords/i).fill("qqz");
    await expect(page.getByText("Unable to find any posts for")).toBeVisible();
    await expect(page.getByText("(try typing more characters)")).toBeVisible();
  });

  test("clearing the search box shows the idle prompt", async ({ page }) => {
    const box = page.getByLabel(/keywords/i);
    await box.fill("blargleargle");
    await expect(page.getByText("Unable to find any posts for")).toBeVisible();
    await box.fill("");
    await expect(page.getByText("Type something into the search box above")).toBeVisible();
  });

  test("broad term can return multiple results", async ({ page }) => {
    await page.getByLabel(/keywords/i).fill("microbit");
    const cards = page.locator("#search-results article.message");
    await expect(cards.first()).toBeVisible();
    const n = await cards.count();
    expect(n, "expect several micro:bit posts in the index").toBeGreaterThanOrEqual(2);
  });

  test("recent posts section is still present below results", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Recent Posts" })).toBeVisible();
  });
});
