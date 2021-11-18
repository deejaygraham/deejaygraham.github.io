---
layout: post
title: Circuit Playground Express Comet
published: true
categories: [code, playground]
thumbnail: "/img/thumbnails/playground-420x255.webp"
alttext: circuit playground
---

Continuing on with experimenting with the <a href="https://learn.adafruit.com/adafruit-circuit-playground-express/overview">Adafruit 
Circuit Playground Express</a> and the NeoPixels, I found <a href="https://learn.adafruit.com/fancyled-library-for-circuitpython/led-colors">a nice example</a> of 
a rotating colour wheel or comet as I like to think about it. The lead LED is white and circles around the board trailing a "tail" of gradually cooling colours 
behind it.  

![circuit playground showing LEDs lit in red](/img/posts/playground-comet/comet.webp)

I modified it slightly to add more red colours into the palette from the original so that it both has a longer tail and it burns out into darker colours. The spin 
rate determines the speed of the rotation of the "comet" around the board.

## Code 

```python
# comet.py 

{% include code/python/playground/comet.py %}

```
