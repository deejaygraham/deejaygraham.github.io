---
permalink: 2014/01/03/decompiling-net-assemblies/
layout: post
title: Decompiling .Net Assemblies
published: true
tags: [ csharp, code, open-source ]
---

Another entry from the "Combatting Not-Invented-Here Syndrome" department.

This utility uses the [ICSharpCode](http://www.icsharpcode.net/) decompiler 
and [Mono's](http://www.mono-project.com/Main_Page) Cecil library to load 
a managed assembly (or folder's worth of assemblies) and generate a code file 
for each type found.

```csharp

{% include 'code/csharp/DecompileAssembly.cs' %}

```


