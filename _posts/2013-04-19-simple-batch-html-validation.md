---
layout: post
title: Simple Batch Html Validation
published: true
categories: [ code, csharp, open-source ]
---

After struggling with writing a suitable html parser, I began to feel 
uncomfortable that I was solving a problem that had already been solved by 
someone, more than once, on the internet. So rather than giving in to "Not 
Invented Here" syndrome, I discovered <a href="http://html-agility-pack.net/" alt="link to html agility site">HtmlAgility</a> 
which seems a nice compromise between a lashed-together home-brew solution 
and an HtmlTidy root-and-branch linting.

```csharp

{% include code/csharp/SimpleBatchHtmlValidation.cs %}

```
