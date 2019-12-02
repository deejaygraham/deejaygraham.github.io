---
layout: post
title: The Case of the Disappearing Github Pages
published: true 
categories: [ meta, powershell, presentations ]
thumbnail: "/img/thumbnails/parcel-420x255.jpg"
alttext: powershell
---

I spent a frustrating couple of days earlier this week while preparing a presentation 
for my local .Net user group [NE Bytes](http://nebytes.net/) on Azure Machine Learning. 

I was using a technique I've used before to avoid PowerPoint or Keynote and just create 
slides with simple html using [reveal.js](https://github.com/hakimel/reveal.js). Basically, 
I use the functionality provided by Github Pages to generate a little static website that 
then serves up the slides. All that's needed is to set up a github repository, create a 
"gh-pages" branch and check in individual slides as discrete .html files, ordered by an 
imaginary date that jekyll understands. 

The data prefix is meant to be used to identify blog post dates but works well for ordering 
slides as well. For example, the first slide in the deck is given the prefix 
2016-01-01-first.html and the end slide could be 2016-12-31-last.html, so you could 
create slides at will and reorder them just by changing the date prefixes relative to each 
other.

My frustration came in when creating the slides on a Windows machine with a local jekyll install 
I could proceed through all the slides end to end with no problem. When I checked out the 
repo on my mac I could only get about 25 slides! The slide generation code was no different but 
jekyll on the mac (and on the live github pages on github.com) seemed to stop after a certain 
number. 

I know jekyll can be a little bit flaky with file content and unusual characters so I spent a 
good deal of time checking the slide content for rogue values and trying to move slides around 
but to no avail. After a little consideration, it actually became obvious once I looked at the 
date prefixes again. All the working slides were before the current date and any that weren't 
included were dated in the "future"; jekyll won't process "future" files! 

At this point I had something like 50 files/slides so I didn't fancy renumbering them by hand 
and with the deadline of the talk looming. Luckily, I remembered my old friend PowerShell 
and the implementation took a minute or two and saved me a lot of stress.   

~~~powershell

Get-ChildItem -Path .\_posts\*.html | Rename-Item -NewName { $_.name -Replace "2016-", "2015-" }

~~~

Jekyll is quite happy for all the dates to be in the past so changing all the dates from 2016 to 
2015 took the problem away and I could concentrate on the content I wanted to present.

I got the talk completed and it was well received on the night, lots of good questions, 
thoughtful comments and good discussion of some of the underlying issues.
 

