---
permalink: 2020/05/26/remove-temp-aspnet-files/
layout: post
title: Remove Temporary ASP.Net Files in PowerShell

tags: [powershell]
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"
alttext: powershell
---

Tiny snippet that I always forget about and have to re-create from scratch every time. Working with ASP.Net, IIS tries really hard to
cache files for performance reasons. Fine in normal circumstances but for development work, it can be a frustrating behaviour if
you are writing and compiling code on a local machine and yet the behaviour you are seeing in the browser isn't changing. Often its
because ASP.Net is ignoring your lovely new code in favour of the version it has cached.

```powershell

{% include 'code/powershell/Remove-TempAspNet.ps1' %}

```

Often you need to make sure that IIS isn't holding onto the contents of the temp folder before you attempt to delete them.
