---
permalink: 2014/04/08/using-ndesk-for-command-line-parsing/
layout: post
title: Using NDesk.Options for Command Line Parsing
published: true
tags: [ csharp, code, open-source ]
---

Another snippet to remind future-me (and maybe future-you) how to use a 
nice command line parsing library I just discovered called 
<a href="http://www.ndesk.org/Options" alt="link to ndesk">NDesk.Options</a>.

In this example, I created an object to hold the collection of command line 
options so they can be passed around the program. Then I created a builder object 
to take the array of string arguments from Main and parse them out into discrete 
settings.

NDesk.Options supports using lambdas to process each command line option so 
it makes it very easy to see which string option relates to which field.

Here's a set of command line options for an application we'd like to set from the 
command line:

{% highlight "csharp" %}

{% include 'code/csharp/NDeskCommandLineOptions.cs' %}

{% endhighlight %}

And here's the super simple code to parse out arguments into properties in the object:

{% highlight "csharp" %}

{% include 'code/csharp/UsingNDesk.Options.cs' %}

{% endhighlight %}




