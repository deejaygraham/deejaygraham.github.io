import fs from "fs";
import path from "path";
import sharp from "sharp";

const defaults = {
    siteName: "",
    outputDir: "_site",
    imageDir: "previews",
    dataFile: "pages.json",
    templatePath: "", // needed ??
    stylesPath: "",// needed ??
    width: 600,// needed ??
    height: 315,// needed ??
    deviceScaleFactor: 2,// needed ??
};

/**
 * Generate social media images for post previews.
 */
export default function(eleventyConfig, options) {
    const {
        siteName,
        outputDir,
        imageDir,
        dataFile,
        templatePath, 
        stylesPath,
        width,
        height,
        deviceScaleFactor,
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

    eleventyConfig.addAsyncShortcode("GenerateSocialImage", async(title) => {

    });
};

