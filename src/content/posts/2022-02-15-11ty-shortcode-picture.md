---
title: 11ty Picture Shortcode
tags: [code, javascript, 11ty]
thumbnail: /img/thumbnails/eleventy-alt-420x255.png

---

Another tiny 11ty shortcode, this time to accept more than one parameter to a single shortcode.

Parameters follow the shortcode name and are comma separated, applied to the function in order as
you would expect.

### \_1tty/shortcodes/picture.js

```javascript

/\*\*

- Picture generates a consistent img with alt text and caption.
-
- picture src='../img/elephant.jpg', 'elephant', 'this is an elephant'
- \*/
  module.exports = function (src, alt, caption, width, height) {

const altText = alt || 'screenshot';

return `<figure class="screenshot">
<img src="${src}" alt="${altText}"
${width ? `width="${width}" ` : '' }
${height ? `height="${height}" `: '' }>
${caption ? `<figcaption>${caption}</figcaption>` : '' }

</figure>`;
};

```

Wrapping the markup in this way means we can change the img or figure tags in one place. Not much more to
say about it than that.
