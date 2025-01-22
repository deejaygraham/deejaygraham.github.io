import sharp from "sharp";
import splitLongLine from "./splitLongLine.js";
import sanitizeHTML from "./sanitizeHTML.js";

export default async function (filename, title, siteName, targetDir) {

  const lineBreakAt = 35;
  const line_length = lineBreakAt;
  const max_lines = 4;
  const start_x = 150;
  const start_y = 210;
  const line_height = 60;
  const font_size = 38;
  const font_weight = 700;
  const site_font_size = 30
  const titleColour = '#FFF';
  const siteNameColour = "#FFF";
	
  const title_lines = splitLongLine(title, line_length, max_lines);
  const start_y_middle = start_y + (((max_lines - title_lines.length) * line_height) / 3);

  const svgTitle = title_lines.reduce((paragraph, line, i) => {
    line = sanitizeHTML(line);
    return paragraph + `<text x="${start_x}" y="${start_y_middle + (i * line_height)}" fill="${titleColour}" font-size="${font_size}px" font-weight="${font_weight}">${line}</text>`;
  }, '');
	
  const template = `<svg width="1200" height="628" viewbox="0 0 1200 628" xmlns="http://www.w3.org/2000/svg">  
    	<g style="font-family:sans-serif">
  			${svgTitle}
			<text x="265" y="500" fill="${siteNameColour}" font-size="${site_font_size}px" font-weight="${font_weight}">${siteName}</text>
		</g>
    </svg>`;

  try {
    // generate the image from the svg        
    const svgBuffer = Buffer.from(template);

    await sharp(svgBuffer)
      .resize(1200, 628)
      .png()
      .toFile(`${targetDir}/${filename}.png`);

    } catch(err) {
        console.error("Eleventy generating social images error:", err, { template, filename, title, siteName});
    }

    return `${filename}.png`;
}
