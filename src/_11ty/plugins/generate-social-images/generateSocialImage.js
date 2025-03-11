import sharp from "sharp";
import splitLongLine from "./splitLongLine.js";
import sanitizeHTML from "./sanitizeHTML.js";

export default async function (imageName, title, postDate, siteName, targetDir) {

  const lineBreakAt = 15; // characters
  const line_length = lineBreakAt;
  const max_lines = 4;
  const start_x = 50;
  const start_y = 150;
  const line_height = 90; 
  const font_size = 120;
  const font_weight = 700;
  const site_font_size = 25;
  const titleColour = '#FF6C23'; // 000
  const siteNameColour = "#FEEFDA"; // 000
  const bgColour = "#1D1F1E"; // FFF
	
  const title_lines = splitLongLine(title, line_length, max_lines);
  const start_y_middle = start_y + (((max_lines - title_lines.length) * line_height) / 3);

  const svgTitle = title_lines.reduce((paragraph, line, i) => {
    line = sanitizeHTML(line);
    return paragraph + `<text x="${start_x}" y="${start_y_middle + (i * line_height)}" fill="${titleColour}" font-size="${font_size}px" font-weight="${font_weight}">${line}</text>`;
  }, '');

  const graphicWidth = 1200;
  const graphicHeight = 628;
	
  const svgSite = `<text x="${start_x}" y="600" fill="${siteNameColour}" font-size="${site_font_size}px" font-weight="${font_weight}">${siteName}</text>`;
  const svgDate = `<text x="${start_x}" y="50" fill="${siteNameColour}" font-size="${site_font_size}px" font-weight="${font_weight}">${postDate}</text>`;

  const template = `<svg width="${graphicWidth}" height="${graphicHeight}" viewbox="0 0 ${graphicWidth} ${graphicHeight}" xmlns="http://www.w3.org/2000/svg">  
  	<rect x="0" y="0" width="${graphicWidth}" height="${graphicHeight}" rx="0" ry="0" fill="${bgColour}" />
    	<g style="font-family:'Consolas', 'Courier New'">
      ${postDate ? svgDate : ''}
  		${svgTitle}
      ${svgSite}
      </g>
    </svg>`;

  const fileName = imageName + '.png';

  try {
    // generate the image from the svg        
    const svgBuffer = Buffer.from(template);

    await sharp(svgBuffer)
      .resize(graphicWidth, graphicHeight)
      .png()
      .toFile(`${targetDir}/${fileName}`);

    } catch(err) {
        console.error("Eleventy generating social images error:", err, { template, filename, title, siteName});
    }

    return fileName;
}
