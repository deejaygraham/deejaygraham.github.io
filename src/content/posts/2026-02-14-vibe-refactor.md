---
layout: post
title: Vibe Refactor
p5embed: true
tags: [javascript, p5]
---

What would it look like to have some existing code randomly changed ("refactored") by an "AI" in 
vibe coding mode? 

Here we are running a simple finite state machine that goes through periods of "thinking"; deciding what to change; 
navigating to the spot in the code; making an edit; moving on.

{% p5embed "vibe-refactor", "vibe-refactor.js" %}

This is example code from the original "K&R" (white) book describing the C programming language. 

No thought is given to conforming to correct C syntax, we only try to change numbers for other numbers, attempt to keep 
the same casing for letters and replace punctuation with other punctuation. 

By running this long enough, we should have something totally unrecognizable and certainly not able to compile as valid code. 

```js
{% include "code/p5js/vibe-refactor.js" %}
```

{% endp5embed %}
