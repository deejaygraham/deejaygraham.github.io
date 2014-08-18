---
layout: post
title: Generating File Content in the Build
published: true
tags: [ msbuild, snippets ]
---

Whether your build system was developed by [Heath Robinson](en.wikipedia.org/wiki/W._Heath_Robinson) 
or you simply may want it to look like it was, you can generate files on the fly
as part of the post-build process.

Here, I'm using the built-in AfterBuild target and using an Item to contain the 
text of the file I'm going to write. 

	<Target Name="AfterBuild">
		<ItemGroup>
			<InstallCommand Include="msiexec /q /i $(TargetFileName) " />
		</ItemGroup>
		
		<Delete 
			Files="$(TargetDir)Install.bat" 
			/>
			
		<WriteLinesToFile 
			Lines="@(InstallCommand)" 
			File="$(TargetDir)Install.bat" 
			Encoding="Unicode" 
			/>
			
	</Target>

Once again we prove ItemGroups are good for more than just batching lists 
of files.
