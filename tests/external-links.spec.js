// @ts-check
import { test, expect } from '@playwright/test';
import checkResourceExists from './util/check-resource-exists.js';
  
// Externally linked Resources we want links to be correct and stable
// most linked from sketchnote army website

test("GTD Sketchnote challenge is available", async ({ page }) => {
  await page.goto("/2015/02/15/sketchnote-challenge/");
  await expect(page).toHaveTitle(/Sketchnoting Challenge/);

  // linked to from: https://sketchnotearmy.com/blog/2015/2/23/sketchnoting-challenge-david-allen-on-mac-power-users-and-th.html
  await checkResourceExists(page, '/img/posts/sketchnoting-challenge/mac-power-users-hifi.png');
});

test("Sketchnoting at DDD North 2015 is available", async ({ page }) => {
  await page.goto("/2015/10/26/sketchnoting-at-dddnorth-2015/");
  await expect(page).toHaveTitle(/Sketchnoting at DDDNorth 2015/);

  // linked to from: https://sketchnotearmy.com/blog/2015/10/30/sketchnoting-at-dddnorth-2015-derek-graham.html
  await checkResourceExists(page, '/img/posts/sketchnoting-at-dddnorth-2015/luke-stringer.jpg');
  await checkResourceExists(page, '/img/posts/sketchnoting-at-dddnorth-2015/dddnorth-logo.png');
});

test("Sketchnoting for Developers talk is available", async ({ page }) => {
  await page.goto("/sketchnoting-for-developers");
  await expect(page).toHaveTitle(/sketchnoting for developers/);
});

test("ACE Conference sketchnote link is available", async ({ page }) => {
  // linked to from: https://sketchnotearmy.com/blog/2015/2/10/the-sketchnote-workbook-featured-sketchnoter-derek-graham.html
  await checkResourceExists(page, '/img/posts/sketchnotes-from-ace-2014/gilb.png');
});
