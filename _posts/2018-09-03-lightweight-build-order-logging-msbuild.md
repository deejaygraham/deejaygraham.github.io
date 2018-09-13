---
layout: post
title: Lightweight Build Order Logging in MSBuild
published: true
categories: [ msbuild, code ]
---

If you have a lot of .Net code, projects and solutions to build, it can sometimes be difficult to see the order 
that the projects are actually being built in without going for the nuclear option of detailed or diagnostics logs 
in msbuild. 

If we use the trick of putting a script into the msbuild *ImportAfter* folder, we can hook into every build and append 
each project's build output to a minimal log.


~~~xml

{% include code/msbuild/build-order.xml %}

~~~

