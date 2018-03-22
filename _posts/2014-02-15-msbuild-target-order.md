---
layout: post
title: MsBuild Target Order
published: true
categories: [ msbuild, code ]
---

MsBuild version 4.0 introduced two new Target attributes: *BeforeTargets* 
and *AfterTargets*. Prior to v4.0 if you wanted to run some tasks before or 
after a target you had to explicitly build them into the dependency chain 
using the *DependsOnTargets* attribute. For example, if you wanted to do 
something like print a set of configuration messages before running a build, 
you had to add that target to the list of build dependencies. 

	<Target Name="PrintBuildInfo" >
		<Message 
			Text="This is a $(Configuration) build." 
			Importance="high" 
			/>
		<Message 
			Text=".NET framework version $(TargetFrameworkVersion)" 
			/>
	</Target>
	
	<Target Name="Build"
		DependsOnTargets="PrintBuildInfo" >
		
		<!-- Build Stuff -->
		
	</Target>
		
I'm sure you will agree that printing the build info is not really something
that Build depends on, at least not in the same way as cleaning a directory or
making sure a file is in the right place.

This style of target chaining contributes to the fragility of builds and 
make it harder to build loosely coupled scripts, not to mention adding diagnostics 
during development.

With BeforeTargets the original *DependsOnTargets* list can stay the same, 
semantically representing the important parts of the build process and self-contained 
targets can be slotted into the process as required. Magic.

	<Target Name="PrintBuildInfor"
		BeforeTargets="Build">
		<Message 
			Text="This is a $(Configuration) build." 
			Importance="high" 
			/>
		<Message 
			Text=".NET framework version $(TargetFrameworkVersion)" 
			/>
	</Target>
	
	<Target Name="Build" >
		
		<!-- Build Stuff -->
		
	</Target>
	
One thing to note is adding BeforeTargets and AfterTargets changes how MsBuild 
derives the final build order of targets but the targets you define still 
only run once per build even if you specify more than one build target in 
the attribute. 

