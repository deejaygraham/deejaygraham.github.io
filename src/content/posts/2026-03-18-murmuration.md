---
layout: post
title: Murmuration
p5embed: true
tags: [javascript, p5]
---

This is an adaptation of the [Flocking example code](https://p5js.org/examples/classes-and-objects-flocking/) from [p5js](https://p5js.org/) 
and based on the earlier work of [Craig Reynolds](http://www.red3d.com/cwr/) Boids.  

## Edge Avoidance

First thing to change was removing the screen wrapping behaviour where boids would leave at one edge of the screen and appear at the opposite edge. I added refinements to 
allow the flock to move around the field of view by creating a soft steering force to push boids away from the edges before they cross them and particularly to avoid 
crashing into the ground at the bottom of the screen. The steering strength is proportional to how close the boid is to the nearest edge. Instead of steering directly 
away from the edge, we steer toward a curved, tangential direction that blends the boid’s current heading with a safe direction. This, I hope, makes the 
murmuration feel a lot more natural as the arc away from the edges of the screen. 


## Twilight

I added a simple background gradient to simulate a sunset with blue merging gradually into an deep, fiery sunset orange. The original code caused some confusion here 
because the setup and transformation/translate drawing code meant that the gradient was rendedered bottom to top, instead of top to bottom as I intended. 


## Performance

I wanted some more birds in the murmuration than the default 100, closer to 250 or so, which meant that the existing drawing code was a bit too involved to make the 
rendering convincing. There were several things I did here. First was to remove all the pop/push, translate and triangle drawing code. I rendered each boid as a single 
pixel. Next, I create the sky as a graphics object and render it once in startup code and then blt the image onto the screen for each frame. Lastly, I reduced the number of 
checks between boids so that an individual only checks its nearest neighbours rather than everyone in the flock. 

This was done using a spatial partition with the idea that if we create a grid overlay to the screen and assess which cell a boid is in, we can check it's nearest neighbours in that grid: 
the boids in that cell with it; the boids directly around the eight cells surrounding that cell in the worst case.  


{% p5embed "flocking", "flocking.js" %}

```js
{% include "code/p5js/flocking.js" %}
```

{% endp5embed %}
