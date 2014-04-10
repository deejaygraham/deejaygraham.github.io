---
layout: post
title: Simple Batch Html Validation
published: true
tags: [ HTML ]
---

After struggling with writing a suitable html parser, I began to feel 
uncomfortable that I was solving a problem that had already been solved by 
someone, more than once, on the internet. So rather than giving in to "Not 
Invented Here" syndrome, I discovered [HtmlAgility](http://htmlagilitypack.codeplex.com) 
which seems a nice compromise between a lashed-together home-brew solution 
and an HtmlTidy root-and-branch linting.

{% gist 5598223 %}
