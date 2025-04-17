---
title: Read TargetFramework of Assembly in PowerShell
tags: [powershell, code]
hero: power
thumbnail: "/assets/img/thumbnails/shell-420x255.png"

---

A tiny snippet I needed today to check the target version of the .Net framework an assembly is built against. The target framework is available as metadata in the assembly and can be seen in tools like iladsm or ILSpy like this:

`[assembly: TargetFramework(".NETFramework,Version=v4.7.2", FrameworkDisplayName = ".NET Framework 4.7.2")]`

Reading the value of the attribute is a bit involved, loading custom attributes from the assembly and finding the one called TargetFramework.

```powershell

[string]$NewVersionAssembly = Join-Path -Path $MyFolder -ChildPath $MyReferenceAssembly
[string]$TargetFramework = [Reflection.Assembly]::ReflectionOnlyLoadFrom($NewVersionAssembly).CustomAttributes |
Where-Object { $\_.AttributeType.Name -eq 'TargetFrameworkAttribute' } |
Select -ExpandProperty ConstructorArguments |
Select -ExpandProperty value

```

The $TargetFramework will now contain `.NETFramework,Version=v4.7.2`.
