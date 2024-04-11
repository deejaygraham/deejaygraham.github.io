---
layout: post
title: Pre- and Post- Build Differences in MSBuild
published: true
categories: [ msbuild, code ]
---

Again with the large codebases. Along with many other problems, it can be difficult to see what physical binaries 
have been created or copied when a build takes place, particularly if pre- and post- build events are used as a sort 
of batch file within the .csproj. Migrating away from that undesirable kind of build process can be difficult if you can't 
tell what is supposed to be happening. 

If we use the BeforeTargets and AfterTargets hooks in the msbuild pipeline we can 
take a snapshot of the output folder immediately before the build and immediately after it and store both snapshots in 
correspondingly named files. Then we can use a diff tool to look at, well, the differences. 

~~~xml

{% include 'code/msbuild/build-snapshot.xml' %}

~~~

