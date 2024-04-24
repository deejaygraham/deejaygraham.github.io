---
permalink: 2018/06/23/validating-xml-in-powershell/
layout: post
title: Validating Xml in PowerShell
published: true
tags: [powershell]
hero: power
thumbnail: "/img/thumbnails/parcel-420x255.webp"
alttext: powershell
---

Sometimes a deployment pipeline needs to know that a file is at least vaguely sensible before trying to use it. Here is a
short script cmdlet that accepts a file path (or wildcard) and attempts to load the xml as a valid document. Any exceptions
caused by document errors will show up as errors and break a build with an exit code of 1.

{% highlight "powershell" %}

{% include 'code/powershell/Test-XML.ps1' %}

{% endhighlight %}

Note that I support wildcard paths by using Resolve-Path to generate a list of matching paths if, for example, we run the cmdlet
with \*.xml input.
