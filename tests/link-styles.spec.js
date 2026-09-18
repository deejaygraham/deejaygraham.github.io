// @ts-check
import { test, expect } from "@playwright/test";

test("links use consistent treatments for their context", async ({ page }) => {
  await page.goto("/");

  const navLink = page.locator(".site-nav__desktop a").first();
  await expect(navLink).toHaveCSS("text-decoration-line", "none");
  await navLink.hover();
  await expect(navLink).toHaveCSS("text-decoration-line", "underline");

  const postCard = page.locator(".card__body").first();
  const postCardTitle = postCard.locator(".card__title");
  await expect(postCard).toHaveCSS("text-decoration-line", "none");
  await postCard.hover();
  await expect(postCardTitle).toHaveCSS("text-decoration-line", "underline");

  const footerLink = page.locator("#powered a").first();
  await expect(footerLink).toHaveCSS("text-decoration-line", "none");
  await footerLink.hover();
  await expect(footerLink).toHaveCSS("text-decoration-line", "underline");

  await page.goto("/2024/11/20/rocking-11ty-v3/");
  const proseLink = page.locator(".site-prose a").first();
  await expect(proseLink).toHaveCSS("text-decoration-line", "underline");
  await expect(proseLink).toHaveCSS("text-decoration-style", "solid");
  await proseLink.hover();
  await expect(proseLink).toHaveCSS("text-decoration-style", "solid");

  await page.goto("/talks/");
  const talkTitleLink = page.locator(".card__title a").first();
  await expect(talkTitleLink).toHaveCSS("text-decoration-line", "none");
  await talkTitleLink.hover();
  await expect(talkTitleLink).toHaveCSS("text-decoration-line", "underline");

  await page.goto("/tags/");
  const tagChip = page.locator(".tag-chip").first();
  await expect(tagChip).toHaveCSS("text-decoration-line", "none");
  await tagChip.hover();
  await expect(tagChip).toHaveCSS("text-decoration-line", "none");
});
