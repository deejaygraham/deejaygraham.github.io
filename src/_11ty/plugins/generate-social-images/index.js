import fs from "fs";
import path from "path";
import sharp from "sharp";

const defaults = {
    siteName: "",
    outputDir: "_site/img/previews"
};

const splitLongLine = (text, lineLength, maxRows) => {
	const lines = [];

	const words = text.split(/(?<=[^a-zA-Z0-9()<>""''])/);
	let line = '';
	words.forEach((word) => {
		if (line.length + word.length >= lineLength) {
			lines.push(line);
			line = '';
		}

		line += word;
	});

	if (line) {
		lines.push(line);
	}

	if (lines.length > maxRows) {
		lines.length = maxRows;
		lines[maxRows-1] += "…";
	}

	return lines;
};

const sanitizeHTML = (text) => {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
};

const generateSocialImage = async (filename, title, siteName) => {

	const lineBreakAt = 35;
	const line_length = lineBreakAt;
	const max_lines = 4;
	const start_x = 150;
	const start_y = 210;
	const line_height = 60;
	const font_size = 38;
	const titleColor = '#FFF';
	
    const title_lines = splitLongLine(title, line_length, max_lines);
    const start_y_middle = start_y + (((max_lines - title_lines.length) * line_height) / 3);

	const svgTitle = title_lines.reduce((p, c, i) => {
		c = sanitizeHTML(c);
		return p + `<text x="${start_x}" y="${start_y_middle + (i * line_height)}" fill="${titleColor}" font-size="${font_size}px" font-weight="700">${c}</text>`;
	}, '');

	
    const template = `<svg width="1200" height="628" viewbox="0 0 1200 628" xmlns="http://www.w3.org/2000/svg">  
    
    	<g style="font-family:sans-serif">
			${svgTitle}
			<text x="265" y="500" fill="#fff" font-size="30px" font-weight="700">${siteName}</text>
		</g>
    </svg>`;

    try {
        const svgBuffer = Buffer.from(template);

        await sharp(svgBuffer)
                .resize(1200, 628)
                .png()
                .toFile(`${targetDir}/${filename}.png`);

    } catch(err) {
        console.error("Eleventy generating social images error:", err, { template, filename, title, siteName});
    }

    return `${filename}${title}.png`;
};

/**
 * Generate social media images for post previews.
 */
export default function(eleventyConfig, options) {
    const {
        siteName,
        outputDir
    } = { ...defaults, ...options };

    // generate output directory if it does not exist
    const sep = path.sep;
    const targetDir = path.normalize(outputDir);
    const initDir = path.isAbsolute(targetDir) ? sep : '';
    targetDir.split(sep).reduce((parentDir, childDir) => {
        const curDir = path.resolve(parentDir, childDir);
        if (!fs.existsSync(curDir)) {
            fs.mkdirSync(curDir);
        }
        return curDir;
    }, initDir);

    eleventyConfig.addAsyncShortcode("GenerateSocialImage", async(filename, title) => {
        if (!title) return '';

        return await generateSocialImage(
			filename,		// file-name
			title,												// title
			siteName											// site-name
		);
    });
};

