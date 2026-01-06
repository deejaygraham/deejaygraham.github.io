export default function (content) {
  // needs matching p5-container on page for setup to work
  return `<script>${content}</script><details><summary>Source</summary><pre><code>${content}</code></pre></details>`;
};
