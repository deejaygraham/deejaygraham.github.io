---
permalink: 2017/05/14/creating-an-iis-website-in-powershell.html
layout: post
title: Building an IIS website in PowerShell
published: true
categories: [ powershell ]
hero: power
thumbnail: "/img/thumbnails/parcel-420x255.webp"
alttext: powershell
---

A tiny script to create a local website in IIS just so I could test out a set of static 
html pages to make sure they were correct before checking them in. Creates a named app pool
then creates the website (and deletes existing app pool and website if they already exist).

```powershell

{% include 'code/powershell/CreateIISWebsite.ps1' %}

```

Finally, I fire up a browser window to see what the index page looks like.
