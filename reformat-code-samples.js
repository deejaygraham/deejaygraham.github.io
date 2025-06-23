import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderPath = path.join(__dirname, './src/content/posts');
const backupFolderPath = path.join(__dirname, './src/content/backup');

function backupFiles() {
  if (!fs.existsSync(backupFolderPath)) {
    fs.mkdirSync(backupFolderPath);
  }
  for (const file of fs.readdirSync(folderPath)) {
    if (file.endsWith('.md')) {
      fs.copyFileSync(
        path.join(folderPath, file),
        path.join(backupFolderPath, file)
      );
    }
  }
}

function formatCodeBlock(code, lang) {
  try {
    if (lang === 'js' || lang === 'javascript') {
      return execSync('npx prettier --parser babel', {
        input: code,
        encoding: 'utf8'
      });
    } else if (lang === 'py' || lang === 'python') {
      const tmpPath = path.join(__dirname, 'tmp_code.py');
      fs.writeFileSync(tmpPath, code);
      execSync(`black ${tmpPath} --quiet`);
      return fs.readFileSync(tmpPath, 'utf8');
    }
  } catch (error) {
    console.error(`Error formatting ${lang} code:`, error.message);
  }
  return code;
}

function processMarkdownFiles() {
  for (const file of fs.readdirSync(folderPath)) {
    if (!file.endsWith('.md')) continue;

    const filePath = path.join(folderPath, file);
    let content = fs.readFileSync(filePath, 'utf8');

    const updatedContent = content.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      (match, lang, code) => {
        const cleanedLang = lang ? lang.trim().toLowerCase() : '';
        const formatted = formatCodeBlock(code, cleanedLang);
        return `\`\`\`${lang || ''}\n${formatted}\`\`\``;
      }
    );

    fs.writeFileSync(filePath, updatedContent);
    console.log(`Processed ${file}`);
  }
}

backupFiles();
processMarkdownFiles();
