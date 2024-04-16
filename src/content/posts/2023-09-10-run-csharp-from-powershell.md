---
permalink: 2023/09/10/run-csharp-from-powershell.html
layout: post
title: Running CSharp code from PowerShell
published: true
categories: [ csharp, code ]
---

For nearly all the time that I have been using PowerShell I have used advanced cmdlets to do stuff not included directly. 

I started off using advanced cmdlets in PowerShell itself before progressing on to writing CSharp cmdlets built into a DLL when 
plain "scripting" wouldn't do. Sometimes that was awkward because I needed a way to invoke some functionality that was already 
implemented in a .net assembly. Unfortunately that assembly was quite heavyweight and tied to a lot of other assumptions about the 
runtime environment so not suitable to be called from PowerShell by importing the module. This meant I was sometimes duplicating code 
in order to make it available to PowerShell too. 

That always screams to me that I am doing something wrong but I didn't know there was a different way to do it. I am almost embarrassed to 
find out that PowerShell from v2 onwards supported building code on the fly and then calling it from PowerShell in exactly the same way 
as any other .net code. 

Rather than importing an assembly as a module, you can use the Add-Type cmdlet to add code as plain source code and have it compiled and invokable.

```csharp

$Source = @"
using System;

public static class Hello 
{
    public static void World()
    {
        Console.WriteLine("Hello World this is an updated console line");
    } 
}
"@

Add-Type -TypeDefinition $Source -Language CSharp

[Hello]::World()

```

Of course, this had to be a hello world example. Source can be inline as above or it can be loaded from an external file:

```csharp

$Source = Get-Content -Path "C:\Dev\MyAwesomeCode.cs"
Add-Type -TypeDefinition $Source -Language CSharp

[Hello]::World()

```

Using an external file means that I can share a source code file between the heavyweight .net assembly and a ps1 script. Very happy 
and only a little embarrassed that it took me until now to find out about this :).
