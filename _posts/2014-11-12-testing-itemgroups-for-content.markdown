---
layout: post
title: Testing ItemGroups for Content
published: true
tags: [ snippets, msbuild ]
---

If you are writing MsBuild scripts that are expected to work consistently 
in a number of different environments it quickly becomes clear that 
encoding pre-requisites in the script and anticipating configuration errors 
across these environments can be a huge time saver.

## It Works On My Machine 

Installations, configurations, folders, environment variables can all differ on 
individual machines depending on their use: CI servers, plain build servers, 
developer's local machines etc. etc.

## Property Diagnostics 

Providing diagnostics for a correctly configured PropertyGroup value is easy using the 
Error task with a condition checking that the value is/is not empty:

	<PropertyGroup>
		<ThisValueMustNotBeBlank></ThisValueMustNotBeBlank>
	</PropertyGroup>
	
	<Task Name="ValidatePrerequisites">

		<Error Text="[%(ThisValueMustNotBeBlank.Identity)] IS blank" Condition=" '$(ThisValueMustNotBeBlank)' == '' " />
		
	</Task>	

Usually, some other part of the script or a calling process will fill in the blank 
value and all your script is trying to do is make sure there is some kind of sensible 
value in there.

## Item Diagnostics

What about if we want to do a similar validation against an ItemGroup? We can 
rely on a similar technique and force the ItemGroup list into a delimited 
list using the "@" operator and test this value in the Error task.

## Wix

Here's how I try to ensure Wix is installed on a machine using this technique.

	<!-- Search for candle - the wix compiler tool -->
	<PropertyGroup>
		<WixCompiler>candle.exe</WixCompiler>
	</PropertyGroup>

	<!-- Wix binaries are installed in a folder wix <version>\bin 
		 either in program files or program files(x86) depending 
		 on the bitness of the operating system.
	-->	 
	<ItemGroup>
		<FindWixCompiler Include="$(ProgramFiles)\**\$(WixCompiler)" />
		<FindWixCompiler Include="$(MSBuildProgramFiles32)\**\$(WixCompiler)" />
	</ItemGroup>

	<Error 
		Condition=" '@(FindWixCompiler)' == '' "
		Text="Wix is not installed!!!"  
		/>

The two FindWixCompiler values are include to support either a 32-bit or 64-bit machines.
