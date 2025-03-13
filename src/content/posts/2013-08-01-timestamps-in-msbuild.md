---
title: Timestamps in MsBuild
tags: [msbuild, code, csharp]
---

I often need to include a timestamp in a build, either in naming a file
or folder produced during the build, or using it in the content of a file.

MsBuild has built-in property functions that allow this to be fairly painless
once you are familiar with the syntax.

The syntax for calling static methods is:

```xml
    $([Namespace.Type]::Method(parameters if required go here))
```

The syntax for static properties is:

```xml
    $([Namespace.Type]::Property)
```

So you can generate a new guid during a build using:

```xml
    $([System.Guid]::NewGuid().ToString())
```
Here's a timestamp in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format.

```xml
    <PropertyGroup>
    	<_BuildDateAndTime>$([System.DateTime]::Now.ToString(yyyy-MM-ddThhmmss))</_BuildDateAndTime>
    </PropertyGroup>
```

