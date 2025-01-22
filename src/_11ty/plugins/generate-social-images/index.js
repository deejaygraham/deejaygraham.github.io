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

    const title_lines = splitLongLine(title);

    const template = `<svg width="1200" height="628" viewbox="0 0 1200 628" xmlns="http://www.w3.org/2000/svg">  
    
    
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

