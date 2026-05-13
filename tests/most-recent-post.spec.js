// @ts-check
import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';
import checkPageLinksExist from './util/check-page-links-exist.js';

/** PNG file signature (first 8 bytes). */
const PNG_MAGIC = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

/**
 * @param {Uint8Array} bytes
 */
function startsWithPngMagic(bytes) {
  if (bytes.length < PNG_MAGIC.length) {
    return false;
  }
  for (let i = 0; i < PNG_MAGIC.length; i++) {
    if (bytes[i] !== PNG_MAGIC[i]) {
      return false;
    }
  }
  return true;
}

/**
 * @param {string} href from the DOM (relative or absolute)
 * @param {string} baseUrl current page URL (e.g. index) for resolving relatives
 * @returns {string} pathname with trailing slash (matches Eleventy post permalinks)
 */
function postPathname(href, baseUrl) {
  const u = new URL(href, baseUrl);
  let p = u.pathname;
  if (!p.endsWith('/')) {
    p += '/';
  }
  return p;
}

/**
 * Newest post = first card on the index (same order as `collections.posts` on `index.njk`).
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<string>} pathname with trailing slash
 */
async function getLatestPostPathFromHomepage(page) {
  await page.goto('/');
  const link = page.locator('.columns.is-multiline > .column').first().locator('h2.title a');
  await expect(link, 'homepage should show at least one post card').toBeVisible();
  const href = await link.getAttribute('href');
  expect(href, 'newest post card should have an href').toBeTruthy();
  return postPathname(/** @type {string} */ (href), page.url());
}

test.describe('most recent blog post', () => {
  test('index card, page load, og image, and internal links', async ({ page }) => {
    const latestPath = await test.step('Resolve newest post from first homepage card', async () =>
      getLatestPostPathFromHomepage(page),
    );

    await test.step('Post URL responds and main content renders', async () => {
      const response = await page.goto(latestPath);
      expect(response?.ok(), `navigation failed: HTTP ${response?.status()}`).toBeTruthy();
      await expect(page.locator('h1.title.is-1').first()).toBeVisible();
    });

    await test.step('JSON-LD BlogPosting is valid and matches the page', async () => {
      const ld = page.locator('script[type="application/ld+json"]');
      await expect(ld).toHaveCount(1);
      const raw = (await ld.textContent())?.trim() ?? '';
      expect(raw, 'JSON-LD script should not be empty').toBeTruthy();
      const data = JSON.parse(raw);

      expect(data['@context']).toBe('https://schema.org');
      expect(data['@type']).toBe('BlogPosting');
      expect(typeof data.headline).toBe('string');
      expect(data.headline.length).toBeGreaterThan(0);

      const h1Text = (await page.locator('h1.title.is-1').first().textContent())?.trim() ?? '';
      expect(data.headline.trim()).toBe(h1Text);

      expect(typeof data.description).toBe('string');
      expect(data.description.length).toBeGreaterThan(0);

      expect(typeof data.url).toBe('string');
      const jsonPath = new URL(data.url).pathname.replace(/\/+$/, '') || '/';
      const pagePath = new URL(page.url()).pathname.replace(/\/+$/, '') || '/';
      expect(jsonPath).toBe(pagePath);

      expect(typeof data.datePublished).toBe('string');
      expect(data.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}T/);

      expect(data.author).toMatchObject({ '@type': 'Person', name: expect.any(String) });
      expect(data.author.name.length).toBeGreaterThan(0);

      expect(Array.isArray(data.image)).toBeTruthy();
      expect(data.image.length).toBeGreaterThan(0);
      expect(typeof data.image[0]).toBe('string');
      expect(data.image[0]).toMatch(/^https?:\/\//);
    });

    await test.step('og:image meta matches built preview under _site (not production URL)', async () => {
      const og = page.locator('meta[property="og:image"]');
      await expect(og).toHaveCount(1);
      const imageUrl = await og.getAttribute('content');
      expect(imageUrl, 'og:image content missing').toBeTruthy();
      const parsed = new URL(/** @type {string} */ (imageUrl));
      expect(parsed.pathname, 'og:image should point under /img/previews/*.png').toMatch(
        /^\/img\/previews\/.+\.png$/i,
      );

      // Meta uses canonical site.url; new previews are not on production until deploy.
      // CI and local runs serve _site — assert the generated file exists there.
      const segments = parsed.pathname.split('/').filter(Boolean);
      const localPreview = path.join(process.cwd(), '_site', ...segments);
      expect(
        fs.existsSync(localPreview),
        `expected built OG preview at ${localPreview} (og:image is ${imageUrl}; run npm run build before tests)`,
      ).toBeTruthy();
      const buf = fs.readFileSync(localPreview);
      expect(startsWithPngMagic(buf), `expected PNG at ${localPreview}`).toBeTruthy();
    });

    await test.step('Internal links on the post resolve', async () => {
      await checkPageLinksExist(page, latestPath);
    });
  });
});
