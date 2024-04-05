---
layout: post
title: Check File Content with PowerShell
published: true 
categories: [ powershell, code ] 
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"
alttext: logs
---

As part of some work to migrate from a proprietary set of build tools for a particular website to the wonderful [eleventy](https://www.11ty.dev), we 
need to make sure we remove all the old crufty markup and weird variables and replace them with nice new markdown and nunjucks style double curly braces - 
moustaches if you will. We use variables to keep product name, versions, contact addresses etc. updateable from one single source of truth. 

This is a snippet of a [Pester](https://pester.dev) test I wrote to make sure that all of the generated content, once it has been processed by eleventy, has been handled correctly and we haven't mistyped a variable name. If all is well, there should be no moustache variables left in the final output. 

```powershell

{% include code/powershell/Test-FileContent.ps1 %}

```

The test is quite slow because it's loading each file content individually and searching each file for matches but it does seem to be reliable in making sure we
don't accidentally break something as we migrate. 
