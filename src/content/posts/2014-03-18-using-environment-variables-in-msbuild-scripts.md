---
permalink: 2014/03/18/using-environment-variables-in-msbuild-scripts/
layout: post
title: Using Environment Variables in MsBuild Scripts
published: true
tags: [msbuild, code]
---

It is only recently I realised you can use Windows environment variables
in your msbuild scripts. If you want to allow overrides of build settings
on a per-user basis but don't want force anyone to create a file just to
prevent the build from breaking, you can use something like this:

```xml
    <Import
    	Project="$(USERPROFILE)\Customisation.props"
    	Condition="Exists('$(USERPROFILE)\Customisation.props')" />
```

This shows to neat things. First, the USERPROFILE environment variable is
referenced using the exact same syntax as normal MsBuild properties.

Second, the inclusion is optional thanks to the Condition on the Task testing
whether the file exists and only allowing the import if it does.

You can read more details about this feature [on MSDN](http://msdn.microsoft.com/en-us/library/ms171459.aspx).
