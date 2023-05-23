---
layout: post
title: How to find AD group membership with PowerShell
published: true 
categories: [ powershell, code ] 
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"
alttext: logs
---

A tiny snippet I always forget when swapping identities and using service accounts for things like IIS App Pools. The problem: given a user name how do I work 
out which AD groups they belong to?


## Activate Active Directory

First, we need to make sure that the ActiveDirectory module is available. On Windows 10, this is a capability:

```powershell

Add-WindowsCapability -Name Rsat.ActiveDirectory.DS-LDS.Tools~~~~0.0.1.0 -Online

```

Confusingly, for Windows Server OS' it's a windows feature:

```powershell

Install-WindowsFeature -Name "RSAT-AD-PowerShell" -IncludeAllSubFeature

```

## Which Groups Am I In?

```powershell

Import-Module ActiveDirectory

Get-ADPrincipalGroupMembership MyUser.Name | select name

```

Piping to Select name strips away the cruft we generally don't care about and gives us a nice list of the groups.


## Who Is In This Group?

The other side of this problem is looking at a group and getting the members of that group.

```powershell

Import-Module ActiveDirectory

Get-ADGroupMember -Identity "MyADGroupName"

```
