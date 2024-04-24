---
permalink: 2022/06/08/group-membership-with-powershell/
layout: post
title: How to find AD group membership with PowerShell
published: true
tags: [powershell, code]
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"
alttext: logs
---

A tiny snippet I always forget when swapping identities and using service accounts for things like IIS App Pools. The problem: given a user name how do I work
out which AD groups they belong to?

## Activate Active Directory

First, we need to make sure that the ActiveDirectory module is available. On Windows 10, this is a capability:

{% highlight "powershell" %}

Add-WindowsCapability -Name Rsat.ActiveDirectory.DS-LDS.Tools{% endhighlight %}~0.0.1.0 -Online

{% endhighlight %}

Confusingly, for Windows Server OS' it's a windows feature:

{% highlight "powershell" %}

Install-WindowsFeature -Name "RSAT-AD-PowerShell" -IncludeAllSubFeature

{% endhighlight %}

## Which Groups Am I In?

{% highlight "powershell" %}

Import-Module ActiveDirectory

Get-ADPrincipalGroupMembership MyUser.Name | select name

{% endhighlight %}

Piping to Select name strips away the cruft we generally don't care about and gives us a nice list of the groups.

## Who Is In This Group?

The other side of this problem is looking at a group and getting the members of that group.

{% highlight "powershell" %}

Import-Module ActiveDirectory

Get-ADGroupMember -Identity "MyADGroupName"

{% endhighlight %}
