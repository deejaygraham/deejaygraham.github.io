---
title: Simple Thumbnail Generator
tags: [code, python, processing]
thumbnail: /img/posts/simple-thumbnail-generator/thumbnail-420x255.png
alttext: screenshot
---

Writing short articles for this blog, one of the hardest problems is coming up with a relevant, nice looking thumbnail image
to put into the index page gallery alongside the others. Most of the time, I use screenshots or images from the post but sometimes
my imagination falls short and I can't think what to use, especially for abstract subjects.

So, of course, the "solution" I came up with was to write a tiny bit of processing code to generate a coloured background
and a piece of text, at the right pixel size I use, to act as the thumbnail.

```python

size(420, 255)
f = createFont("Georgia", 72)
textFont(f)
background(255, 120, 88)
textAlign(LEFT)
fill(255)
text("thumbs", 40, 210)  
saveFrame("thumbnail-420x255.png")

```

The code is essentially all I have described, a font for the text, a background colour, a text colour and the text
to render at a suitable place on the block. Then we save out the graphic right at the end. The thumbnail for this
post was generated using the exact code.

Changing the text is a matter of what works for the subject of the post but colours could be made more interesting
by using random foreground and background colours. I made the switch from RGB to HSB colour mode because the random
function seemed better suited to creating nicer colours with that mode.

```python

size(420, 255)
f = createFont("Georgia", 72)
textFont(f)
colorMode(HSB, 255)
background(random(0, 255), 127, 242)
textAlign(LEFT)
fill(random(0, 255), 127, 242)

text("lint.md", 40, 210)  
saveFrame("thumbnail-420x255.png")

```
