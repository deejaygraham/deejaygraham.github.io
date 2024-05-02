---
permalink: 2014/04/25/bootstrapping-jekyll-tag-generation/
layout: post
title: Bootstrapping Jekyll Tag Generation
published: true
tags: [meta, code, msbuild]
---

I love working with Jekyll and Github to produce this blog as if it were software.
One of the things that helps with usability, I think, is the ability to have each
post tagged with keywords.

[Eric Jones](erjjones.github.com) wrote a lovely [jekyll module](http://erjjones.github.io/blog/Part-two-how-I-built-my-blog/)
to auto generate tag pages, but one of the challenging things is remembering
to keep the tags up to date before checking in a new post.

In lieu of someone to code review my posts and commits, I wrote a little
bit of a script in msbuild to remember for me.

```xml
<Project DefaultTargets="BuildWithJekyll" ToolsVersion="4.0" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">

	<PropertyGroup>
		<TagsFolder>$(MSBuildThisFileDirectory)tags\</TagsFolder>
		<SiteTagsFolder>$(MSBuildThisFileDirectory)_site\tags\</SiteTagsFolder>
	</PropertyGroup>

	<Target Name="BuildWithJekyll"
		DependsOnTargets="RemoveTagsFolder;
							RunJekyll;
							CreateTagsFolder;
							CopyNewTags" />
	
	<Target Name="RemoveTagsFolder">
		
		<ItemGroup>
			<FilesToDelete Include="$(TagsFolder)**\*.*" />
		</ItemGroup>
		
		<Message Text="Deleting tags folder" Importance="High" />
		
		<Delete Files="@(FilesToDelete" />
		<RemoveDir Directories="$(TagsFolder)" 
				Condition="Exists('$(TagsFolder)')"/>
		
	</Target>
	
	<Target Name="CreateTagsFolder">

		<MakeDir 
				Directories="$(TagsFolder)"
				Condition="!Exists('$(TagsFolder)')" 
				/>
	
	</Target>
	
	<Target Name="RunJekyll">
	
		<Exec Command="jekyll build" />
		
	</Target>
	
	<Target Name="CopyNewTags">
		<ItemGroup>
			<FilesToCopy Include="$(SiteTagsFolder)**\*.*" />
		</ItemGroup>
		
		<Copy SourceFiles="@(FilesToCopy)"
			DestinationFolder="$(TagsFolder)%(RecursiveDir)" />
	</Target>

</Project>

```

Then I wrote a batch file to invoke this script before running the test server:

```cmd
    @echo off

    SET MsBuildPath="%windir%\Microsoft.NET\Framework\v4.0.30319\MSBuild.exe"

    rem Is this a 64 bit machine?
    IF EXIST "%Programfiles(x86)%" SET MsBuildPath="%windir%\Microsoft.NET\Framework64\v4.0.30319\MSBuild.exe"

    %MsBuildPath% /nologo BuildSite.msbuild

    rem Now run server
    jekyll serve
```

Now I just have to remember to commit the tag changes with the post :)
