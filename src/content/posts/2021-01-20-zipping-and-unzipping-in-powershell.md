---
title: Zipping and Unzipping in PowerShell
tags: [powershell]
hero: power
thumbnail: "/assets/img/thumbnails/shell-420x255.png"

---

Continuing on with building images in DSC, I needed to build a zip file from some binaries and I often forget that this is
built into PowerShell and doesn't require running a command line tool like 7zip.

Creating a zip file needs a path to take as the source of material to zip up and a destination to write the zip file.
There are a couple of variations in using the path parameter. If you specify a single path, all files will be included from that folder (but not subfolders) and they will be placed in a container within the zip file, named for the folder they came from. This can be inconvenient when you come to unzip where you may have a double level of folder names that you did not intend.

A better way to set the path is with a wildcard. The usual _._ includes everything at the top level of the folder and doesn't create the named container which seems much better to me. If you use a single star for the wildcard, all of the content in the folder and all subfolders are added to the zip file recursively.

Zip.ps1
```powershell

{% include 'code/powershell/CompressArchive.ps1' %}

```

Unzipping a file is the reverse of the zip operation, the path is the zip file location and the destination is where to unzip to.

UnZip.ps1
```powershell

{% include 'code/powershell/ExpandArchive.ps1' %}

```

Again, be careful of zip files with containers within them which can give you too many subfolder when they are unzipped. For example, if I zip up a folder just be specifying c:\all_my_files as the path, then the zip file will not show any contents at the top level but will contain a folder called all_my_files with the expected files within that. Unzipping to another folder, c:\copy_of_my_files will unzip all the files you expect except that they won't be in the root of the folder, they will be in a subfolder called all_my_files.
