---
layout: post
title: Configurng IIS in PowerShell
published: true 
categories: [ powershell ]
hero: power
---

Controlling the configuration of IIS always seems to be difficult from an outside view, involving loading the IIS snapin or 
fighting with config files in obscure locations but (you knew this was coming next, didn't you?) PowerShell to the rescue again.  

Fundamental to all of these snippets is the WebAdministration module that you are required to run as admin before you can import.

Once this module is loaded, the Set-Location works for IIS as if it was a drive so you can use Get-ChildItem to find app pools or sites. 

![gci](/img/posts/configuring-iis-in-powershell/getchilditem.png)


```powershell

{% include code/powershell/Iterating-IISAppPools.ps1 %}

```

Config can be read, created or updated using the ItemProperties cmdlets and providing the correct path (and value for updates). 

```powershell

{% include code/powershell/Set-IISAppPoolRecycle.ps1 %}

```

Here, I am removing IIS' default app pool recycle and substituting a random recycle time between midnight and 2am. One thing to 
be careful of is the formatting of dates and timespans in IIS. Turning off the restart, I had assumed I could set the value to be zero but 
got an invalid cast exception. The fully qualified time ('0.00:00:00') seemed to be the only thing that was accepted for that value. 
Similarly, setting a specific time for recycle required building a TimeSpan object then using it to format a string that was accepted by 
the periodicRestart.schedule value.

Get-ChildItem works equally well for Web sites in IIS. 

```powershell

{% include code/powershell/Stop-IISSites.ps1 %}

```

```powershell

{% include code/powershell/Start-IISSites.ps1 %}

```
