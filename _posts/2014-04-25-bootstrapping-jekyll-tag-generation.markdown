---
layout: post
title: Bootstrapping Jekyll Tag Generation
published: true
tags: [ meta, code, msbuild ]
---

I love working with Jekyll and Github to produce this blog as if it were software.
One of the things that helps with usability, I think, is the ability to have each
post tagged with keywords.

[Eric Jones](erjjones.github.com) wrote a lovely [jekyll module](http://erjjones.github.io/blog/Part-two-how-I-built-my-blog/) 
to auto generate tag pages, but one of the challenging things is remembering 
to keep the tags up to date before checking in a new post.

In lieu of someone to code review my posts and commits, I wrote a little 
bit of a script in msbuild to remember for me.

<script src="https://gist.github.com/deejaygraham/0fb79ff4768418c90108.js"></script>

Then I wrote a batch file to invoke this script before running the test server:

	
	@echo off
	
	SET MsBuildPath="%windir%\Microsoft.NET\Framework\v4.0.30319\MSBuild.exe"
	
	rem Is this a 64 bit machine?
	IF EXIST "%Programfiles(x86)%" SET MsBuildPath="%windir%\Microsoft.NET\Framework64\v4.0.30319\MSBuild.exe"
	
	%MsBuildPath% /nologo BuildSite.msbuild
	
	rem Now run server
	jekyll serve 	

Now I just have to remember to commit the tag changes with the post :)
