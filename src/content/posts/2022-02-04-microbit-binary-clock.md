---
title: Microbit Binary Clock
tags: [code, microbit, python]
---

I managed to find a microbit (most of them put away due to not teaching for a while) and ported over the clock from yesterday's
post to run on it. Most of the code stayed the same with the main difference being the binary string is now 0s or 9s rather than 0 or 1,
just so that the display would be bright enough.

## Code

```python

{% include 'code/python/microbit/binary-clock.py' %}

```

25 bits of counting gives 2 ^ 24 possible values, which one per second, gives us about 194 days of counting before it resets
back to zero again. If the microbit had had one more bit then we could have had enough time to count out a full year.

![clock](/assets/img/posts/microbit-binary-clock/clock.jpg)

Without knowing anything about how binary works, I think the program makes for a nice, calming display that twinkles away
as it counts but does put me somewhat in mind of those old fashioned 60s computers where there would be random blinking lights
flashing to show that something was happening in a high-tech way.

## Update

I made some changes to the microbit code above to allow for adjustment of the number of bits in the clock using the buttons and resetting 
using the shake gesture.
