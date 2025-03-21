---
title: Finding Powershell Assemblies
tags: [powershell]
hero: power
thumbnail: "/img/thumbnails/parcel-420x255.webp"

---

I have been having problems with the Start-Transcript command working on some machines and not on others (particularly
within Jenkins CI machines). The error message was not very helpful:

![powershell failure](/img/posts/finding-powershell-assemblies/start-transcript-failure.webp "failure")

so I thought it would make sense to try to find the assembly and see what it's trying to do when it fails.

Using **Get-Command** was the obvious choice but doesn't seem to help.

```

Get-Command Start-Transcript

```

![get command](/img/posts/finding-powershell-assemblies/get-command.webp "get-command")

Then I discovered the Format-List cmdlet
that takes the default output and expands it to show all the properties.

```

Get-Command Start-Transcript | Format-List \*

```

![get command format list](/img/posts/finding-powershell-assemblies/get-command-format-list.webp "get-command-format-list")

Voila! the location of the assembly so I can hunt down the error with IlSpy.
