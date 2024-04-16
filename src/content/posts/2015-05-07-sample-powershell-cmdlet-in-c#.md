---
permalink: 2015/05/07/sample-powershell-cmdlet-in-c#/
layout: post
title: Sample Powershell Cmdlet in C#
published: true 
categories: [ csharp, code, powershell ]
hero: power
thumbnail: "/img/thumbnails/parcel-420x255.webp"
alttext: powershell
---

Another one from the department of aide memoire. Here's the basic process to follow 
when creating a simple PowerShell Cmdlet in C#.

* Create a new class library.
* Add a reference to the Microsoft Windows PowerShell Engine core assembly - System.Management.Automation.dll
* Add a class derived from <code>System.Management.Automation.Cmdlet</code>
* Add a <code>Cmdlet</code> attribute to the class with a suitable [Verb](https://msdn.microsoft.com/en-us/library/ms714428%28v=vs.85%29.aspx) and [Noun](https://msdn.microsoft.com/en-us/library/dd878270%28v=vs.85%29.aspx).
* Override the <code>ProcessRecord</code> method.
* Add properties decorated with <code>Parameter</code> attributes.
* Consider support for WhatIf? and Confirm Impact.
* Consider applying the <code>OutputType</code> attribute to the class.
* Use <code>WriteError</code> in catch handlers.
* Use <code>WriteObject</code> to send results to the pipeline.
* Create a new Module Manifest (.psd1) using the Powershell <code>New-ModuleManifest</code> cmdlet.
* Make sure the RootModule setting in the manifest points to the cmdlet dll.
* Create a folder named the same as the dll in a Module folder somewhere in the PowerShell search path.
* Copy the .dll and .psd1 (and any other dependencies) into this folder.
* Open a new PowerShell session and use <code>Import-Module</code> to import the new cmdlet(s).
* Use the module.
* Profit!
