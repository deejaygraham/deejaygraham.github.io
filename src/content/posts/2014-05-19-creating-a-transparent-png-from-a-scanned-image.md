---
layout: post
title: Creating a Transparent PNG from a Scanned Image
published: true
categories: [ csharp, sketchnotes, code ]
thumbnail: "/img/thumbnails/notebook-420x255.webp"
alttext: notebook
---

One of the many parts of my sketchnoting process that I took from Mike Rohde's 
<a href="http://rohdesign.com/book">Sketchnote Handbook</a> is scanning the finished 
sketch in black and white and adding colour to the image later. 

Adding colour usually means using Photoshop or Paint.Net to separate the image 
into two (or *sometimes* more) layers. The top layer contains the inked drawing 
and the bottom layer will contain the colour, so that the finished image looks 
like the colour was applied first and the ink on top.

To make this work, the ink layer needs to have the white background made 
transparent. This is a painful, general purpose algorithm for a paint program 
to do - using a magic wand selection - but can be done more easily by a 
specific program. Coincidentally, like one what I wrote :)

```csharp

{ % include code/csharp/Transpng.cs %}

```

This simple console app takes the name of an image file as an argument, 
changes the background colour to transparent and then saves it again with a 
new suffix so that the original file is left in tact. 

