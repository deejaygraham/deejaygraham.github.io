---
layout: post
title: Iterating on Developing a PowerShell Module
published: true 
categories: [ powershell ]
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"
alttext: powershell

---

Whenever you are writing a powershell module, in .Net say, and testing it from another script in ISE, it's good practice to remove the last version of the module from a session 
before loading the new version into memory. 

```powershell

{ % include code/powershell/Import-DevModule.ps1 %}

```

This snippet finds the module if it exists in the current session and removes it before re-importing (the new version of) it. If you don't do this or start a new session, the original 
will stay around in memory and any changes you think you are making won't show up when you run the test script.
