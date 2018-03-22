---
layout: post
title: On-the-fly MsBuild Task Template
published: true
categories: [ msbuild, code ]
---

I've written earlier about creating a custom MsBuild task in C# and building it into
an assembly that we can load during a build. An alternative to a compiled assembly is to write your tasks, still in c#, directly in the build script mark up.

### 1. Create a new .tasks xml file

This is where the custom tasks will live. I prefer to keep the custom code separated
from the actual build script.

~~~

<Project ToolsVersion="4.0" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">  

	<!-- Tasks will go here -->

</Project>

~~~

### 2. Create your task

Give it a name and fill in the basic boilerplate required by msbuild:

~~~

<UsingTask TaskName="HelloWorld" TaskFactory="CodeTaskFactory" AssemblyFile="$(MSBuildToolsPath)\Microsoft.Build.Tasks.v4.0.dll">
	<Task>
		<Using Namespace="System"/>
		<Code Type="Fragment" Language="cs">
			<![CDATA[

			]]>
		</Code>
	</Task>
</UsingTask>

~~~

### 3. Write the code

Here I'm just writing to the msbuild log, use your imagination to do something more
interesting;


~~~

<UsingTask TaskName="HelloWorld" TaskFactory="CodeTaskFactory" AssemblyFile="$(MSBuildToolsPath)\Microsoft.Build.Tasks.v4.0.dll">
	<Task>
		<Using Namespace="System"/>
		<Code Type="Fragment" Language="cs">
			<![CDATA[
				Log.LogMessage(MessageImportance.Normal, "Hello, World ");
			]]>
		</Code>
	</Task>
</UsingTask>

~~~

### 4. Use it in your scripts

Add an import statement pointing to the correct relative path for your new
task file. Then use it in a target.

~~~

<Project ToolsVersion="14.0" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">  

	<!-- Path to the task file -->
	<Import Project="HelloWorld.tasks" />

	<!-- Use it -->
	<Target Name="SayHello" >

		<HelloWorld />  

	</Target>

</Project>

~~~

MsBuild will compile and load a temporary assembly containing the custom tasks the
first time the target is hit during a build. If there are compilation errors, you will
see these as errors in the build output along with a helpful message showing the path to the
assembly compilation log which you can use to fix your broken code.

### 5. Pass parameters to your task

Like any other task, you can code the on-the-fly task to accept parameters by defining a
ParameterGroup in the UsingTask.

~~~

<UsingTask TaskName="HelloWorld" TaskFactory="CodeTaskFactory" AssemblyFile="$(MSBuildToolsPath)\Microsoft.Build.Tasks.v4.0.dll">
	<ParameterGroup>
		<Person ParameterType="System.String" Required="true" />
		<Greeting ParameterType="System.String" Required="true" />
	</ParameterGroup>
	<Task>
		<Using Namespace="System"/>
		<Code Type="Fragment" Language="cs">
			<![CDATA[
				Log.LogMessage(MessageImportance.Normal, "{0} {1}" Greeting, Person);
			]]>
		</Code>
	</Task>
</UsingTask>

~~~

and invoke it in the same way you would with built-in tasks:

~~~

	<HelloWorld Person="Brian" Greeting="Hi!" />  

~~~

### 6. Pass data back

We can also write the task to pass data back to the calling script. The ParameterGroup
can accept output parameters too and they are assigned in the script in standard
c# syntax.

~~~

<ParameterGroup>
	<Person ParameterType="System.String" Required="true" />
	<Greeting ParameterType="System.String" Required="true" />
	<FullSentence ParameterType="System.String" Output="true" />
</ParameterGroup>

...

<Code Type="Fragment" Language="cs">
	<![CDATA[
		FullSentence = String.Format("{0} {1}" Greeting, Person);
		Log.LogMessage(MessageImportance.Normal, FullSentence);
	]]>
</Code>

~~~

We can then (optionally) capture the output from that task as a new variable in the
calling script. TaskParameter is the name of the local task variable and PropertyName is
the name of the new variable to create in the calling script that we can then reference
using dollar notation.

~~~

	<HelloWorld Person="Brian" Greeting="Hi!" >  
		<Output TaskParameter="FullSentence" PropertyName="WhatWeWroteToTheLog" />
	</HelloWorld>

	<Message Text="We said $(WhatWeWroteToTheLog)" />

~~~
