---
permalink: 2019/11/11/tagging-tfs-builds-msbuild/
layout: post
title: Tagging TFS builds from MSBuild
published: true
tags: [msbuild, code, tfs]
thumbnail: /img/posts/tagging-tfs-builds-msbuild/tag-420x255.webp
alttext: tag
---

Here's another integration between MsBuild and TFS that I didn't know you could do - add tags to a build.

Tagging a build allows you to filter on a giant list of builds to see which ones match the criteria. In my case
I wanted to check the exit code for nunit-console.exe and tag any builds where the exit code is non-zero (a problem)
and positive (the number equals the number of tests failed for that test assembly).

Again, we use the weird <a href="https://docs.microsoft.com/en-us/azure/devops/pipelines/scripts/logging-commands?view=azure-devops&tabs=powershell" >tfs</a> <a href="https://github.com/microsoft/azure-pipelines-tasks/blob/master/docs/authoring/commands.md">vso</a>
output syntax.

{% highlight "xml" %}

{% include 'code/msbuild/add-tfs-tag.xml' %}

{% endhighlight %}
