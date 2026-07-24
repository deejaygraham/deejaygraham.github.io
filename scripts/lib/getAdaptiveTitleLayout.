export default function getAdaptiveTitleLayout(title, splitLongLine, options = {}) {
  const {
    maxLines = 4,
    maxFontSize = 90,
    minFontSize = 48,
    fontStep = 2,
    maxTextWidth = 580,
    avgCharWidthFactor = 0.56,
    lineHeightFactor = 1.15,
  } = options;

  for (let fontSize = maxFontSize; fontSize >= minFontSize; fontSize -= fontStep) {
    const approxCharsPerLine = Math.max(
      8,
      Math.floor(maxTextWidth / (fontSize * avgCharWidthFactor))
    );

    const lines = splitLongLine(title, approxCharsPerLine, maxLines);

    const longestLineLength = Math.max(...lines.map(line => line.length), 0);
    const estimatedLongestLineWidth =
      longestLineLength * fontSize * avgCharWidthFactor;

    if (estimatedLongestLineWidth <= maxTextWidth) {
      return {
        fontSize,
        lineHeight: Math.round(fontSize * lineHeightFactor),
        lines,
      };
    }
  }

  // Fallback if even the minimum font size does not fit well enough
  const fallbackFontSize = minFontSize;
  const fallbackCharsPerLine = Math.max(
    8,
    Math.floor(maxTextWidth / (fallbackFontSize * avgCharWidthFactor))
  );

  return {
    fontSize: fallbackFontSize,
    lineHeight: Math.round(fallbackFontSize * 1.15),
    lines: splitLongLine(title, fallbackCharsPerLine, maxLines),
  };
}
