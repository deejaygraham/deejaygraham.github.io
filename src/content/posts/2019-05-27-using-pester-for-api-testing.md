---
permalink: 2019/05/27/using-pester-for-api-testing/
layout: post
title: Using Pester for API Testing

tags: [powershell]
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"
alttext: powershell
---

<a href="https://github.com/pester/Pester">Pester</a> is rapidly becoming my go-to tool for writing tests that
are outside of traditional C#/NUnit/Visual Studio kinds of tests. Things like snippets of my own PowerShell code
(obviously) but also testing, say, a third-party tool to make sure how we use it isn't broken by us taking an
upgrade to the tool or the operating system it runs on.

Over the last few months I have been writing a PowerShell module to make testing ReST APIs easier with Pester
so that a less technical team could follow by example existing tests and write new tests for new resources
with the minimal of boilerplate and implementation details.

Using Pester I saw this as three components:

- the PowerShell API module
- the Pester startup script
- the resource test script(s) discovered at runtime by Pester

The API module has methods to do basic CRUD operations against a resource, plus utilities to set the base
url, optional headers etc. The utilities are there so that the admin/gardening of setting up the api with
authentication, picking the right endpoint etc. can be done once in the startup script and the test scripts
aren't repeating information or having to use methods not related to the task at hand.

```powershell

{% include 'code/powershell/Pester-RestAPI-Module.psm1' %}

```

I can now define a smoke test script which we can run to set everything up prior to running each Pester test.

```powershell

{% include 'code/powershell/Pester-RestAPI-Start.ps1' %}

```

Which makes for a reasonably compact but focussed test which can be written by a team member without what they
see as unecessary "plumbing" on show. Note here I am using the <a href="https://swapi.co/">Star Wars API</a> to
avoid bogging down the example tests in archaic dommains. You could use any number of test APIs, like
<a href="https://anapioficeandfire.com/">Game of Thrones</a>, <a href="https://dog.ceo/dog-api/">Dog API</a>,
<a href="http://ron-swanson-quotes.herokuapp.com/v2/quotes">Ron Swanson quotes</a> or
<a href="https://icanhazdadjoke.com/api">Dad jokes</a>

```powershell

{% include 'code/powershell/Pester-RestAPI-Luke.Tests.ps1' %}

```

```powershell

{% include 'code/powershell/Pester-RestAPI-Films.Tests.ps1' %}

```
