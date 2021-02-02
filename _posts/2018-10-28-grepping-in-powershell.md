---
layout: post
title: Grepping in PowerShell
published: true 
categories: [ powershell ]
hero: power
thumbnail: "/img/thumbnails/shell-420x255.jpg"
alttext: powershell

---

One tool I really miss sometimes is <a href="http://man7.org/linux/man-pages/man1/grep.1.html">grep</a>, the command line tool for searching for text matches inside an arbitrary set of files. In the same way you might use 
"dir" to find a file inside a directory that matches a name pattern, or another outward-facing characteristic like file attribute, you can use grep to find any files 
containing matching text. 

In this most recent episode of pining for grep, I was only interested in finding out if a particular namespace was being used anywhere in my code 
and didn't really care where. You could easily extend this code to report the file name when it finds a match.

```powershell

{% include code/powershell/Grep-Text.ps1 %}

```

Additionally, I used a list of search terms but that could be replaced with a simple string search variable. 

Sample output from this script:

<img src="/img/posts/grepping-in-powershell/grepping-in-powershell.png" alt="grep" class="u-max-full-width" />
