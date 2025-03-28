// @ts-check
import { test, expect } from '@playwright/test';
import checkResourceExists from './util/check-resource-exists.js';
  
test("pdf samples are downloadable", async ({ page }) => {
  await page.goto("/");

  const pdfs = [
    "/downloads/Dotted-a4-portrait.pdf", 
    "/downloads/Dotted-a4-landscape.pdf", 
    "/downloads/Graph-a4-portrait.pdf", 
    "/downloads/Graph-a4-landscape.pdf", 
    "/downloads/Manuscript-a4-portrait.pdf", 
    "/downloads/Manuscript-a4-landscape.pdf",
  ];

  for (const url of pdfs) {
    await checkResourceExists(page, url);
  }
});

test("Code and binary zips are downloadable", async ({ page }) => {
  await page.goto("/");

  const binaries = [
    "/downloads/rfk_scratch_binary.zip",
    "/downloads/MsBuild.ThreeByTwo.Tasks.zip",
  ];

  for (const url of binaries) {
    await checkResourceExists(page, url);
  }
});
