---
permalink: 2015/10/08/soundex-encoding/
layout: post
title: Soundex Encoding Text in C Sharp
tags: [code]

---

<a href="https://en.wikipedia.org/wiki/Soundex">Soundex</a> is a text encoding algorithm designed to create hashes
of words according to their sound so that similar sounding words can be matched even though they might be
spelled very differently. This sort of phonetic algorithm is what makes it possible for you to search for someone's
name on the internet and be reasonably sure to find them, even if you don't know the exact spelling.

```csharp

{% include 'code/csharp/SoundexTests.cs' %}

```

```csharp

{% include 'code/csharp/Soundex.cs' %}

```
