---
permalink: 2015/06/25/better-powershell-help/
layout: post
title: Better PowerShell Help
published: true 
tags: [ powershell ]
hero: power
thumbnail: "/img/thumbnails/parcel-420x255.webp"
alttext: powershell
---

Here's a tip I always forget about when trying to read the help for a function in the ISE: you can send the 
help page to another window so you can have the help and your script side-by-side instead of one above the other.

~~~

PS C:\>Get-Help Get-AzureDeployment -ShowWindow

~~~ 

![show](/img/posts/better-powershell-help/help.webp "Show Help")

