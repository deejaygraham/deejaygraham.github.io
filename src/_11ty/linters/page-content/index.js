const IMAGE_MARKDOWN = /!\[(?<altText>.*)\]\s*\((?<imageURL>[^)\s]+)\)/g;
const NON_PROSE_HTML = /<(?:pre|code|script|style)\b[^>]*>[\s\S]*?<\/(?:pre|code|script|style)>/gi;

export function stripNonProseHtml(html) {
  return html.replace(NON_PROSE_HTML, "");
}

export function findImageMarkdownIssues(content) {
  const prose = stripNonProseHtml(content);
  const issues = [];

  for (const match of prose.matchAll(IMAGE_MARKDOWN)) {
    issues.push(`Image markdown not rendered: ${match[0]}`);
  }

  return issues;
}

export function lintPageContent(content, inputPath, outputPath) {
  if (!outputPath?.endsWith(".html")) {
    return [];
  }

  return findImageMarkdownIssues(content).map(
    (issue) => `${issue} (${inputPath})`,
  );
}

export default function pageContentLinter(content, inputPath, outputPath) {
  const issues = lintPageContent(content, inputPath, outputPath);

  if (issues.length === 0) {
    return;
  }

  for (const [index, issue] of issues.entries()) {
    console.error(`\t${index + 1} - ${issue}`);
  }

  if (process.env.ELEVENTY_RUN_MODE === "build") {
    throw new Error(
      `Page content lint failed for ${inputPath}: ${issues.length} issue(s)`,
    );
  }
}
