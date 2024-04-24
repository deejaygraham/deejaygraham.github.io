---
permalink: 2014/09/24/msbuild-task-project-on-github/
layout: post
title: MsBuild Task Project on Github
published: true
tags: [msbuild, open-source]
---

As if there weren't enough MsBuild Task libraries already, I've added another. I
needed a simple static link checker that would run as part of the build process. The
idea is to verify a website build is good as early as possible so we don't have to
manually check all the files (there are a lot) before deploying.

The code is based on [another post](http://deejaygraham.github.io/2014/05/29/html-link-validation/)
which uses the [Html Agility Pack](http://htmlagilitypack.codeplex.com/) to
validate html links on a page, only this time I've packaged it into an MsBuild
task called "LocalLinkChecker".

The [repo is here](https://github.com/deejaygraham/msbuild-tasks) and you can
get a zip of the task assembly [here](https://github.com/deejaygraham/deejaygraham.github.io/raw/master/downloads/MsBuild.ThreeByTwo.Tasks.zip)
