---
layout: post
title: Html Link Validation
published: true
categories: [ csharp, code ]
---

Writing documentation in html for processing into help files with tools like 
[Sandcastle](http://sandcastle.codeplex.com/) and [Sandcastle Help File Builder](http://shfb.codeplex.com/) 
means that it's easy to get links between documents wrong without the tools 
complaining. Particularly since the documentation input format may not represent the
actual generated code that is produced by these tools.

This little spider utility uses the [Html Agility Pack](http://htmlagilitypack.codeplex.com/) 
to check the output files generated by Sandcastle and make sure the internal 
links are consistent. No validation is done on external links, in this version 
I assume these are correct.

First of a little class to find all html-like files in a given folder and sub folders.

~~~csharp

{ % include code/csharp/HtmlFileFinder.cs %}

~~~

Next we need an event to represent a link found in an html document:

~~~csharp

{ % include code/csharp/HyperLinkEventArgs.cs %}

~~~

Now, the *AnchorFinder* which processes a single html document and fires an 
event each time an anchor is found.

~~~csharp

{ % include code/csharp/AnchorFinder.cs %}

~~~

I added the ability to ignore certain url prefixes so we can ignore *mailto* 
and local file links.

Finally the Main class to use all the preceding pieces.

~~~csharp

{ % include code/csharp/HtmlLinkValidation.cs %}

~~~


