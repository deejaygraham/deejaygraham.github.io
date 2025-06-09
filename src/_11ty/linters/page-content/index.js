module.exports = function(content, inputPath, outputPath) {

if (!outputPath.endsWith(".html")) return;

let count = 0;

let tableMarkup = /\| ---/gi;

  if (content.match(tableMarkup)) {
    count++;
    console.error(`\t${count} - Incorrectly formatted table (${inputPath})`);
  }
};
