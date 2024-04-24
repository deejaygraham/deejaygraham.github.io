---
permalink: 2018/11/29/tracing-failed-iis-requests/
layout: post
title: Tracing Failed IIS Requests
tags: [code]
published: true
---

Today, after some frustrating debugging IIS and rewrite rules not matching what was expected, I learned that
IIS can log out the match process and give a break to someone trying to psychically debug a reverse proxy situation.

Here's how I did it in code.

```csharp

{% include 'code/csharp/TraceFailedIISRequests.cs' %}

```
