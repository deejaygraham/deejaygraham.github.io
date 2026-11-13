const SEARCH_HIGHLIGHT_PARAM = "q";
const SEARCH_HIGHLIGHT_CONTAINER = ".site-prose";
const IGNORED_ELEMENTS = "mark, script, style, noscript, textarea, pre, code, svg";

const escapeRegularExpression = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const markMatches = (textNode, searchTerm) => {
  const expression = new RegExp(escapeRegularExpression(searchTerm), "gi");
  const text = textNode.nodeValue;
  const fragment = document.createDocumentFragment();
  let match;
  let previousIndex = 0;

  while ((match = expression.exec(text)) !== null) {
    fragment.append(text.slice(previousIndex, match.index));

    const mark = document.createElement("mark");
    mark.textContent = match[0];
    fragment.append(mark);

    previousIndex = match.index + match[0].length;
  }

  if (previousIndex === 0) {
    return;
  }

  fragment.append(text.slice(previousIndex));
  textNode.replaceWith(fragment);
};

export const highlightSearchTerm = () => {
  const searchTerm = new URLSearchParams(window.location.search)
    .get(SEARCH_HIGHLIGHT_PARAM)
    ?.trim();
  const container = document.querySelector(SEARCH_HIGHLIGHT_CONTAINER);

  if (!searchTerm || !container) {
    return;
  }

  const textNodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) =>
      node.parentElement?.closest(IGNORED_ELEMENTS)
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT,
  });

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach((textNode) => markMatches(textNode, searchTerm));
};
