import fs from "fs";
import path from "path";
import generateSocialImage from "./generateSocialImage.js";

// based on https://github.com/manustays/eleventy-plugin-generate-social-images/
// test using https://opengraph.dev

const defaults = {
    siteName: "",
    outputDir: "_site/img/previews"
};

/**
 * Generate social media images for post previews.
 */
export default function(eleventyConfig, options) {
    const {
        siteName,
        outputDir
    } = { ...defaults, ...options };

    // create output directory if it does not exist
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

    eleventyConfig.addAsyncShortcode("GenerateSocialImage", async(imageName, title, postDate) => {
        if (!title) return '';

	console.log(`[eleventy-plugin-geb-social-image] INFO Eleventy plugin generating social image: ${imageName} in ${targetDir}`);
        return await generateSocialImage(
			imageName,	
			title,		
            postDate,
			siteName,
            targetDir	
		);
    });
};
