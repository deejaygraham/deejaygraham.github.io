// wrap a piece of mermaid js diagram in the correct tags
// https://mermaid.js.org/intro/getting-started.html

// if mermaid set in frontmatter 
// add <script type="module">import mermaid from 'The/Path/In/Your/Package/mermaid.esm.mjs'; mermaid.initialize({ startOnLoad: true }); </script>
export default function (content) {
  return `<pre class="mermaid">${content}</pre>`;
}
