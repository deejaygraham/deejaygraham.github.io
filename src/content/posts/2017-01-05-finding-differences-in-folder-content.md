---
permalink: 2017/01/05/finding-differences-in-folder-content/
layout: post
title: Finding Differences in Folder Content
published: true
tags: [ powershell  ]
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

<script src="https://gist.github.com/deejaygraham/82ecda64d3e9a9e6aa17414b3ca0ed95.js"></script>
