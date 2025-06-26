---
layout: post
title: Microbit Svg Test
---

Test post using my new microbit shortcode. This generates an SVG image of a simplified microbit graphic 
similar to [the official microbit artwork tool](https://microbit.org/design-your-microbit/v2/).

For now, it supports passing a image string but may eventually be able to show animations.

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
