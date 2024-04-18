---
permalink: 2022/02/10/11ty-year-shortcode/
layout: post
title: 11ty Year Shortcode
published: true
tags: [code, javascript, 11ty]
thumbnail: img/thumbnails/eleventy-alt-420x255.png
alttext: 11ty
---

This is the tiniest [11ty](https://www.11ty.dev) shortcode I can come up with while gaining experience for all the 
potentially weird things I'm going to have to do for these new site migrations.

Lots of places we need a copyright or something similar where we just need the current year when the page was generated. 

### _1tty/shortcodes/year.js 

```js

module.exports = function() {
    return `${new Date().getFullYear()}`;
}

```

and in the markdown the name of the sortcode needs to appear bookended by moustaches.
