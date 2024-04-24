---
permalink: 2015/10/13/presenting-with-reveal.js-and-jekyll/
layout: post
title: Presenting with Reveal.js and Jekyll
published: true
tags: [meta, ruby, presentations]
---

I am giving a talk at [DDDNorth 2015](http://www.dddnorth.co.uk/) and wanted to use something other than  
than powerpoint or keynote for my slides. I settled on [reveal.js](https://github.com/hakimel/reveal.js/)
because it was easy to use, had every feature I needed and meant I could check the source into github!

## Step by Step

- Create a new [repository on github](https://github.com/deejaygraham/sketchnoting-for-developers).
- Create a new branch named "gh-pages" to enable github pages ![gh-pages](/img/posts/presenting-with-reveal-jekyll/gh-pages-branch.webp)
- Download [reveal.js](https://github.com/hakimel/reveal.js/).
- Create a layout based on the example reveal.js html file. Substitute example slide sections for liquid {% raw %} {{ content }} {% endraw %}
  markup.

<script src="https://gist.github.com/deejaygraham/5e8d1f123fa7d513cd02.js"></script>

- Create an index file to reference the layout.

<script src="https://gist.github.com/deejaygraham/8eec91d81aaaeb6ab417.js"></script>

- Create slides as individual files in the \_posts directory using a date - title format to put them in the required order. I used
  a 2105-MM-DD-name.html format where slides where separated into chapters according to their "month" and ordered in each month
  according to the day.

<script src="https://gist.github.com/deejaygraham/5e16de44823db42109bc.js"></script>

## Optional Extras

### Themes

Reveal.js has support for themes which github pages supports via plain css or sass processing.

### Slide Styles

Individual slides can be styled using the data-background and data-background-size attributes to set images or background colours separately.
I built these into the yaml of each slide file and added them to a section if they were set.

<script src="https://gist.github.com/deejaygraham/6e5cb3d3e2d5e24ad386.js"></script>

### Debugging

During development of my slide deck, I discovered it was useful to know the name of the current slide. So I added some debug to the index.html

<script src="https://gist.github.com/deejaygraham/779f781821d8975bf8ed.js"></script>
