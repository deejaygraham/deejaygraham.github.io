---
layout: post
title: Microbit Canvas
tags: [microbit, javascript]
---

Following on from my 11ty shortcode to generate a simplified microbit ui as an SVG image, I wanted to explore making something 
similar but using the canvas API in the browser. I adapted the original shortcode javascript to work with a 2D context API 
and this is what I came up with, an almost exact rendering of the original SVG.


## Canvas

Each instance is rendered at page load by finding all of the elements with a data-microbit attribute. That attribute is used as the 
brightness string to show in the LED matrix. The full size rendering with all the lights lit:

```html
    <canvas id="mb1" width="721" height="565" data-microbit="05432:98765:99999:99999:99990"></canvas>
```

<canvas id="mb1" width="721" height="565" data-microbit="05432:98765:99999:99999:99990"></canvas>


Of course, the image can be scaled down and different LED combinations used.

```html
    <canvas id="mb2" width="360" height="282" data-microbit="22222:44444:66666:88888:99999"></canvas>
```

<canvas id="mb2" width="360" height="282" data-microbit="22222:44444:66666:88888:99999"></canvas>


## Code

The draw code is initiated on page load but would need to be modified in situations where we are maybe going to 
animate the display - later?

The remainder of the code does a lot of geometric work as in the original to position the buttons and display centrally 
and to work out where to place the top left colour swatches. Each refresh of the page picks a random colour for the 
swatches, something that was only changed by the shortcode version when the whole site was rebuilt.

```js
{% include "scripts/microbit.js" %}
```

Also in this version, the rendering of the LED brightness on a 0-9 scale is done with a style opacity similar to the SVG one 
but sublty different.


## Animation

One feature that I haven't added yet is the ability to animate the display. I will look at that 
at some point, I am sure. 
