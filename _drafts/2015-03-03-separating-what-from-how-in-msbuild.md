---
layout: post
title: Separating the *What* from the *How* in Msbuild
tags: [ msbuild ]
draft: true
---

I've spent a lot of time hacking on msbuild scripts recently for some quite diverse projects and I think 
I've just had an A-Ha! moment in making my scripts a little cleaner and better structured.

It centres around a comment I read from [Sayed I Hashimi](http://www.sedodream.com/) about being careful to 
separate the "What" from the "How" when writing msbuild scripts. What he was saying, I think, was 
making sure to create a structure for your scripts where responsibilities are distributed 
appropriately with the same care you would give to your code. In the same way that you wouldn't 
put all your classes in one file, you should not put all your script - logic, files, settings, 
artefacts - in the same file.

Here's the pattern I seem to find most benefit from:

## .Props 

.props files contain overridable settings, control flags, files and folders used by the scripts.

```xml
<Project ToolsVersion="14.0" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">

  <PropertyGroup>
    <ToolsDir Condition=" '$(ToolsDir)' == ''">$([System.IO.Path]::GetFullPath('$(MSBuildThisFileDirectory)..\Tools\'))</ToolsDir>
    <NUnitConsolePath>$(ToolsDir)Bin\NUnit-3.6.1\nunit3-console.exe</NUnitConsolePath>
  </PropertyGroup>  

</Project>
```

## .Targets

.targets files contains standalone targets (e.g. Build, Clean, Publish etc) that depend on the correct properties
and items being setup by the calling script. Concentrates on how specific steps in the build happens - invoking the c# 
compiler, running tools, copying files.

```xml
<Project ToolsVersion="14.0" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">

  <Target Name="CheckPreconditions" >
    <Error Text="No assemblies found in Test collection, create an ItemGroup with unit test assemblies: &lt;Test Include=&quot;MyTests.dll&quot; /&gt;" Condition=" '@(Test)' == '' " />
  </Target>

  <!-- Run NUnit on all test assemblies -->
  <Target Name="TestWithNUnit" Condition=" '@(Test)' != '' ">
    <Exec
          Command="&quot;$(NUnitConsolePath)&quot; $(NUnitConsoleArgs) --result=TestResult-%(Filename).xml;format=nunit2 %(Test.Identity)"
          ContinueOnError="ErrorAndContinue" >
      <Output TaskParameter="ExitCode" ItemName="NUnitExitCode" />
    </Exec>

  </Target>

  <Target Name="UnitTest" DependsOnTargets="CheckPreconditions;TestWithNUnit" />

</Project>
```


## .Proj

The .proj file acts as the entry point for the overall script. Specifies what will be built, copied, installed. Includes the 
.props file at the top and uses those settings in defining what to include in the build.

```xml
<Project DefaultTargets="Build" ToolsVersion="14.0" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">

  <Import Project="$(RootDir)UnitTesting.props"  />
  <Import Project="UnitTesting.targets" />

  <PropertyGroup>

  <Target Name="Build" DependsOnTargets="UnitTest" />
</Project>
```
