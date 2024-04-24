---
permalink: 2015/06/18/windbg-cheatsheet/
layout: post
title: Windbg Cheatsheet
published: true
tags: [cloud]
hero: cloud
---

A quick list of the most common windbg commands I use in Azure deployments.

| Command          | Description            |
| ---------------- | ---------------------- |
| Ctrl+Break       | Break (int 3)          |
| g                | Continue               |
| .detach          | Detach process         |
| lmf              | list loaded modules    |
| .dump <path>     | small memory image     |
| .dump /ma <path> | dump full memory image |
| !threads         | managed threads        |
| !clrstack        | managed call stack     |
| !dumpheap        | dump managed heap      |
| !dae             | dump all exceptions    |
| !do <addr>       | object info dump       |
| q                | quit                   |

There's a nice 2008 post from [Tess Ferrandez](http://blogs.msdn.com/b/tess/archive/2008/02/04/net-debugging-demos-information-and-setup-instructions.aspx)
with links to demos showing how to use windbg to debug .Net problems.
