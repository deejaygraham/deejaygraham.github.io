---
layout: post
title: Find a User SID in PowerShell
published: true 
categories: [ powershell ]
hero: power
thumbnail: "/img/thumbnails/shell-420x255.jpg"
alttext: powershell

---

Working with Windows Virtual Desktop and Azure VMs at the moment so I needed to be able to identify local machine users 
by SID so wrote the following cmdlet to conveniently query for the a user in a specific domain, defaulting to the current user if no parameters are specified.  

GetUserSid.ps1
```powershell

{% include code/powershell/GetUserSid.ps1 %}

```
