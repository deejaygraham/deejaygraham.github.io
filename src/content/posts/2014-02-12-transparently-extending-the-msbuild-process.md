---
permalink: 2014/02/12/transparently-extending-the-msbuild-process/
layout: post
title: Transparently Extending the MsBuild Process
published: true
tags: [msbuild, code]
---

It's often the case that you need to extend your normal build process. To copy
files into place before a build. To make files writable or read-only. To
copy files out to a folder after a build. That kind of thing.

Very often the go-to of a developer who doesn't understand the awesome beauty
of MsBuild is to open a project's settings and add pre- or post-build steps.

I often see huge chunks of DOS commands in these steps. The problem with
this approach is that all of the commands get executed in a single step. If
one command fails the whole thing fails and you often have no idea why.

Is it a copy operation that failed? Did it not create the folder? What?

Since .XXproj files are just MsBuild files with a different extension, it's
far better to remove the pre- and post-build steps and add explicit tasks into
the project using the

    <Target Name="BeforeBuild">
    	<!-- Do pre build stuff -->
    </Target>

and

    <Target Name="AfterBuild">
    	<!-- Do post build stuff -->
    </Target>

targets.

This works well provided the target is a unique piece of functionality.

If you need to replicate the same build step across many solutions it means
making the same change to each project or refactoring the target(s) into a
separate file to be called by all projects.

For example, delay signing an assembly after it is built is a general purpose
task that you wouldn't want to paste into every project. Extracting it into
a separate script means it can be called by every project that requires it.

<Project xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
		
	<!-- 
		Path to snk file used to sign assemblies 
	-->
	<PropertyGroup>
		<KeyFilePath>MyPrivateKey.snk</KeyFilePath>
		<SignAssemblies Condition=" '$(SignAssemblies)' == '' ">false</SignAssemblies>
	</PropertyGroup>
		
	<!-- 
		Signing is invoked after the build process has completed 
		but BEFORE any Post Build Events (typically xcopy commands)
		are performed
	-->	
	<PropertyGroup>
		<PostBuildEventDependsOn>
			$(PostBuildEventDependsOn);
			SignTargetSkippedMessage;
			SignBuiltAssembly
		</PostBuildEventDependsOn>
	</PropertyGroup>
	
	<!-- 
		Invokes the sn.exe command line utility passing the path 
		of the assembly just built and the path to the strong name key.
	-->
	<Target Name="SignBuiltAssembly" 
		DependsOnTargets="FindPathToSnTool" 
		Condition=" '$(SignAssembly)' != '' AND '$(DelaySign)' != '' AND $(SignAssembly) AND $(DelaySign)"> 
	
		<Message 
			Text="Signing $(TargetPath)..." />
			
		<Exec 
			Command="&quot;$(SnPath)&quot; -R &quot;$(TargetPath)&quot; &quot;$(KeyFilePath)&quot; " 
			/>
	
	</Target>
	
	<!-- 
		If $(SignAssembly) not set, issue a diagnostic message 
	-->
	<Target Name="SignTargetSkippedMessage" 
		Condition=" '$(SignAssembly)' == '' OR '$(DelaySign)' == '' OR !$(SignAssembly) OR !$(DelaySign)" >
		
		<Message 
			Text="SignAssemblies property not enabled - Skipping signing of $(TargetPath)" />
			
	</Target>
</Project>

Here we tap into the $(PostBuildEventDependsOn) dependency chain and insert our
own tasks.

## Simple Import

Refactoring into another MsBuild script is fine but requires changing each
project file to include an _Import_ statement to refer to the new script. The path
can be local to your source code or one of MsBuild's well-known folders:

    <Import
    	Project="$(MSBuildToolsPath)\MyPostBuild.targets"
    	Condition="Exists('$(MSBuildToolsPath)\MyPostBuild.targets')"
    	/>

where $(MSBuildToolsPath) usually resolves to somewhere like C:\Windows\Microsoft.NET\Framework\v4.0.30128.
Obviously, if you have a lot of projects this might not be all that appealing.

## Import Condition

Adding the condition means that the import won't fail if the file does not exist.
This allows for build steps that only get executed on, say, official build
machines and ignored on developer machines.

## Sneakier Import

If you don't want to modify each project, there are two other folders that MsBuild
uses to look for extension points for the command line:

    $(MSBuildExtensionsPath)\4.0\Microsoft.Common.Targets\ImportAfter\

and for the IDE

    $(MSBuildExtensionsPath)\12.0\Microsoft.Common.Targets\ImportAfter\

If you place a target file in both of these locations (first, create the folder,
it isn't created by default) it will be imported by _every solution_ that
MsBuild tries to build _on that machine_.

For me, given that this is targetted at a code base of several hundred assemblies, it's
very nice not to have to update all those project files!

## Sneakier Build Process

Rather than using an explicit _PostBuildEventDependsOn_ chain, another alternative
is to use the _BeforeTargets_ and _AfterTargets_ attributes to shoehorn the
target into the right place in the build process. In this case, because I want to
invoke the target after the build but before running an post-build steps, I
use the following:

    <Target Name="..."
    	AfterTargets="CopyFilesToOutputDirectory"
    	BeforeTargets="PostBuildEvent;AfterBuild"
    	>
    	...
    </Target>

So as long as the assembly is in the output folder (after _CopyFilesToOutputDirectory_)
and before any kind of post build event (before _PostBuildEvent_ and _AfterBuild_ events) I
can leave it up to MsBuild when it will run the target.
