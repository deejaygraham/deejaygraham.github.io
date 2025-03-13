---
title: Recursive Copy in MsBuild
tags: [msbuild, code]
---

Simply because I always forget the syntax for this, here's how to recursively
copy a set of files from one folder to another using the &lt;Copy&gt; task.

```xml
    <Target Name="CopyNewTags">
    	<ItemGroup>
    		<FilesToCopy Include="$(FromThisFolder)**\*.*" />
    	</ItemGroup>

    	<Copy SourceFiles="@(FilesToCopy)"
    		DestinationFolder="$(ToThisFolder)%(RecursiveDir)" />
    </Target>
```

The magic, of course, is in using the multi-star notation
in the ItemGroup include and in using the meta value _%(RecursiveDir)_ in
the destination folder attribute.
