import sharp from "sharp";
import fs from "fs";
import path from "path";
import splitLongLine from "./splitLongLine.js";
import sanitizeHTML from "./sanitizeHTML.js";
import getAdaptiveTitleLayout from "./getAdaptiveTitleLayout.js";
import slugify from "./slugify.js";

/** Bump when OG layout/content changes so cached previews regenerate. */
export const OG_LAYOUT_VERSION = "2026-07-24-v4";

const GRAPHIC_WIDTH = 1200;
const GRAPHIC_HEIGHT = 630;
const BG = "#FFF";
const TITLE_COLOUR = "indianred";
const META_COLOUR = "#000";
const FONT_FAMILY = "sans-serif";

async function prepareAvatar(sourcePath, size) {
  return sharp(sourcePath)
    .resize(size, size, { fit: "cover" })
    .png()
    .toBuffer();
}

function buildDefaultSvg(shortTitle) {
  const maxTextWidth = 560;
  const { fontSize, lineHeight, lines } = getAdaptiveTitleLayout(
    shortTitle,
    splitLongLine,
    {
      maxLines: 3,
      maxFontSize: 72,
      minFontSize: 40,
      fontStep: 2,
      maxTextWidth,
      avgCharWidthFactor: 0.56,
      lineHeightFactor: 1.15,
    },
  );

  // Text sits to the right of the large avatar (~420px + padding).
  const textX = 520;
  const blockHeight = lines.length * lineHeight;
  const startY =
    Math.round((GRAPHIC_HEIGHT - blockHeight) / 2) + Math.round(lineHeight * 0.75);

  const titleSvg = lines.reduce((paragraph, line, i) => {
    const safe = sanitizeHTML(line);
    return (
      paragraph +
      `<text x="${textX}" y="${startY + i * lineHeight}" fill="${TITLE_COLOUR}" font-size="${fontSize}px" font-weight="700">${safe}</text>`
    );
  }, "");

  return `<svg width="${GRAPHIC_WIDTH}" height="${GRAPHIC_HEIGHT}" viewBox="0 0 ${GRAPHIC_WIDTH} ${GRAPHIC_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="${GRAPHIC_WIDTH}" height="${GRAPHIC_HEIGHT}" fill="${BG}" />
  <g style="font-family:'${FONT_FAMILY}'">
    ${titleSvg}
  </g>
</svg>`;
}

function buildPostSvg(title, postDate, siteUrl) {
  const sidePadding = 80;
  const maxTextWidth = GRAPHIC_WIDTH - sidePadding * 2;
  const { fontSize, lineHeight, lines } = getAdaptiveTitleLayout(
    title,
    splitLongLine,
    {
      maxLines: 4,
      maxFontSize: 72,
      minFontSize: 40,
      fontStep: 2,
      maxTextWidth,
      avgCharWidthFactor: 0.56,
      lineHeightFactor: 1.15,
    },
  );

  const centerX = GRAPHIC_WIDTH / 2;
  const blockHeight = lines.length * lineHeight;
  const titleStartY =
    Math.round((GRAPHIC_HEIGHT - blockHeight) / 2) + Math.round(lineHeight * 0.7);
  const cornerInset = 56;
  const metaFontSize = 24;
  // Same corner inset as the URL: baseline inset from the top edge.
  const dateY = cornerInset;
  const footerY = GRAPHIC_HEIGHT - cornerInset;

  const titleSvg = lines.reduce((paragraph, line, i) => {
    const safe = sanitizeHTML(line);
    return (
      paragraph +
      `<text x="${centerX}" y="${titleStartY + i * lineHeight}" text-anchor="middle" fill="${TITLE_COLOUR}" font-size="${fontSize}px" font-weight="700">${safe}</text>`
    );
  }, "");

  const dateSvg = postDate
    ? `<text x="${sidePadding}" y="${dateY}" text-anchor="start" fill="${META_COLOUR}" font-size="${metaFontSize}px" font-weight="600">${sanitizeHTML(postDate)}</text>`
    : "";

  const urlSvg = `<text x="${sidePadding}" y="${footerY}" text-anchor="start" fill="${META_COLOUR}" font-size="${metaFontSize}px" font-weight="600">${sanitizeHTML(siteUrl)}</text>`;

  return `<svg width="${GRAPHIC_WIDTH}" height="${GRAPHIC_HEIGHT}" viewBox="0 0 ${GRAPHIC_WIDTH} ${GRAPHIC_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="${GRAPHIC_WIDTH}" height="${GRAPHIC_HEIGHT}" fill="${BG}" />
  <g style="font-family:'${FONT_FAMILY}'">
    ${dateSvg}
    ${titleSvg}
    ${urlSvg}
  </g>
</svg>`;
}

/**
 * @param {string} imageName slug used for the output filename
 * @param {string} title display title (posts) or short site name (default)
 * @param {string} postDate formatted date, empty for default variant
 * @param {string} siteUrl display URL for post footer (e.g. deejaygraham.github.io)
 * @param {string} targetDir
 * @param {string} avatarPath path to avatar/favicon image
 * @param {{ variant?: "default" | "post", debugSvg?: boolean, debugSvgDir?: string }} [options]
 */
export default async function generateSocialImage(
  imageName,
  title,
  postDate,
  siteUrl,
  targetDir,
  avatarPath,
  options = {},
) {
  const {
    variant = postDate ? "post" : "default",
    debugSvg = false,
    debugSvgDir = targetDir,
  } = options;

  const safeFileName = slugify(imageName);
  const fileName = `${safeFileName}.jpg`;
  const outputPath = path.join(targetDir, fileName);
  const svgOutputPath = path.join(debugSvgDir, `${safeFileName}.svg`);

  if (fs.existsSync(outputPath)) {
    return { fileName, alreadyExists: true };
  }

  const template =
    variant === "default"
      ? buildDefaultSvg(title)
      : buildPostSvg(title, postDate, siteUrl);

  try {
    if (debugSvg) {
      fs.mkdirSync(debugSvgDir, { recursive: true });
      fs.writeFileSync(svgOutputPath, template, "utf8");
      console.log(`Saved debug SVG: ${svgOutputPath}`);
    }

    const svgBuffer = Buffer.from(template); // eslint-disable-line
    const composites = [];

    if (variant === "default") {
      const largeAvatar = await prepareAvatar(avatarPath, 420);
      composites.push({
        input: largeAvatar,
        left: 48,
        top: Math.round((GRAPHIC_HEIGHT - 420) / 2),
      });
    } else {
      const smallAvatar = await prepareAvatar(avatarPath, 72);
      composites.push({
        input: smallAvatar,
        left: GRAPHIC_WIDTH - 80 - 72,
        top: GRAPHIC_HEIGHT - 48 - 72,
      });
    }

    await sharp(svgBuffer)
      .composite(composites)
      .jpeg({
        quality: 65,
        progressive: true,
        chromaSubsampling: "4:2:0",
        mozjpeg: true,
      })
      .toFile(outputPath);
  } catch (err) {
    try {
      fs.mkdirSync(debugSvgDir, { recursive: true });
      fs.writeFileSync(svgOutputPath, template, "utf8");
      console.error(`Saved failing SVG to: ${svgOutputPath}`);
    } catch (writeErr) {
      console.error("Failed to write debug SVG:", writeErr);
    }

    console.error("Generating social images error:", err, {
      template,
      fileName,
      title,
      siteUrl,
      variant,
    });
    return { fileName, error: true };
  }

  return { fileName, alreadyExists: false };
}
