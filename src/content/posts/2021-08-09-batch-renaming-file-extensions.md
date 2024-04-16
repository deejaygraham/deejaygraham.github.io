---
permalink: 2021/08/09/batch-renaming-file-extensions.html
layout: post
title: Batch Renaming File Extensions
published: true 
categories: [ powershell, code ] 
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"
alttext: batches
---

A tiny snippet of code I hardly ever need, until I desperately need it and find I've forgotten how
Get-ChildItem works:)

```powershell

{% include 'code/powershell/Rename-Files.ps1' %}

```

Most recently I needed to batch change several hundred .html files as .markdown and didn't fancy 
doing that by hand. 
