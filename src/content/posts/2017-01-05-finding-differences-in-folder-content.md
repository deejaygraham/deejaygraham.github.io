---
permalink: 2017/01/05/finding-differences-in-folder-content/
layout: post
title: Finding Differences in Folder Content

tags: [powershell]
hero: power
thumbnail: "/img/thumbnails/parcel-420x255.webp"
alttext: powershell
---

Another contender for the department of "I might need to remember how to do this again one day",
I occasionally need to update a set of small binary files that are kept in source control. The process
involves checking out the files, running a bit of PowerShell to generate a new set of files, then
checking them back in again.

Often, because the files are binary and the set of files may change over time. The majority
are stable but one or two files may be removed or added on each check in and in TFS (for my sins),
existing files that are untouched, because they are no longer needed, or new files are not easy to spot.

This lead me to think I could extend my PowerShell script to take a snapshots of the content of the
folder at the start and end of the script and report on any files which were added or removed.

I used Get-ChildItem to list out the files I'm interested in, then use Compare-Object on the file names
only (I don't care about existing files that change size). After that, I make sure that I capture both
the name and status (SideIndicator) so I can tell what has happened to each file. Then, it's a simple
matter of reporting each file and whether it was added (=>) or removed (<=).

```powershell

$BeforeFolderContent = Get-ChildItem -Path D:\MyFolder\*.* 

# Run process to create and update files here 

$AfterFolderContent = Get-ChildItem -Path D:\MyFolder\*.*

$Diffs = Compare-Object -ReferenceObject $BeforeFolderContent -DifferenceObject $AfterFolderContent 
            -Debug -SyncWindow 1000 -Property Name -PassThru | Sort-Object Name | Select-Object Name, SideIndicator

$Diffs | ForEach-Object {

    $FileName = $_.Name

    If ($_.SideIndicator -eq '<=') {
        Write-Host "Removed $FileName"
    } ElseIf ($_.SideIndicator -eq '=>') {
        Write-Host "Added $FileName"
    }
}
```
