---
title: Running MsBuild on 32-bit and 64-bit Windows
tags: [msbuild, automation, ci]
---

Here's a simple script I use to allow me to invoke an MsBuild project from
the command line. It does some simple checking for whether the machine is
running 32-bit or 64-bit and adjusts the path to msbuild.exe accordingly,
since, of course, msbuild is deployed in different folders in each flavour
of the OS.

```bat

{% include 'code/csharp/MsBuildMake.cmd' %}

```
