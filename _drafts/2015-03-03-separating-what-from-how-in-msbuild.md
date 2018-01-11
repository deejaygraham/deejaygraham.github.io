---
layout: post
title: Separating the *What* from the *How* in Msbuild
tags: [ msbuild ]
---

I've spent a lot of time hacking on msbuild scripts recently for some quite diverse projects and I think 
I've just had an A-Ha! moment in making my scripts a little cleaner and better structured.

It centres around a comment I read from [Sayed I Hashimi](http://www.sedodream.com/) about being careful to 
separate the "What" from the "How" when writing msbuild scripts. What he was saying, I think, was 
making sure to create a structure for your scripts where responsibilities are distributed 
appropriately with the same care you would give to your code. In the same way that you wouldn't 
put all your classes in one file, you should not put all your script - logic, files, settings, 
artefacts - in the same file.

Here's the pattern I seem to find most benefit from:

<graphic here>

.props - contains overridable settings, control flags, files and folders used by the scripts.
.targets - standalone targets (e.g. Build, Clean, Publish etc) that depend on the correct properties
and items being setup by the calling script. Concentrates on how the build happens - invoking 
c# compiler, running wix, copying files.
.proj - entry point for the overall script. Specifies what will be built, copied, installed. Includes the 
.props file at the top and uses those settings in defining what to include in the build.



