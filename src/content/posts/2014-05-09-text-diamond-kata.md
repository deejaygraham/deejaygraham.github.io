---
permalink: 2014/05/09/text-diamond-kata/
layout: post
title: Text Diamond Kata
published: true
tags: [tdd, deliberate-practice]
---

Here's a sample solution for the Text Diamond Kata that I'm using with
[cyber-dojo](http://cyber-dojo.com):

    Given a letter print a diamond starting with 'A'
    with the supplied letter at the widest point.
    For example: print-diamond 'E' prints


        A
       B B
      C   C
     D     D
    E       E
     D     D
      C   C
       B B
        A

This sample deliberately doesn't used recursion (the group is learning basic
algorithm handling), and is written in C# using MsTest as the test framework.

{ % gist 9806070 %}
