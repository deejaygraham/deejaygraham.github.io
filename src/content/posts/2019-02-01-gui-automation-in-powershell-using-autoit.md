---
permalink: 2019/02/01/gui-automation-in-powershell-using-autoit/
layout: post
title: GUI Automation in PowerShell using AutoIt
published: true 
tags: [ powershell ]
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"
alttext: powershell

---

<a href="https://www.autoitscript.com/site/">AutoIt</a> is an automation program I used to use a long time ago
to do GUI automation and always found the programming model to make sense. The whole package seemed to be 
generally reliable and I'm not sure why it fell out of favour. One thing that didn't exist at that time was PowerShell 
so it's no surprise that I never thought to check for updates to it and if it now had a binding for PowerShell. 

Part of the download from AutoIt now is a folder called AutoItX which you can use to do automation from PowerShell. It 
doesn't need an install so you can copy the folder to a machine where you need it and just import the .psd1 file. 


{% highlight "powershell" %}

{% include 'code/powershell/AutoitNotepad-1.ps1' %}

{% endhighlight %}

The core AutoIt assemblies are loaded via the PowerShell cmdlet assembly AutoItX3.PowerShell.dll.
I'm not a huge fan of the naming used for the cmdlets, they seem very clunky to me but probably as a result of trying to 
avoid namespace clashes with other modules and PowerShell's verb conventions. 

