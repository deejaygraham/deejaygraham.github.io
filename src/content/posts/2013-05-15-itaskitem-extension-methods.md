---
title: ITaskItem Extension Methods
tags: [csharp, tdd, code]
---

Writing custom tasks for MsBuild often involves handling files and folders. These are
commonly coded as ITaskItem properties in your task so they are accessible by a script.

Here are a couple of extension methods that I have found useful when working with files and
folders masquerading as _ITaskItem_ objects.

```csharp

{% include 'code/csharp/ITaskItemExtensions.cs' %}

```
