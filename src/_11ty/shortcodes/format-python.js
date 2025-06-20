import { readFile, writeFile } from 'fs/promises';
import { basename } from 'path';

export default function (content) {
  try {
    const lines = content.split('\n');
    const indentStack = [0];
    const formattedLines = [];

    for (let line of lines) {
      const trimmed = line.trim();
      if (trimmed === '') {
        formattedLines.push('');
        continue;
      }

      const leadingSpaces = line.match(/^ */)[0].length;

      while (
        indentStack.length > 1 &&
        leadingSpaces < indentStack[indentStack.length - 1]
      ) {
        indentStack.pop();
      }

      if (trimmed.endsWith(':')) {
        indentStack.push(indentStack[indentStack.length - 1] + 4);
      }

      const currentIndent = indentStack[indentStack.length - 1];
      formattedLines.push(' '.repeat(currentIndent) + trimmed);
    }

    return formattedLines.join('\n');
  } catch (err) {
    console.error('Error:', err);
  }
}
