---
layout: post
title: Refreshing Folder Contents
published: true
tags: [ msbuild, snippets ]
---

The traditional method of copying content from one folder to another is fairly 
straightforward:

	<PropertyGroup>
		<SourceFolder>C:\MySource\</SourceFolder>
		<DeployFolder>C:\Deploy\</DeployFolder>
	</PropertyGroup>
	
	<ItemGroup>
		<SourceFiles Include="$(SourceFolder)*.dll" />
	</ItemGroup>
	
	<Copy 
		SourceFiles="@(SourceFiles)"
		DestinationFolder="$(DeployFolder)"
		/>
		
Here, we look for everything in the source folder and copy it to the destination,
over writing files and copying new files.
		
One thing this doesn't take into account is, what if you ONLY want to refresh 
what's in your destination? Maybe you have extra dlls, test code, alternate IoC  
loaded implementations? Then you need something like this:


	<PropertyGroup>
		<SourceFolder>C:\MySource\</SourceFolder>
		<DeployFolder>C:\Deploy\</DeployFolder>
	</PropertyGroup>
	
	<ItemGroup>
		<ReplacedBinaries Include="$(DestinationFolder)*.dll" />
	</ItemGroup>
	
	<Copy 
		SourceFiles="$(SourceFolder)%(ReplacedBinaries.Filename)%(ReplacedBinaries.Extension)"
		DestinationFolder="@(ReplacedBinaries)"
		ContinueOnError="WarnAndContinue"
		/>

Here, we make a list of everything currently in the destination folder and then 
use batching to construct candidate source files on the fly. I have added a 
continue option to the copy in case a source file does not exist.
		
		
