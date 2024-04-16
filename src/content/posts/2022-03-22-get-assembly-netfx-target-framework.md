---
permalink: 2022/03/22/get-assembly-netfx-target-framework.html
layout: post
title: Read TargetFramework of Assembly in PowerShell
published: true 
categories: [ powershell, code ] 
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"
alttext: logs
---

A tiny snippet I needed today to check the target version of the .Net framework an assembly is built against. The target framework is available as metadata in the assembly and can be seen in tools like iladsm or ILSpy like this: 

`[assembly: TargetFramework(".NETFramework,Version=v4.7.2", FrameworkDisplayName = ".NET Framework 4.7.2")]`

Reading the value of the attribute is a bit involved, loading custom attributes from the assembly and finding the one called TargetFramework.

```powershell

[string]$NewVersionAssembly = Join-Path -Path $MyFolder -ChildPath $MyReferenceAssembly
[string]$TargetFramework = [Reflection.Assembly]::ReflectionOnlyLoadFrom($NewVersionAssembly).CustomAttributes |
Where-Object { $_.AttributeType.Name -eq 'TargetFrameworkAttribute' } |
Select -ExpandProperty ConstructorArguments |
Select -ExpandProperty value

```

The $TargetFramework will now contain `.NETFramework,Version=v4.7.2`.
