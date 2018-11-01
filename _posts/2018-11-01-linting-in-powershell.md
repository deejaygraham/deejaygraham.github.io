---
layout: post
title: Linting in PowerShell
published: true 
categories: [ powershell ]
hero: power
---

Continuing the theme of C++ flavoured tools I miss, lint is another essential that doesn't appear to exist in the PowerShell world. Until I discovered ScriptAnalyzer which, 
it seems, can do pretty much the same job for .ps1 files. Here I wrote a simple loop to check all files in the same directory. 

```powershell

{% include code/powershell/Lint-Scripts.ps1 %}

```
