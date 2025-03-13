---
title: Turning It Up to 11ty
tags: [code, javascript, 11ty]
thumbnail: /img/thumbnails/eleventy-alt-420x255.png
alttext: 11ty
---

Finally fully committed to migrating two sites from wordpress/weird CMS both to markdown handled by [11ty](https://www.11ty.dev).

Each of them need a few customisations so I will be documenting these here as we go along.

It might be worth noting that I am using a stock forlder format as recommended by the (excellent) 11ty docs plus notes from
[11ty Rocks](https://11ty.rocks), [Stephanie Eckles](https://twitter.com/5t3ph) and [Zach Leatherman](https://www.zachleat.com/web/eleventy/).
One slight difference is in the .eleventy.js config file where I prefer not to put non-public plugins, shortocdes and filters inline in
the config but require them from a file under the \_11ty folder.

```javascript
module.exports = eleventyConfig => {

    eleventyConfig.addShortcode('screenshot', require("./_11ty/shortcodes/screenshot.js"));

}
```
