---
layout: post
title: Finding and using user certificates in PowerShell
published: true 
categories: [ powershell ]
hero: power
thumbnail: "/img/thumbnails/parcel-420x255.webp"
alttext: powershell
---

Accessing a certificate store from PowerShell is another one of those incantations that never 
seems to stick in my head. Here's the way to list out what's currently installed:

```powershell

Get-ChildItem -Recurse cert:\CurrentUser\My

```

And here's how to find a specific certificate by thumbprint:

```powershell

$thumbprint = "3AB949D9C151E1ED4C98560D5FA7DAD664404192"

$cert = Get-Item Cert:\CurrentUser\My\$thumbprint  

$cert.Thumbprint

```

Of course, sometimes we want to find a certificate *anywhere* it might be installed on a machine so we can go fully into 
searching all through the cert store. This might be too much, depending on the number of certificates so here I have added 
a filter where I know the thumbprint of the cert I am looking for. 

```powershell

Get-ChildItem -Path cert:\* -Recurse | Where-Object { $_.Thumbprint -eq '1A3B72F28ACE90E1EF98591BE8FEF41CB3D4AB63' }

```
