export default function (content, id, filename) {
  const container = `<div id="${id}" class="p5-container" data-prefix="p5-sketch"></div>`;
  const scriptLink = `<script src="/js/${filename}"></script>`;
  const detailStart = "<details><summary>Source</summary>";
  const detailEnd = "</details>";
  return container + '\n' + scriptLink + '\n' + detailStart + '\n' + content + '\n' + detailEnd; 
};
