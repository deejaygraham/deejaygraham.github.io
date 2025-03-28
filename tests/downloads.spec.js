// @ts-check
import { test } from '@playwright/test';
import checkAllResourcesExist from './util/check-all-resources-exist.js';
  
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

  await checkAllResourcesExist(page, pdfs);
});

test("Code and binary zips are downloadable", async ({ page }) => {
  await page.goto("/");

  const binaries = [
    "/downloads/rfk_scratch_binary.zip",
    "/downloads/MsBuild.ThreeByTwo.Tasks.zip",
  ];

  await checkAllResourcesExist(page, binaries);
});
