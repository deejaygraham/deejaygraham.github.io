---
permalink: 2014/04/02/zipping-folder-contents-using-msbuild/
layout: post
title: Zipping Folder Contents Using MsBuild
published: true
tags: [msbuild, code]
---

Here's a script to zip the contents of a folder. Again, this is posted more
so I don't forget but hopefully someone else will find it useful.

## Step 1

Get the [MsBuild Community Tasks](https://github.com/loresoft/msbuildtasks/releases)
and unzip it or use NuGet to get the _MsBuildTasks_ package.

## Step 2

Import the task:

```xml
    <UsingTask
    	AssemblyFile="$(MyMsBuildTasksFolder)MSBuild.Community.Tasks.dll"
    	TaskName="MSBuild.Community.Tasks.Zip"
    	/>
```

## Step 3

Create your target:

```xml
    <Target Name="BuildZip">
    	<!--
    		Using dynamic item creation so files do not
    		need to exist at the start of the build
    	-->
    	<CreateItem Include="*\**\*.*" >
    		<Output
    			ItemName="ZipContent"
    			TaskParameter="Include"
    			/>
    	</CreateItem>

    	<MSBuild.Community.Tasks.Zip
    		ZipFileName="MyFilesButZipped.zip"
    		WorkingDirectory="$(MyWorkingFolder)"
    		Files="@(ZipContent)"
    		/>
    </Target>
```

## Step 4

Save and run the script :)
