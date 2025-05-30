---
title: Building a Chat Bot
tags: [csharp, code]
---

Clearing out some old projects from years ago, I came across a console app that uses <a href="http://sourceforge.net/projects/aimlbot">AIML bot</a>,
an open source project to build a simple chat bot based on configurable text templates to match user input with (hopefully)
meaningful, if not Turing-like, responses.

<img src="/assets/img/posts/building-an-aiml-chatbot/chat.png" alt="chat bot" />

The project needs the AIMLBot.dll and the aiml (subject matter markup) and config (settings and word substitutions) folders shipped
with the AIMLBot binary.

```csharp

{% include 'code/csharp/AIMLBot.cs' %}

```
