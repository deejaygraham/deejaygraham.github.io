---
layout: post
title: Most Recent Folder MsBuild Task
published: true
tags: [ msbuild, automation, CI ]
---

I wrote this MsBuild task because I needed a build script to pick up the most recent copies of a set of assemblies from another, unrelated
project via a network shared drop folder created by TFS.

I couldn't think of another way monitoring the folder and finding the most recent build without tightly entwining my build script with 
calls to the TFS server or Developer Studio.

{% gist 5627099 %}

It's on github [here](https://gist.github.com/deejaygraham/5627099)