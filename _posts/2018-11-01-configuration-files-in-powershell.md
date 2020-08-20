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

### Update

Way, way behind the curve as usual I just found out that PowerShell 5 has Import-PowerShellDataFile which does the same thing as Import-LocalizedData but without the split 
for directory, file name and culture. Data read in from the psd file is not executed so can be treated as a true data file.

A final note, on the setup of a configuration data file. When deciding between several settings based on some other input, the data structure can be keyed on that other input. 

For example, a data file may contain urls which differ according to the deployment environment:

```powershell

{% include code/powershell/Create-TemplateConfig2.ps1 %}

```

We can then get the current environment at runtime and use that to key the hashtable we made in the psd1.

```powershell

{% include code/powershell/Import-Config2.ps1 %}

```
