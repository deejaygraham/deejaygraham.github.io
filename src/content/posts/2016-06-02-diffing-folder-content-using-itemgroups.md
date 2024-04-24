---
permalink: 2016/06/02/diffing-folder-content-using-itemgroups/
layout: post
title: Diffing Folder Content using ItemGroups
published: true
tags: [msbuild, code]
---

More on complicated build systems. This time, I was attempting to make the complicated
build faster by removing work that only needs to be done on release builds but is currently
scattered across post build events, batch files and msbuild scripts so that it is done
regardless of the build being done and slowing things down.

The extra work also contributes components and artefacts that, if incorrect, won't break the build but
will cause problems once the application is deployed.

Since the work is in multiple solutions, projects and batch files, each with their own working directory and
set of environmental assumption, it's not easy to see whether my changes have missed anything, are copying
the wrong files, are copying the right files to the wrong location.

What I came up with is a simple build script that can be run once against the known good, "golden copy" of a
build with the time sucking work still in place. I can then put my changes in place and run the script again
and just use a nice diffing tool like [kdiff3](kdiff3.sourceforge.net/) to check for differences in the
build output.

    <?xml version="1.0" encoding="utf-8"?>
    <Project ToolsVersion="4.0"
        			 DefaultTargets="CaptureBuildOutput"
    	    		 xmlns="http://schemas.microsoft.com/developer/msbuild/2003">

        <PropertyGroup>
    	    <BinariesDir Condition=" '$(BinariesDir)' == '' ">D:\dev\project\bin\debug\</BinariesDir>
    	    <OutputFile Condition=" '$(OutputFile)' == '' ">D:\First.txt</OutputFile>
        </PropertyGroup>

        <Target Name="CaptureBuildOutput">

    	    <ItemGroup>
    		    <Binaries Include="$(BinariesDir)**\*.*" />
    	    </ItemGroup>

    	    <WriteLinesToFile
    		    Lines="@(Binaries)"
    		    File="$(OutputFile)"
    		    Encoding="Unicode"
    		    />

        </Target>

    </Project>

Essentially, all the script does is list the content of the output folder and write it to a file. I could have
achieved the same by running _dir_ or _ls_ command in a console window and redirecting to a file. The only
reason I wanted to massively over engineer it in msbuild was so I could hook it up to the old and new build scripts
and have it run as part of the build.
