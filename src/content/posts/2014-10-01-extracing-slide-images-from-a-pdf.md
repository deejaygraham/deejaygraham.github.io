---
layout: post
title: Extracting Slide Images from a Pdf
published: true
categories: [ code, msbuild ]
---

Being a programmer, I'm often tempted to crack open a compiler when faced 
with a task that involves anything to do with computers. 

In this case, I needed to create a some screenshots of the slides from
a presentation. Unfortunately the presentation document was only available 
as a pdf. This left me with the choice of crafting a solution myself or in 
finding an already existing tool or coercing a set of tools to do the work.

Now I had a vague recollection that [Inkscape](http://www.inkscape.org/en/) could 
import a pdf file. On investigating the command line reference, it seems that 
Inkscape can import a pdf and export an image from it. 

<code>
Inkscape.exe slidedeck.pdf --export-png=slidedeck.webp
</code>

Great. Except that it only works with the first page in the document.
 
So what I needed is a tool to take a multi-page pdf and split it into single 
pages. Which is exactly what [Coherent Pdf Tools](http://community.coherentpdf.com/) 
are able to do. Like this

<code>
cpdf.exe -split slidedeck.pdf -o slidedeck%%%%.pdf
</code>

Which generates a sequence of single page pdfs, numbered <original-name>01.pdf 
upwards.

Once I had the syntax of the two command line building blocks I used a bit 
of MsBuild batching magic to handle the conversion of each individual page 
into an image.

```xml

{% include code/msbuild/screenshots.xml %}

```

## Update

Now I've been playing with this technique for a number of different slide decks, 
I discovered that any pdf with embedded fonts didn't export correctly. The font 
was replaced by Inkscape with a weird "not understood" icon.

Clearly another approach was needed. After some googling, I discovered another tool,
[pdf2svg](http://www.cityinthesky.co.uk/opensource/pdf2svg/) which could export 
pdfs to svg and could handle embedded fonts.

<code>
pdf2svg.exe slide01.pdf slide01.webp 1
</code>

Fortunately, but unsurprisingly, Inkscape is so awesome it can handle conversion 
from svg to png.

<code>
Inkscape.exe -f slide01.svg -e slide01.webp
</code>

So the script has had to change a little to include the extra tool in the chain. 
It now goes....

<code>	
Multi-page-pdf -> batch-single-page-pdfs -> batch-single-svgs -> batch-single-pngs
</code>	

I have refreshed the gist above to reflect this new information.	
