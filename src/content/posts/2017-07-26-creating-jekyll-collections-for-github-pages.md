---
permalink: 2017/07/26/creating-jekyll-collections-for-github-pages/
layout: post
title: Creating Jekyll Collections
published: true
categories: [ code, meta ]
---

So far with this personal site, I have stuck to the bog-standard way of putting all
blog post content into markdown files in the "posts" folder and let jekyll
process them into a (hopefully) coherent site with urls and folders based on dates.

### Jekyll Collections

Recently I discovered that jekyll supports a concept called <a href="https://jekyllrb.com/docs/collections/">collections</a>
and the posts folder is just a default collection. You can declare other collections in your site
.yml file and have jekyll process these more folders in the same way as the post folder.

I used this in the <a href="https://deejaygraham.github.io/makers-n-creators">Makers n Creators</a>
sub site I set up to collect content and code examples for our recent week of events at Campus North.
I wanted to have a web-based presentation for each day of the event, generated from a set of
dated markdown files and delivered by <a href="http://www.webslides.tv/">webslides.tv</a>, so a folder per
day seemed like the best way to segregate each day's content.

### YYMV (Your Yaml Might Vary)

Each day of the week for our event had a particular theme so I created a set of collections
in the .yml file to reflect those themes:

<script src="https://gist.github.com/deejaygraham/10299742559e2290c958abbeb474dd9a.js"></script>

Declaring these collections in the .yml means we now have access to them in our
liquid templates as sub-objects of "site".

### Presentation

For my presentations, I created a webslides layout like this:

<script src="https://gist.github.com/deejaygraham/540f3a491c3d083631c958eaa18837f1.js"></script>

Each single page presentation, for example the micro:bit page, could be written to
pull all the content from the microbits collection, separated from all the other
content on the site. Like this:

<script src="https://gist.github.com/deejaygraham/232b09241e259d675d884fffcfc0163f.js"></script>

Now we can create a folder for each named collection, remembering to prefix each one with
an underscore like the posts folder. Content for each collection can be added to a folder
with the usual dating and front matter rules applying as you would expect.
