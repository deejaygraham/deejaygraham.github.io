---
permalink: 2018/11/01/linting-in-powershell/
layout: post
title: Linting in PowerShell
published: true 
tags: [ powershell ]
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"
alttext: powershell

---

Continuing the theme of C++ flavoured tools I miss, lint is another essential that doesn't appear to exist in the PowerShell world. Until I discovered ScriptAnalyzer which, 
it seems, can do pretty much the same job for .ps1 files. Here I wrote a simple loop to check all files in the same directory. 

{% highlight "powershell" %}

{% include 'code/powershell/Lint-Scripts.ps1' %}

{% endhighlight %}

As with all lint tools, we sometimes need to suppress errors that don't matter to our current domain.
 
We do this by creating a config file with ExcludeRules 

{% highlight "powershell" %}

{% include 'code/powershell/Lint-Config.ps1' %}

{% endhighlight %}


and use it when we invoke. 

{% highlight "powershell" %}

{% include 'code/powershell/Lint-Scripts-2.ps1' %}

{% endhighlight %}
