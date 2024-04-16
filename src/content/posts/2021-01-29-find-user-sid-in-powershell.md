---
permalink: 2021/01/29/find-user-sid-in-powershell.html
layout: post
title: Find a User SID in PowerShell
published: true 
categories: [ powershell ]
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"
alttext: powershell

---

Working with Windows Virtual Desktop and Azure VMs at the moment so I needed to be able to identify local machine users 
by SID so wrote the following cmdlet to conveniently query for the a user in a specific domain, defaulting to the current user if no parameters are specified.  

GetUserSid.ps1
```powershell

{% include 'code/powershell/GetUserSid.ps1' %}

```

Another way of doing this to get more complete information is to instantiate a WindowsIdentity object using [System.Security.Principal.WindowsIdentity]::GetCurrent(). As well as SID, user name, this object includes the groups they are members of, the identity claims, and information about the authentication type. 


Conversely, given a user Sid (say from Get-ADUser), we can reconstruct the user like this:
 
GetUserFromSid.ps1
```powershell

{% include 'code/powershell/GetUserFromSid.ps1' %}

```
