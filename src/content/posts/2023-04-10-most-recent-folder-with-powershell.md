---
layout: post
title: How to find the most recent folder with PowerShell
published: true 
categories: [ powershell, code ] 
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"
alttext: logs
---

Continuing the regular theme of snippets of code I can't quite remember when I need them, here's one where 
we know the general "parent" folder for a resource but we want the most recent subfolder that exists immediately 
below that. 

An example is copying something from the latest build where all files get copied to the same overall 
location but put into a new folder for each build that runs to completion. So something like \\mybuild\app\v1.2.3\bin
we want to be able to pick up when we copy the next build 1.2.4 and copy stuff from the bin folder there.

Here SourcePath is the parent folder and SubFolder is the folder that exists inside the folder we are trying to find. 

```powershell

$MostRecentFolderName = (Get-ChildItem $SourcePath -Directory | Sort-Object CreationTime -desc | Select-Object -First 1).Name
Write-Verbose "Most recent folder $MostRecentFolderName in $SourcePath"

$MostRecentFolder = Join-Path $SourcePath -ChildPath $MostRecentFolderName
$FullSourcePath = Join-Path $MostRecentFolder -ChildPath $SubFolder

```
