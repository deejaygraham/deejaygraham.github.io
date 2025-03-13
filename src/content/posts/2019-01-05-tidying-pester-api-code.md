---
title: Tidying Pester API Code
tags: [powershell]
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"

---

PowerShell's Invoke-RestMethod is a really nice cmdlet to use if you write Rest API test code using the Pester framework. One of the biggest
advantages is that if an non-success code is returned from any request you don't have to handle the exception, it gets reported by Pester
as an error, stopping the test. The other advantage I would say is that successful calls return a nicely created object rather than a Json
document so that tests can use the returned object directly rather than searching in text or having to hydrate a custom object from the Json.

Tests against an (imagined) rest API could look something like this

```powershell

{% include 'code/powershell/Count-ApiFields-1.ps1' %}

```

Given that you now have a nice object handed to you by Invoke-RestMethod, it's easy to see that specific fields are present with the
correct values but it's difficult to work out if you have the right size of object - that a field hasn't been added or removed by accident.

Luckily, thanks to the introspective nature of PowerShell, you can use Get-Member to work out how many properties have been returned in the Json
and converted to properties on the custom object. These properties seem to be a special type of NoteProperty rather than the plain Property
type I was expecting.

```powershell

{% include 'code/powershell/Count-ApiFields-2.ps1' %}

```

Putting that into the body of our test works but it's a bit complex to read and would probably not fair very well if someone was to copy this test
as the basis for another.

```powershell

{% include 'code/powershell/Count-ApiFields-3.ps1' %}

```

To address this, I thought first off to add a custom Pester assertion, as <a href="https://mathieubuisson.github.io/pester-custom-assertions/">outlined here</a>. That seemed to
be too much effort for the tiny bit of tidying I though was warranted by the code so I converted the Get-Member snippet into a cmdlet, Get-FieldCount,
that could be used as part of an assertion.

```powershell

{% include 'code/powershell/Count-ApiFields-4.ps1' %}

```

```powershell

{% include 'code/powershell/Count-ApiFields-5.ps1' %}

```
