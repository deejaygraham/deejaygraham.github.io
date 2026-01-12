export default function (content, id, filename) {
  const container = `<div id="${id}" class="p5-container" data-prefix="p5-sketch"></div>`;
  const scriptLink = `<script src="/js/${filename}"></script>`;
  return container + '\n' + scriptLink + '\n' + content; // `<details><summary>Source</summary>${content}</details>`;
};
