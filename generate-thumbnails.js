// generate thumbnails for posts that don't have them.
const fs = require('fs');
const path = require('path');

// Function to check and create the file if it doesn't exist
function checkAndCreateFile(directory, fileName) {
    const filePath = path.join(directory, fileName);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {

            
            // File does not exist, create it
            fs.writeFile(filePath, '', (err) => {
                if (err) {
                    console.error(`Error creating file in ${directory}:`, err);
                } else {
                    console.log(`File created in ${directory}`);
                }
            });
        } else {
            console.log(`File already exists in ${directory}`);
        }
    });
}

// Function to iterate through directories recursively
function generateImagesInSubdirectories(directory, fileName) {
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
