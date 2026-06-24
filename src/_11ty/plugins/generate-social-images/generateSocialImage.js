import sharp from "sharp";
import fs from 'fs';
import splitLongLine from "./splitLongLine.js";
import sanitizeHTML from "./sanitizeHTML.js";
import getAdaptiveTitleLayout from "./getAdaptiveTitleLayout.js";

export default async function (imageName, title, postDate, siteName, targetDir, watermark) {

  const safeFileName = `${imageName}`.replace(/[^a-z0-9-_]/gi, "-").toLowerCase();
  const fileName = `${safeFileName}.jpg`;
  const outputPath = `${targetDir}/${fileName}`;

  if (fs.existsSync(outputPath)) {
	  return `<!-- Already exists ${fileName} -->`;
  }

  const graphicWidth = 1200;
  const graphicHeight = 630;

  const start_x = 550;
  const start_y = 150;
  const max_lines = 4;
  
  const font_weight = 700;
  const site_font_size = 25;
	
  const titleColour = 'indianred'; // '#FF6C23'; // 000
  const siteNameColour = "#000"; // 000
  const bgColour = "#FFF"; //"#1D1F1E"; // FFF
	
  // Available width from text start to right edge, minus some padding
  const rightPadding = 60;
  const maxTextWidth = graphicWidth - start_x - rightPadding;
	
  const { fontSize, lineHeight, lines: titleLines } = getAdaptiveTitleLayout(
    title,
    splitLongLine,
    {
      maxLines,
      maxFontSize: 90,
      minFontSize: 48,
      fontStep: 2,
      maxTextWidth,
      avgCharWidthFactor: 0.56,
      lineHeightFactor: 1.15,
    }
  );
	
  const start_y_middle = start_y + (((max_lines - title_lines.length) * line_height) / 3);

  const svgTitle = title_lines.reduce((paragraph, line, i) => {
    line = sanitizeHTML(line);
    return paragraph + `<text x="${start_x}" y="${start_y_middle + (i * line_height)}" fill="${titleColour}" font-size="${font_size}px" font-weight="${font_weight}">${line}</text>`;
  }, '');


	
  // const svgSite = `<text x="${start_x}" y="600" fill="${siteNameColour}" font-size="${site_font_size}px" font-weight="${font_weight}">${siteName}</text>`;
  const svgDate = `<text x="${start_x}" y="${start_y_middle - 100}" fill="${siteNameColour}" font-size="${site_font_size}px" font-weight="${font_weight}">${postDate}</text>`;

  //  <g style="font-family: 'Consolas', 'Courier New'" >
	
  const template = `<svg width="${graphicWidth}" height="${graphicHeight}" viewBox="0 0 ${graphicWidth} ${graphicHeight}" xmlns="http://www.w3.org/2000/svg">  
  	<rect x="0" y="0" width="${graphicWidth}" height="${graphicHeight}" rx="0" ry="0" fill="${bgColour}" />
    	<g style="font-family:'sans-serif'">
      ${postDate ? svgDate : ''}
  		${svgTitle}
      </g>
    </svg>`;

  
  try {
    // generate the image from the svg        
    const svgBuffer = Buffer.from(template); // eslint-disable-line

    await sharp(svgBuffer)
	.composite([{
    		input: watermark,
    		gravity: 'northwest',
  	  }])
      .jpeg({
		  quality: 65,
		  progressive: true,
		  chromaSubsampling: "4:2:0",
		  mozjpeg: true,
	  })
      .toFile(outputPath);

    } catch(err) {
        console.error("Eleventy generating social images error:", err, { template, fileName, title, siteName});
    }

    return `<!-- Generated ${fileName} -->`;
}
