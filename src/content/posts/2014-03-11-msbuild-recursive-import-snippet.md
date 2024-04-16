---
permalink: 2014/03/11/msbuild-recursive-import-snippet/
layout: post
title: MsBuild Recursive Import Snippet
published: true
categories: [ msbuild, code ]
---

Here's a neat snippet to add to an msbuild script to import all scripts 
in nested sub-folders rather than hard-coding each one.

	<Import Project="*\**\*.myproject.proj" />



