---
permalink: 2023/05/23/file-and-folder-access-rights-with-powershell/
layout: post
title: How to get file and folder ACL rights with PowerShell
published: true
tags: [powershell, code]
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"
alttext: logs
---

Two more snippets I always need when doing security reviews. I'm thinking of on-premise scenarios where files or folders can contain potentially sensitive data and need to be set up in such a way that some identities are granted access and others are explicitly or implicitly forbidden.

## Easy

The simplest example is to use Get-ACL. Here we want to look at access rights for a single UNC path shared on a network.

{% highlight "powershell" %}

(Get-Acl '\\MyUNCPath\Goes\Here').Access | Out-GridView

{% endhighlight %}

Often, this type of query is an ad-hoc one so I find using the pop-out GridView useful, and preferable to looking through a long list of information in the terminal.

## Harder

The slightly more involved option, if needed is to iterate all through the files and folders
accessible through the share and list out each one of it's permissions.

{% highlight "powershell" %}

$UNCPath = '\\MyUNCFolder\Stuff'
$Permissions = @()

Get-ChildItem -Directory -Path $UNCPath -Recurse -Force |
ForEach-Object {
$Folder = $_.FullName
(Get-Acl -Path $Folder).Access |
ForEach-Object {
$Access = $_  
 $Properties = [ordered]@{
'Folder' = $\_.FullName
'Group/User' = $Access.IdentityReference
'Permissions' = $Access.FileSystemRights
}
$Permissions += New-Object -TypeName PSObject -Property $Properties
}
}

$Permissions | Out-GridView

{% endhighlight %}
