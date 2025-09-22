import fs from "fs";
import path from "path";
import generateSocialImage from "./generateSocialImage.js";

// based on https://github.com/manustays/eleventy-plugin-generate-social-images/
// test using https://opengraph.dev

const defaults = {
    siteName: "",
    outputDir: "_site/img/previews",
    watermark: "./src/assets/img/favicon.png",
};

/**
 * Generate social media images for post previews.
 */
export default function(eleventyConfig, options) {
    const {
        siteName,
        outputDir,
	watermark
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

	eleventyConfig.addShortcode("SocialImageName", async(imageName) => {
		const fileName = imageName + '.png';
	  	return = `${targetDir}/${fileName}`;
  	});
	
    eleventyConfig.addShortcode("GenerateSocialImage", async(imageName, title, postDate) => {
        if (!title) return 'Blank title, no image generated';

        return await generateSocialImage(
			imageName,	
			title,		
            postDate,
			siteName,
            targetDir,
		watermark
		);
    });
};
