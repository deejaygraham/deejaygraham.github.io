---
permalink: 2019/09/05/python-processing/
layout: post
title: Processing with Python
published: true
tags: [code, processing]
thumbnail: img/posts/python-processing/python-processing-420x255.webp
alttext: screenshot
---

The <a href="https://processing.org/">Processing</a> programming language/environment reminds me a bit of a mini-smalltalk  environment, in that I find it really useful to sketch out playful, experimental programs really easily. 

Up until this point, I had always been put off by by the fact that it seemed to be a Java-only and I have had much more 
success teaching with Python so I was reluctant to introduce another language learning curve if I was going to use this in 
any of my sessions. 

As you might have guessed from the title, although most projects you might come across are written in Java, processing 
does support Python and the support and <a href="https://py.processing.org/reference/">documentation</a> is pretty good. 

![screenshot](/img/posts/python-processing/python-processing-ui.webp)

Here are a couple of key features to consider:

### Setup

A <a href="https://py.processing.org/reference/setup.html">setup</a> method is the first thing that gets called in processing to configure screen size, colours, initialize data etc. 

Here you can set the screen size using specific pixel values or set it to full screen. This **must** be the first line of code within the setup function. You can also use this time to set a background colour (a nice orange here), line colour (white) and also to load any images you might want to use.


```python

{% include 'code/python/processing-setup.py' %}

```

### Draw

Draw is effectively the main loop of the application and it gets called repeatedly until the application stops or noLoop is called. noLoop(), redraw() and loop() are options if you want more control over when redraws happen. 

In draw, you can set a background image, draw lines or any 

```python

{% include 'code/python/processing-draw.py' %}

```

Draw **must** be included, even if there is no explicit drawing to do because it is used to process user events.


### Interaction

user interactions - mouse or keyboard - trigger two functions mousePressed() and keyPressed(). You can use mouseX and mouseY to access the current mouse position and mouseButton to check for left and right presses. 

```python

{% include 'code/python/processing-mouse.py' %}

```

Another great feature of processing is that you can take a screenshot of the current application by using the saveFrame() 
function. Hashes in the file name are used to create sequences of images and they are saved to the sketch folder. Be 
 careful of over using this, for instance in the draw function because the work of copying an image and saving it to disk can massively slow down the draw function. 
