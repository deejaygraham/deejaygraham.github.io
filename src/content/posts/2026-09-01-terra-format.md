---
title: Terraform(at)
tags: [git, powershell]
---

A tiny but handy snippet of code which formats terraform source files, but only the ones that have changed recently, according 
to git diff.

```powershell
git diff --name-only main -- '*.tf' | ForEach-Object { terraform fmt $_ }
```

The output is the list of files changed and formatted, one per line. 
