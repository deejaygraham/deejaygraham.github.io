---
layout: post
title: Using NDesk.Options for Command Line Parsing
published: true
tags: [ csharp, snippets, open-source ]
---

Another snippet to remind future-me (and maybe future-you) how to use a 
nice command line parsing library I just discovered called [NDesk.Options](http://www.ndesk.org/Options).

In this example, I created an object to hold the collection of command line 
options so they can be passed around the program. Then I created a builder object 
to take the array of string arguments from Main and parse them out into discrete 
settings.

NDesk.Options supports using lambdas to process each command line option so 
it makes it very easy to see which string option relates to which field.

<script src="https://gist.github.com/deejaygraham/40199555bc695e2946aa.js"></script>



