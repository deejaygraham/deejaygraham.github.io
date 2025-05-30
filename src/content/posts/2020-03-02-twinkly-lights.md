---
title: Microbit Twinkly Lights
tags: [code, microbit]
hero: microbit


---

Since it's nowhere near Christmas, I can't justify posting this code sample
except as a tribute to Frank Zappa's "City of Tiny Lights".

This sample uses randomisation to turn on pixels on the microbit display and then let them fade out over time to create a "twinkly" effect.

```python

{% include 'code/python/microbit/twinkly.py' %}

```

The probablility of lighting a pixel and the rate at which they fade out are variables at the top of the program and contribute a lot to the actual effect. Too likely a probability and too many pixels are lit at once, too fast or slow a fade doesn't give the right winter sparkle we are going for. The values I have
here, and also the delay between the lighting and fading halves, are just what I found from playing around.

And here it is in action...

![microbit twinkling display](/assets/img/posts/twinkly-lights/twinkle.gif)
