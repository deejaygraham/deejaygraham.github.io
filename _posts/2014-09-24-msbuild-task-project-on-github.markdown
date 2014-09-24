---
layout: post
title: MsBuild Task Project on Github
published: true
tags: [ msbuild, open-source, github ]
---

As if there weren't enough MsBuild Task libraries already, I needed a simple 
static link checker to verify a website build is good before deploying.

The code is based on [another post](http://deejaygraham.github.io/2014/05/29/html-link-validation/) 
another post which uses the [Html Agility Pack](http://htmlagilitypack.codeplex.com/) to 
validate html links on a page, only this time I've packaged it into an MsBuild 
task called "LocalLinkChecker".
 
You can get a zip of task [here](https://github.com/deejaygraham/msbuild-tasks/blob/master/msbuild-tasks.zip)

