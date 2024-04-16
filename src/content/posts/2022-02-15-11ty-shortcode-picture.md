---
permalink: 2022/02/15/11ty-shortcode-picture/
layout: post
title: 11ty Picture Shortcode
published: true
categories: [code, javascript, 11ty]
thumbnail: img/thumbnails/eleventy-alt-420x255.png
alttext: 11ty
---

Another tiny 11ty shortcode, this time to accept more than one parameter to a single shortcode.

Parameters follow the shortcode name and are comma separated, applied to the function in order as 
you would expect. 


### _1tty/shortcodes/picture.js 

```js

/**
 * Picture generates a consistent img with alt text and caption.
 * 
 * picture src='../img/elephant.jpg', 'elephant', 'this is an elephant'
 * 
 */
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