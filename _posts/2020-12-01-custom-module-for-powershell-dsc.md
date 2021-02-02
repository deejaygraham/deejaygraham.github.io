---
layout: post
title: Custom Module for PowerShell DSC
published: true 
categories: [ powershell ]
hero: power
thumbnail: "/img/thumbnails/shell-420x255.jpg"
alttext: powershell

---

Refreshing my memory on using PowerShell DSC to create a consistent built configuration for a set of virtual machines, I needed a way to customise app settings in a series of web and application configurations. A lot of the modules available as 
extensions or custom modules seemed to operate by going to IIS and modifying the underlying file by changing settings in IIS. 
This wouldn't work for me so I set out researching how to write my own module. It turned out not to be as difficult as I 
had thought. There are two ways to build a DSC module and I elected to go for the class-based option as it seemed simpler to 
implement.

First we need two files, a .psd1 and a .psm1 file. The .psd1 is the meta data for the new module and contains the exports, the 
guid etc. Note I am following the convention here of prefixing with a lower case C to signify that this is a custom module not one of the built in or experimental modules from Microsoft or the Community.


### Meta

cApplicationConfiguration.psd1
```powershell

{% include code/powershell/DSC-Module.psd1 %}

```


### Class

The .psm1 contains the actual code that does the work, with the class named for the module name and with properties that reflect settings in the DSC script. In this case, the path to the config file, the name of the key in appsettings and the name of the new value. 

cApplicationConfiguration.psm1
```powershell

{% include code/powershell/DSC-Module.ps1 %}

```

Both of these files need to be copied into a folder named the same as the module and in the PowerShell search path, typically in C:\Program Files\WindowsPowerShell\Modules

### Use

Here I'm importing the module into the configuration and using a dictionary to iteratively subsitute values in a web.config. 

dsc-example.ps1
```powershell

{% include code/powershell/DSC-Module-Use.ps1 %}

```

Since DSC startup a new instance of PowerShell to run under, it's enough to import the module without the usual worry 
about unloading the original during the development cycle.
