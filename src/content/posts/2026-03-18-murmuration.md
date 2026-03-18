---
layout: post
title: Murmuration
p5embed: true
tags: [javascript, p5]
---

This is an adaptation of the [Flocking example code](https://p5js.org/examples/classes-and-objects-flocking/) from [p5js](https://p5js.org/) 
and based on the earlier work of [Craig Reynolds](http://www.red3d.com/cwr/) Boids.  

{% p5embed "flocking", "flocking.js" %}

The main changes are in drawing a gradient background to simulate the evening sky, changing the boid rendering from a directed arrow to a small dot 
such as you would observe if you were looking at actual small birds moving in the sky at dusk. I have included some extra refinements to allow the flock 
to leave the field of view on the left, right or top of the screen but to avoid crashing into the ground at the bottom to make the murmuration feel a lot 
more natural than the original. 

```js
{% include "code/p5js/flocking.js" %}
```

{% endp5embed %}
