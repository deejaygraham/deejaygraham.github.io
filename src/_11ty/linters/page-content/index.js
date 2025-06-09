export default function(content, inputPath, outputPath) {

  if (!outputPath.endsWith(".html")) return;
  const imageMarkdown = /\!\[|\]\(/gi;
  
  let count = 0;
  if (content.match(imageMarkdown)) {
    count++;
    console.error(`\t${count} - Image markdown not rendered correctly (${inputPath})`);
  }
};
