// @ts-check
import { test, expect } from "@playwright/test";

/**
 * Topic hubs live at `/tags/{slug}/` when `src/_data/topicHubs.js` defines that tag.
 * Slug comes from the same `slugify` filter as in `tags.njk` (e.g. `microbit` → `/tags/microbit/`).
 */
test.describe("topic hubs", () => {
  test("hub page shows curated title, intro, start here, related tags, and all posts", async ({ page }) => {
    await page.goto("/tags/microbit/");

    await expect(page.getByRole("heading", { level: 1, name: "Micro:bit" })).toBeVisible();
    await expect(page.locator(".topic-hub-intro")).toContainText("BBC micro:bit");

    const startHereList = page.getByRole("heading", { name: "Start here" }).locator("+ ul");
    await expect(startHereList.getByRole("link", { name: "Microbit Shyness", exact: true })).toBeVisible();
    await expect(startHereList.getByRole("link", { name: "Music Box", exact: true })).toBeVisible();

    await expect(page.getByText(/Related topics/)).toBeVisible();
    const relatedLine = page.locator("p.mb-5").filter({ hasText: /Related topics/ });
    await expect(relatedLine.getByRole("link", { name: "#python", exact: true })).toHaveCount(1);

    await expect(page.getByRole("heading", { name: "All posts" })).toBeVisible();
    await expect(page.getByRole("link", { name: "all tags", exact: true })).toHaveAttribute("href", "/tags/");
  });

  test("hub page sets meta description from topic hub data", async ({ page }) => {
    await page.goto("/tags/microbit/");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /BBC micro:bit projects on this blog/,
    );
  });

  test("non-hub tag page keeps the default heading (no start-here block)", async ({ page }) => {
    await page.goto("/tags/agile/");
    await expect(page.getByRole("heading", { level: 1, name: /Posts tagged with #agile/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Start here" })).toHaveCount(0);
  });
});
