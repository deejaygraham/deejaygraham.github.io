---
layout: post
title: Microbit Svg Test
tags: [microbit, 11ty]
---

This is a est post using my new "microbit" shortcode. This generates an SVG image of a simplified microbit graphic 
similar to [the official microbit artwork tool](https://microbit.org/design-your-microbit/v2/).

It supports passing a single string formatted as a microbit image or an array of string images so that I can show 
simple animations.

## 11ty Config

In common with all other shortcodes, it needs to be included in the 11ty config.

```js
import microbit from "./src/_11ty/shortcodes/microbit-diagram.js";
  ...
  eleventyConfig.addShortcode("microbit", microbit);
```

## Shortcode Implementation

The implementation is a line by line implementation of SVG rectangles and circles to build up the simplified 
microbit. A black rectangle with rounded corners for the body, grey buttons left and right for A and B. 
The LED 5x5 matrix is represented by 25 rectangles but with styling to allow for variations in brightness 
taken from the string passed into the shortcode. 

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

The styling has changed a little inside the SVG. Originally it was using a fill of red, but 
a series of decreasing filters applied to vary the brightness from 100% at "9" down to 0% at "0".
I discovered that fills and filters are not supported in WebKit (Safari) except on the parent 
SVG so the LEDs were always rendered at full brightness even with a filter colour of 0% brightness. 

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

The idea behind providing an animation function is to give an approximation of what the display 
of the microbit would look like when running the example code. A sort of gif
quality without the hassle of videoing an actual microbit running the example 
code and exporting that as a gif. I wanted the cleanness of the SVG rendering
but wrapped up in a nice shortcode to hide all the nasty processing.

The shortcode can take an array of strings, in common with the real microbit display API, each one 
denoting the state of the 5x5 screen at a point in time. Each of these strings is 
generated as a single animation "frame" and the SVG will cycle between them to provide a 
crude animation.

```md
set frames = ["90999:90909:90999:90009:90999", "00999:00909:00909:00909:00999"] 
microbit frames 
```

Since it's only the display that is going to be animated, the rest of the graphic - body, buttons etc - stays 
the same but the rendering of the 5x5 display will change according to which LEDs are lit and which are not.

After trying a few different ways of animating a set of SVG elements that didn't fully work 
on all browsers, I hit on the idea of wrapping each of the display frames in a <g> tag.

Each g tag can have an id and a style tag applied to them so that each one can be individually 
referenced in the DOM and their style manipulated. Essentially, each g tag creates a frame of the 
animation and we cycle through them by showing each one in turn and hiding the rest, a bit like an 
[old-fashioned flip book](https://en.wikipedia.org/wiki/Flip_book)

SVG supports embedding a script tag inside it, so we render all the  
display frames and use CSS to turn off all but the first one. Then 
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

## Prefix

Each frame of the animation needs a known id so the javascript can cycle through the 
showing and hiding code. This causes a problem if you have two microbit shortcodes on the 
same page because the ids will clash. I provided an extra parameter for the shortcode 
so that the frame ids can have a prefix unique to each instance. 

```md
microbit "09090:99999:99999:09990:00900" micro_a

microbit "99999:99999:99999:09990:99999" micro_b
```
