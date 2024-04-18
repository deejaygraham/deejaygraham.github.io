---
permalink: 2019/03/01/validating-file-hashes-in-powershell/
layout: post
title: Validating File Hashes in PowerShell
published: true 
tags: [ powershell ]
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"
alttext: powershell

---

PowerShell (from version 4 onwards I think) has a Get-FileHash cmdlet that lets you generate a quick-and-dirty 
md5 hash of a file. This is particularly useful if you are running a process which may or may not update a lot of 
files and you can't be sure what the effects have been. 

Here I iterate through a folder, recording the original version of the hash against the file name. We then run the 
potentially destructive tool and re-examine the files and report on changes. For simplicity I am just writing text out 
to the screen and using red for failures, green for each match and yellow for new files created in the mystery process.


```powershell

{% include 'code/powershell/Validate-Hash.ps1' %}

```
