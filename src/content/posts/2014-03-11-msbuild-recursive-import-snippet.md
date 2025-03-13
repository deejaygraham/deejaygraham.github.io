---
title: MsBuild Recursive Import Snippet
tags: [msbuild, code]
---

Here's a neat snippet to add to an msbuild script to import all scripts
in nested sub-folders rather than hard-coding each one.

```xml
    <Import Project="*\**\*.myproject.proj" />
```

Here I'm thinking of parts of the application like core.myproject.proj, ui.myproject.proj, api.myproject.proj etc.
