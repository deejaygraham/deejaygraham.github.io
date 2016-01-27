---
layout: post
title: Finding and using user certificates in PowerShell
published: true 
tags: [ powershell ]
hero: power
---

Accessing a certificate store from PowerShell is another one of those incantations that never 
seems to stick in my head. Here's the way to list out what's currently installed:

~~~

Get-ChildItem -Recurse cert:\CurrentUser\My

~~~

And here's how to find a specific certificate by thumbprint:

~~~

$thumbprint = "3AB949D9C151E1ED4C98560D5FA7DAD664404192"

$cert = Get-Item Cert:\CurrentUser\My\$thumbprint  

$cert.Thumbprint

~~~


