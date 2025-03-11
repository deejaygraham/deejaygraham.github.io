// generate thumbnails for posts that don't have them.
import fs from 'fs';
import path from 'path';
import sharp from "sharp";

const getRandomWord = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

// Function to check and create the file if it doesn't exist
const checkAndCreateFile = (directory, fileName) => {
    const filePath = path.join(directory, fileName);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          // File does not exist, create it

          const lineBreakAt = 15; // characters
          const line_length = lineBreakAt;
          const max_lines = 4;
          const start_x = 50;
          const start_y = 150;
          const line_height = 120; 
          const font_size = 120;
          const font_weight = 700;
          const site_font_size = 25;
          const titleColour = '#FF6C23'; // 000
          const siteNameColour = "#FEEFDA"; // 000
          const bgColour = "#1D1F1E"; // FFF

          // get first word or slug ???
          const slug = path.basename(directory);
          const wordsArray = slug.split('-');

          const title = getRandomWord(wordsArray);
        
          const svgTitle = `<text x="${start_x}" y="${start_y_middle}" fill="${titleColour}" font-size="${font_size}px" font-weight="${font_weight}">${line}</text>`;;
        
          const graphicWidth = 420;
          const graphicHeight = 255;
            
          const template = `<svg width="${graphicWidth}" height="${graphicHeight}" viewbox="0 0 ${graphicWidth} ${graphicHeight}" xmlns="http://www.w3.org/2000/svg">  
  	        <rect x="0" y="0" width="${graphicWidth}" height="${graphicHeight}" rx="0" ry="0" fill="${bgColour}" />
    	        <g style="font-family:'Consolas', 'Courier New'">
  		            ${svgTitle}
                </g>
            </svg>`;
            
          try {
            // generate the image from the svg        
            const svgBuffer = Buffer.from(template);

            await sharp(svgBuffer)
              .resize(graphicWidth, graphicHeight)
              .png()
              .toFile(filePath);
          } catch(err) {
            console.error("Eleventy generating social images error:", err, { template, filename, title, siteName});
          }
        } else {
            console.log(`File already exists in ${directory}`);
        }
    });
}

// Function to iterate through directories recursively
const generateImagesInSubdirectories = (directory, fileName) => {
    fs.readdir(directory, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error(`Error reading directory ${directory}:`, err);
            return;
        }

        files.forEach((file) => {
            const fullPath = path.join(directory, file.name);

            if (file.isDirectory()) {
                generateImagesInSubdirectories(fullPath, fileName);
            } else if (file.isFile() && file.name === fileName) {
                // File already exists, no need to create
                console.log(`File already exists in ${directory}`);
            }
        });

        // Check and create the file in the current directory
        checkAndCreateFile(directory, fileName);
    });
}

// Top-level directory to start from
const topLevelDirectory = './src/assets/img/posts';
// File name to check/create
const fileName = 'thumbnail-420x255.png';
generateImagesInSubdirectories(topLevelDirectory, fileName);
