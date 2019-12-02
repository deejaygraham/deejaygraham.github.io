---
layout: post
title: Generating Checksums in PowerShell
published: true
categories: [ powershell ]
thumbnail: "/img/thumbnails/parcel-420x255.jpg"
alttext: powershell
---

A tiny snippet of PowerShell I needed recently to generate a hash value for a (zip) file
then write out that value to a file suitable for shipping to the customer. Originally
this was invoked via an MsBuild Exec command but it works equally well as a standalone
chunk.

~~~

Get-FileHash -Path MyLovelyFile.zip -Algorithm SHA256 |
Select -ExpandProperty "Hash" |
Out-File MyLovelyFile.SHA256.txt

~~~

Get-FileHash returns an object containing the path, the hash algorithm and the actual
value. Since I'm only really interested in the value and saving it alongside the
original source, I use Select to only write the hash property to the file. This is a
little more elegant and, more importantly, doesn't reveal the full path of where the
command was run (which may be deep in a development source stack or on a build server). 
