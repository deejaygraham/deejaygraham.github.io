---
layout: post
title: Generating Notepaper with PdfSharp
categories: [ code ]
published: true
---

PdfSharp is a lovely library that lets you generate/draw pdf documents programmatically. I used it to generate some notepaper and found it 
easy to work with once the basics of the objects are understood. We need to create a document, give it some properties, then we can save it. 

~~~csharp 

{% include code/csharp/pdf-create-save.cs %}

~~~

The next obvious thing is to add some pages. Each page can have it's own size and orientation.


~~~csharp 

{% include code/csharp/pdf-add-page.cs %}

~~~

Now that we have a page or two, we want to put some content into them. PdfSharp has a number of objects that are analogs of the GDI drawing 
objects in Windows, things like Graphics, Pens, Brushes etc. and a set of similar methods to draw lines, rectangles, ellipses. 

In order to be able to draw some notepaper, I wanted to be able to have a white border around each page and maybe print on all the page or 
print an A5 signature as two halves of a landscape A4 page. This meant I needed something to represent one or more printable areas for each page.

~~~csharp 

{% include code/csharp/pdf-printable-area.cs %}

~~~

Each kind of paper - graph, dotted, music manuscript, lined - implies an interface. Let's call it IPageRenderer.

~~~csharp 

{% include code/csharp/pdf-page-renderer.cs %}

~~~

So now we can treat a list of renderings as a group using a page generator. 

~~~csharp 

{% include code/csharp/pdf-page-generator.cs %}

~~~

Finally, the implementation of each of the different types of renderer.


## Music Manuscript


~~~csharp 

{% include code/csharp/pdf-manuscript-renderer.cs %}

~~~


## Dotted

 
~~~csharp 

{% include code/csharp/pdf-dotted-renderer.cs %}

~~~


## Lined 


~~~csharp 

{% include code/csharp/pdf-lined-renderer.cs %}

~~~


## Graph


~~~csharp 

{% include code/csharp/pdf-graph-renderer.cs %}

~~~

Examples of <a href="/downloads/Dotted-a4-portrait.pdf" alt="dotted">each<a/> 
<a href="/downloads/Graph-a4-portrait.pdf" alt="graph">type<a/> of 
<a href="/downloads/Manuscript-a4-portrait.pdf" alt="manuscript">paper<a/> are available for download.

