---
layout: post
title: Configuration Files in PowerShell
published: true 
categories: [ powershell ]
hero: power
thumbnail: "/img/thumbnails/parcel-420x255.jpg"
alttext: powershell

---

Developing a mini build and configuration system with PSake recently and was getting annoyed with the number of hard-coded, machine- and environment-specific strings there were 
so I did some research on alternatives to storing configuration files external to the script. Once again, the PowerShell team have thought about this and provide a solution 
in the shape of a psd (PowerShell Data) file - .psd1. Data can be structured hierarchically either as key value pairs or hashes. The easiest way to create a file is to 
generate it from a scratch script using a here string:


```powershell

{% include code/powershell/Create-TemplateConfig.ps1 %}

```

Then read it back in in the worker script and reference sub-objects using normal dot notation. 


```powershell

{% include code/powershell/Import-Config.ps1 %}

```
