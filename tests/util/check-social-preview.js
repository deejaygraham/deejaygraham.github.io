// @ts-check
import { expect } from "@playwright/test";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;
const MIN_BYTES = 5000;

/**
 * @param {Buffer} buffer
 * @param {string} [label]
 */
export async function expectSocialPreviewBuffer(buffer, label = "social preview") {
  const meta = await sharp(buffer).metadata();

  expect(meta.format, `${label} format`).toBe("jpeg");
  expect(meta.width, `${label} width`).toBe(WIDTH);
  expect(meta.height, `${label} height`).toBe(HEIGHT);
  expect(buffer.length, `${label} byte size`).toBeGreaterThan(MIN_BYTES);
}

/**
 * @param {string} filePath
 */
export async function expectSocialPreviewFile(filePath) {
  const buffer = await sharp(filePath).toBuffer(); // eslint-disable-line
  await expectSocialPreviewBuffer(buffer, filePath);
}

/**
 * Fetch a preview URL from the served site and assert it is a valid OG image.
 * @param {import('@playwright/test').Page} page
 * @param {string} url
 */
export default async function checkSocialPreview(page, url) {
  const response = await page.request.get(url);

  expect(response.ok(), `${url} is not available: ${response.status()}`).toBeTruthy();
  expect(response.headers()["content-type"], `${url} content-type`).toMatch(/image\/jpe?g/i);

  const buffer = Buffer.from(await response.body());
  await expectSocialPreviewBuffer(buffer, url);
}
