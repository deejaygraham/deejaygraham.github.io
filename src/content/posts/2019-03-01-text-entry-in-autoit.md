---
title: Text Entry in AutoIt
tags: [powershell]
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"

---

There are a number of special commands and keys in <a href="https://www.autoitscript.com/site/">AutoIt</a> that are represented
by a combination of characters that themselves need to be escaped so that the interpreter doesn't get confused. To type
the Alt key plus a letter, the letter A say, as a keyboard shortcut, you ask AutoIt to type !a (bang a). If the character you want
to type is a bang/exclamation point on it's own, you need to surround it with curly braces {!}

One scenario where you might run into this is in entering user credentials where an account password might contain special characters like
hashes and bangs. This is where a nice typing function comes in handy.

```powershell

{% include 'code/powershell/AutoitTyper.ps1' %}

```

We 'type' each character via AutoIt but check to make sure that we escape any of the special characters.
