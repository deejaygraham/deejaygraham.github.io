// generate thumbnails for posts that don't have them.
import fs from 'fs';
import path from 'path';
import sharp from "sharp";

const getRandomWord = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

const getLongestWord = (array) => {
    return array.reduce((longest, currentWord) => {
        return currentWord.length > longest.length ? currentWord : longest;
    }, '');
} 

const enforceMaxLength = (word, maxLength) => {
    return word.length > maxLength ? word.slice(0, maxLength) : word;
}

const colourPalettes = [
    { foreground: '#FFFFFF', background: '#000000' },
    { foreground: '#000000', background: '#FFFFFF' },
    { foreground: '#FF5733', background: '#C70039' },
    { foreground: '#DAF7A6', background: '#FFC300' },
    { foreground: '#581845', background: '#900C3F' },
    { foreground: '#1C1C1C', background: '#F2F2F2' },
    { foreground: '#2ECC71', background: '#1ABC9C' },
    { foreground: '#3498DB', background: '#2980B9' },
    { foreground: '#E74C3C', background: '#C0392B' },
    { foreground: '#9B59B6', background: '#8E44AD' },
    { foreground: '#34495E', background: '#2C3E50' },
    { foreground: '#F39C12', background: '#E67E22' },
    { foreground: '#D35400', background: '#E74C3C' },
    { foreground: '#16A085', background: '#1ABC9C' },
    { foreground: '#27AE60', background: '#2ECC71' },
    { foreground: '#2980B9', background: '#3498DB' },
    { foreground: '#8E44AD', background: '#9B59B6' },
    { foreground: '#2C3E50', background: '#34495E' },
    { foreground: '#E67E22', background: '#F39C12' },
    { foreground: '#C0392B', background: '#D35400' }
];

const getRandomPalette = (palettes) => {
    const randomIndex = Math.floor(Math.random() * palettes.length);
    return palettes[randomIndex];
}

// Function to check and create the file if it doesn't exist
const checkAndCreateFile = (directory, fileName) => {
    const filePath = path.join(directory, fileName);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          // File does not exist, create it
          const start_x = 25;
          const start_y = 150;
          const font_size = 50;
          const font_weight = 700;
          const colours = getRandomPalette(colourPalettes);

          // get first word or slug ???
          const slug = path.basename(directory);
          const postTitle = slug.split('-');

          const title = enforceMaxLength(getLongestWord(postTitle), 12);
        
          const svgTitle = `<text x="${start_x}" y="${start_y}" fill="${colours.foreground}" font-size="${font_size}px" font-weight="${font_weight}">${title}</text>`;;
        
          const graphicWidth = 420;
          const graphicHeight = 255;
            
          const template = `<svg width="${graphicWidth}" height="${graphicHeight}" viewbox="0 0 ${graphicWidth} ${graphicHeight}" xmlns="http://www.w3.org/2000/svg">  
  	        <rect x="0" y="0" width="${graphicWidth}" height="${graphicHeight}" rx="0" ry="0" fill="${colours.background}" />
    	        <g style="font-family:'Consolas', 'Courier New'">
  		            ${svgTitle}
                </g>
            </svg>`;
            
          try {
            console.log(`Creating file ${fileName} in ${directory}`);
            // generate the image from the svg        
            const svgBuffer = Buffer.from(template);

            sharp(svgBuffer)
              .resize(graphicWidth, graphicHeight)
              .png()
              .toFile(filePath);
          } catch(err) {
            console.error("Eleventy generating social images error:", err, { template, filename, title, siteName});
          }
        } else {
            console.log(`File ${fileName} already exists in ${directory}`);
        }
    });
}

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

const convertFilenameToPath = (filename) => {
    const [year, month, day, ...rest] = filename.split('-');
    return rest.join('-').replace('.md', '');
};

const createSubDirectory = (sourceDir, destDir, filename) => {
    const newPath = convertFilenameToPath(filename);
    const newDirPath = path.join(destDir, newPath);

    fs.access(newDirPath, fs.constants.F_OK, (err) => {
        if (err) {
            // Directory does not exist, create it
            fs.mkdir(newDirPath, { recursive: true }, (err) => {
        
                if (err) {
                    console.error(`Error creating directory ${newDirPath}:`, err);
                } else {
                    console.log(`Directory created: ${newDirPath}`);
                }
            });
        } else {
            console.log(`Directory already exists: ${newDirPath}`);
        }
    }); 
};

const createPostImageFolders = (sourceDir, destinationDir) => {
    fs.readdir(sourceDir, (err, files) => {
        if (err) {
            console.error(`Error reading directory ${sourceDir}:`, err);
            return;
        }

        files.forEach((file) => {
            if (path.extname(file).toLowerCase() === '.md') {
                createSubDirectory(sourceDir, destinationDir, file);
            }
        });
    });
};

// Top-level directory to start from
const postDirectory = './src/content/posts';
const imageDirectory = './src/assets/img/posts';
// File name to check/create
const fileName = 'thumbnail-420x255.png';
createPostImageFolders(postDirectory, imageDirectory);
generateImagesInSubdirectories(imageDirectory, fileName);
