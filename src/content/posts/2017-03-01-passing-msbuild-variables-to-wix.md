---
permalink: 2017/03/01/passing-msbuild-variables-to-wix/
layout: post
title: Passing MsBuild Variables to Wix

tags: [msbuild]
---

It almost seems like it would be an easy thing to have wix (an xml file-based installer build system)
see and use variables passed to it by a controlling msbuild script (an xml file-based build system). The
reality is a bit more difficult.

We started off wanting to have Wix build a package for us based on files in a version-dependent
folder. As we change the version number, Wix should look in a different folder for the files. We also
wanted this to work on a local (dev) machine _and_ on a build machine running a TFS build agent.

So for a "BuildNumber" maybe an environment variable:

```

$(env.BuildNumber)

```

or a plain old wix variable:

```

$(env.BuildNumber)

```

Now, we can define a variable in the .wxs source or .wxi include file but none of those
are settable from "the outside world" of msbuild or the command line. We have to rely on a
built-in wix feature called DefineConstants which is a semi-colon delimited list of
key value pairs. Opening the .wixproj in Visual Studio, the project property look like this:

![project](/img/posts/passing-msbuild-variables-to-wix/wix-project.webp)

Variables get passed to the wix commandline toolchain using the <code>-d</code> switch:

![project](/img/posts/passing-msbuild-variables-to-wix/candle-commandline.webp)

So, if you don't have a variable defined, msbuild defaults to an emtpy string, which is
maybe not what we want. We can address that by unloading the project and hand editing to
introduce a default. The MsBuild idiom for this is to define a property but add a condition
to only set it if it doesn't already have a value.

DefineConstants looks like this in the project file:

```

  <PropertyGroup>
    <DefineConstants>Debug;NAME=Rob;JOB=Dev;BUILDNUMBER=$(BUILDNUMBER)</DefineConstants>
  </PropertyGroup>

```

We need to define a property upstream of this:

```

  <PropertyGroup>
    <BuildNumber Condition=" '$(BuildNumber)' == '' ">1.0.0.9</DefineConstants>
  </PropertyGroup>

```

In the calling MsBuild script we can use the <code>AdditionalProperties</code> meta data
for a project to pass the variable to wix.

```

  <ItemGroup>
      <ProjectList Include="SetupProject1.sln">
          <AdditionalProperties>BUILDNUMBER=$(MyBuildNumberFromAssembly)</AdditionalProperties>
      </ProjectList>
  </ItemGroup>

  <Message Text="Build is: $(MyBuildNumberFromAssembly)"/>

  <MSBuild Projects="@(ProjectList)"/>

```

Then we can pull the build number in by reading a text file or reflecting on an assembly
version or by reading it from the command line.
