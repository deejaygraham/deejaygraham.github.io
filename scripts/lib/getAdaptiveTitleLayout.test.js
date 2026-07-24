import test from "ava";
import getAdaptiveTitleLayout from "./getAdaptiveTitleLayout.js";

/**
 * A simple deterministic splitter for testing.
 * It splits on spaces and respects max line length/max lines as best it can.
 */
function fakeSplitLongLine(title, maxCharsPerLine, maxLines) {
  const words = title.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;

    if (candidate.length <= maxCharsPerLine) {
      current = candidate;
      continue;
    }

    if (current) {
      lines.push(current);
    }

    current = word;

    if (lines.length === maxLines - 1) {
      break;
    }
  }

  if (current && lines.length < maxLines) {
    lines.push(current);
  }

  return lines.slice(0, maxLines);
}

test("returns max font size for a short title that easily fits", t => {
  const result = getAdaptiveTitleLayout(
    "Short title",
    fakeSplitLongLine,
    {
      maxLines: 4,
      maxFontSize: 90,
      minFontSize: 48,
      maxTextWidth: 580,
      avgCharWidthFactor: 0.56,
      lineHeightFactor: 1.15,
    }
  );

  t.is(result.fontSize, 90);
  t.is(result.lineHeight, Math.round(90 * 1.15));
  t.true(Array.isArray(result.lines));
  t.true(result.lines.length >= 1);
  t.true(result.lines.length <= 4);
});

test("reduces font size for a longer title when width is constrained", t => {
  const shortResult = getAdaptiveTitleLayout(
    "Short title",
    fakeSplitLongLine,
    {
      maxLines: 4,
      maxFontSize: 90,
      minFontSize: 48,
      maxTextWidth: 580,
      avgCharWidthFactor: 0.56,
      lineHeightFactor: 1.15,
    }
  );

  const longResult = getAdaptiveTitleLayout(
    "This is a much longer blog post title that should require a smaller font size to fit cleanly within the available space",
    fakeSplitLongLine,
    {
      maxLines: 4,
      maxFontSize: 90,
      minFontSize: 48,
      maxTextWidth: 320,
      avgCharWidthFactor: 0.56,
      lineHeightFactor: 1.15,
    }
  );

  t.true(longResult.fontSize < shortResult.fontSize);
  t.true(longResult.fontSize >= 48);
  t.is(longResult.lineHeight, Math.round(longResult.fontSize * 1.15));
});

test("never returns a font size below minFontSize", t => {
  const result = getAdaptiveTitleLayout(
    "An extremely long title that goes on and on and on and on and on and on and on and on and on and on and on and on",
    fakeSplitLongLine,
    {
      maxLines: 4,
      maxFontSize: 90,
      minFontSize: 48,
      maxTextWidth: 300,
      avgCharWidthFactor: 0.56,
      lineHeightFactor: 1.15,
    }
  );

  t.true(result.fontSize >= 48);
});

test("lineHeight is derived from the chosen font size", t => {
  const result = getAdaptiveTitleLayout(
    "A medium length title for testing line height calculation",
    fakeSplitLongLine,
    {
      maxLines: 4,
      maxFontSize: 84,
      minFontSize: 50,
      maxTextWidth: 420,
      avgCharWidthFactor: 0.56,
      lineHeightFactor: 1.2,
    }
  );

  t.is(result.lineHeight, Math.round(result.fontSize * 1.2));
});

test("does not return more than maxLines lines", t => {
  const result = getAdaptiveTitleLayout(
    "This is a deliberately long title intended to wrap across multiple lines but should never exceed the configured maximum line count",
    fakeSplitLongLine,
    {
      maxLines: 3,
      maxFontSize: 90,
      minFontSize: 48,
      maxTextWidth: 420,
      avgCharWidthFactor: 0.56,
      lineHeightFactor: 1.15,
    }
  );

  t.true(result.lines.length <= 3);
});

test("uses fallback min font size when nothing fits at larger sizes", t => {
  // Force the function into fallback territory with a very narrow width.
  const result = getAdaptiveTitleLayout(
    "A very long title that cannot plausibly fit in the small width provided even after several reductions in font size",
    fakeSplitLongLine,
    {
      maxLines: 2,
      maxFontSize: 90,
      minFontSize: 40,
      fontStep: 5,
      maxTextWidth: 100,
      avgCharWidthFactor: 0.56,
      lineHeightFactor: 1.15,
    }
  );

  t.is(result.fontSize, 40);
  t.is(result.lineHeight, Math.round(40 * 1.15));
  t.true(result.lines.length <= 2);
});

test("returns at least one line for non-empty input", t => {
  const result = getAdaptiveTitleLayout(
    "Hello world",
    fakeSplitLongLine,
    {
      maxLines: 4,
      maxFontSize: 90,
      minFontSize: 48,
      maxTextWidth: 580,
    }
  );

  t.true(result.lines.length >= 1);
  t.is(result.lines[0], "Hello world");
});

test("handles a single very long word without crashing", t => {
  const result = getAdaptiveTitleLayout(
    "SupercalifragilisticexpialidociousUnbrokenTitleWord",
    fakeSplitLongLine,
    {
      maxLines: 4,
      maxFontSize: 90,
      minFontSize: 48,
      maxTextWidth: 300,
      avgCharWidthFactor: 0.56,
      lineHeightFactor: 1.15,
    }
  );

  t.truthy(result);
  t.true(Array.isArray(result.lines));
  t.true(result.lines.length >= 1);
  t.true(result.fontSize >= 48);
});

test("chooses a smaller font when maxTextWidth is reduced", t => {
  const wideResult = getAdaptiveTitleLayout(
    "A moderately long title for comparing available width effects",
    fakeSplitLongLine,
    {
      maxLines: 4,
      maxFontSize: 90,
      minFontSize: 48,
      maxTextWidth: 580,
      avgCharWidthFactor: 0.56,
      lineHeightFactor: 1.15,
    }
  );

  const narrowResult = getAdaptiveTitleLayout(
    "A moderately long title for comparing available width effects",
    fakeSplitLongLine,
    {
      maxLines: 4,
      maxFontSize: 90,
      minFontSize: 48,
      maxTextWidth: 320,
      avgCharWidthFactor: 0.56,
      lineHeightFactor: 1.15,
    }
  );

  t.true(narrowResult.fontSize <= wideResult.fontSize);
});

test("respects custom avgCharWidthFactor", t => {
  const narrowCharsResult = getAdaptiveTitleLayout(
    "Testing width factor sensitivity in the layout algorithm",
    fakeSplitLongLine,
    {
      maxLines: 4,
      maxFontSize: 90,
      minFontSize: 48,
      maxTextWidth: 580,
      avgCharWidthFactor: 0.45,
      lineHeightFactor: 1.15,
    }
  );

  const wideCharsResult = getAdaptiveTitleLayout(
    "Testing width factor sensitivity in the layout algorithm",
    fakeSplitLongLine,
    {
      maxLines: 4,
      maxFontSize: 90,
      minFontSize: 48,
      maxTextWidth: 580,
      avgCharWidthFactor: 0.65,
      lineHeightFactor: 1.15,
    }
  );

  t.true(wideCharsResult.fontSize <= narrowCharsResult.fontSize);
});
