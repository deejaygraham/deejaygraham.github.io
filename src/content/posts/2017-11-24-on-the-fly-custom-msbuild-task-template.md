---
permalink: 2017/11/24/on-the-fly-custom-msbuild-task-template/
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

~~~xml

{% include 'code/msbuild/on-the-fly-template-1.xml' %}

~~~

### 2. Create your task

Give it a name and fill in the basic boilerplate required by msbuild:

~~~xml

{% include 'code/msbuild/on-the-fly-template-2.xml' %}

~~~

### 3. Write the code

Here I'm just writing to the msbuild log, use your imagination to do something more
interesting;


~~~xml

{% include 'code/msbuild/on-the-fly-template-3.xml' %}

~~~

### 4. Use it in your scripts

Add an import statement pointing to the correct relative path for your new
task file. Then use it in a target.

~~~xml

{% include 'code/msbuild/on-the-fly-template-4.xml' %}

~~~

MsBuild will compile and load a temporary assembly containing the custom tasks the
first time the target is hit during a build. If there are compilation errors, you will
see these as errors in the build output along with a helpful message showing the path to the
assembly compilation log which you can use to fix your broken code.

### 5. Pass parameters to your task

Like any other task, you can code the on-the-fly task to accept parameters by defining a
ParameterGroup in the UsingTask.

~~~xml

{% include 'code/msbuild/on-the-fly-template-5.xml' %}

~~~

and invoke it in the same way you would with built-in tasks:

~~~xml

{% include 'code/msbuild/on-the-fly-template-6.xml' %}

~~~

### 6. Pass data back

We can also write the task to pass data back to the calling script. The ParameterGroup
can accept output parameters too and they are assigned in the script in standard
c# syntax.

~~~xml

{% include 'code/msbuild/on-the-fly-template-7.xml' %}

~~~

We can then (optionally) capture the output from that task as a new variable in the
calling script. TaskParameter is the name of the local task variable and PropertyName is
the name of the new variable to create in the calling script that we can then reference
using dollar notation.

~~~

{% include 'code/msbuild/on-the-fly-template-8.xml' %}

~~~
