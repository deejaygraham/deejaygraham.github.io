---
layout: post
title: Using Contains to Examine MSBuild Properties
published: true 
tags: [ msbuild  ]
---

Sometimes I see MsBuild scripts which seem to be trying to treat it more 
as a glorified batch file than a .Net-capable language. Such scripts often go 
"around the houses" to accomplish something which could be done fairly simply with 
something like Property Functions.

The kind of thing I mean usually manifests as several declarations of a property, each 
with a different condition or as multiple error or warning tasks, each trapping the same 
thing but with slightly different conditions. 

Using a Property Function makes this so much more elegant and snappier if you are able to 
use MsBuild with .Net 4 or 4.5. Here's an example of a Condition checking the content of 
a property.

~~~xml

  <Warning Text="This is a debug build " Condition=" $(Configuration.Contains('Debug')) " />

~~~

