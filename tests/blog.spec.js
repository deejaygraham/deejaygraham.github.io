// @ts-check
import { test, expect } from '@playwright/test';
import checkResourceExists from 'util/check-resource-exists.js";
  
test("blog posts from each year with slug format", async ({ page }) => {

  await verifyLinks(page, [
    "/2011/12/18/why-i-am-an-agnostic/",
    "/2012/02/04/history/",
    "/2013/09/01/recursive-copy-in-msbuild/",
    "/2014/11/14/doctorows-three-laws/",
    "/2015/06/18/secret-azure-debugging-tools/",
    "/2016/09/23/balancing-ball-game-on-the-microbit/",
    "/2017/08/21/blinking-cpp-for-the-microbit/",
    "/2018/11/01/linting-in-powershell/",
    "/2019/09/17/slowing-down-selenium-tests/",
    "/2020/11/30/silent-night-for-the-microbit/",
    "/2021/08/20/check-file-content-with-powershell/",
    "/2022/09/30/improved-ghost-detector/",
    "/2023/09/10/run-csharp-from-powershell/",
    "/2024/03/28/make-a-jazz-noise-here/",
  ]);
});

test.describe("Specific blog post example", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/2024/03/01/microbit-sound-meter/");
  });

  test("contains the correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Microbit Sound Meter/);
  });

  test("has a read estimate", async ({ page }) => {
    await expect(page.getByText(/Takes about /)).toBeVisible();
  });

  test("contains the correct date", async ({ page }) => {
    await expect(page.getByText("1 March 2024")).toBeVisible();
  });

  test("contains the meta tags", async ({ page }) => {
    await expect(page.getByText("#code #microbit #python")).toBeVisible();
  });

  test("contains code sample", async ({ page }) => {
    await expect(page.getByText('from microbit import \\* def')).toBeVisible();
  });

  test("contains suggested posts", async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'More posts tagged with #' })).toBeVisible();  
  });

  test("contains copyright message", async ({ page }) => {
    await expect(page.getByText(/© Derek/)).toBeVisible();
  });

  test("contains last updated message", async ({ page }) => {
    await expect(page.getByText(/Last updated/)).toBeVisible();
  });
});

async function verifyLinks(page, urls) {
  for (const url of urls) {
    await checkResourceExists(page, url);
  }
}
