---
layout: post
title: Microbit Svg Test
tags: [microbit, python]
---

Test post using my new microbit shortcode. This generates an SVG image of a simplified microbit graphic 
similar to [the official microbit artwork tool](https://microbit.org/design-your-microbit/v2/).

For now, it supports passing a image string but may eventually be able to show animations.

## 11ty Config

```js
import microbit from "./src/_11ty/shortcodes/microbit-diagram.js";
  ...
  eleventyConfig.addShortcode("microbit", microbit);
```

## Shortcode Implementation

```js
export default function (image) {
  const svgBuilder = []

  // wrap it in a figure...
  svgBuilder.push('<figure class="image" >');  
  svgBuilder.push(`<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" role="img">`);
  svgBuilder.push("<style>");
  // ...
  svgBuilder.push(".microbit-body { fill: black; } ");
  svgBuilder.push(".led_0 { fill: #100; } ");
  // ...
  svgBuilder.push(".led_9 { fill: #f00; } ");
  svgBuilder.push("</style>");

  svgBuilder.push(`<rect width="${width}" height="${height}" rx="${corner}" class="microbit-body" />`);
  // ...  
  svgBuilder.push("</svg>");
  svgBuilder.push("</figure>");
  
  return svgBuilder.join("\n");
}
```

The styling has changed a little inside the SVG. I discovered that 
fills and filters are not supported in WebKit except on the parent 
SVG so the LEDs were always rendered at full brightness event with 
a filter colour of 0% brightness. 

## Default

A default version of the microbit turns on all the LEDs in the 5x5 matrix.

```md
microbit
```

{% microbit %}

## Heart

Supplying a string parameter to the shortcode interprets it as a microbit image string, with 
colon separators between rows.

```md
microbit "09090:99999:99999:09990:00900"
```

{% microbit "09090:99999:99999:09990:00900" %}

For now, I will maybe go back and add some visualizations to some of the code examples on posts I have 
already published.


## Animation 

The idea behind animating some of these SVGs is to give a sort of Gif
quality without the hassle of videoing an actual microbit running the example 
code and converting that to a gif. I wanted the cleanness of the SVG rendering
so I could show in simpler form what the screen of the microbit should 
look like when running the code.

The microbit shortcode can take a single image string or an array of strings 
denoting the state of the 5x5 screen. The code would generate each of these 
screens or animation frames and be able to cycle between them as a crude 
animation.

After trying a few different ways of animating a set of SVG elements, I hit 
on the idea of wrapping each of the 5x5 matrix renderings in a <g> tag with a 
css style and an id. 

SVG supports adding a script tag embedded in the graphic, so we render each 
display frame as a set of rectangles and turn off all but the first one. Then 
the javascript kicks in and cycles through each of the frames, changing the 
styling of each frame in turn so that only one frame is shown at any one time. 
When the animation reaches the final frame, we loop back to the beginning and 
repeat.

Here is a slightly simplified version of the javascript I used.

```javascript
<script type="application/ecmascript"><![CDATA[
  const frameCount = 10;
  let current = 0;
  setInterval(() => {
    for (let i = 0; i < frameCount; i++) {
      const visibility = (i === current) ? "inline" : "none"
      document.getElementById("frame" + i).style.display = visibility;
    }
    current = (current + 1) % frameCount;
  }, 1000);
]]></script>
```