---
permalink: 2018/08/29/passing-parameters-to-a-pester-test/
layout: post
title: Passing Parameters to a Pester Test
published: true 
tags: [ powershell ]
hero: power
thumbnail: "/img/thumbnails/parcel-420x255.webp"
alttext: powershell

---

A useful snippet if you don't want to hard-code values in a <a href="https://github.com/pester/Pester">Pester</a> 
test, either because you want to re-use the test for other situations or to provide values from a CI system 
at runtime. Pester normally takes a Script parameter as a string to a single test or a set of wildcarded tests. Handily, 
it also accepts a hash with the Path mapping to the original script argument and Parameters as a nested hash of 
name value pairs passed as parameters to each test script. 

```powershell

{% include 'code/powershell/Pester-Parameters.ps1' %}

```

The parameters surface in the test script using the usual param block. If you need positional parameters in a script (but why 
would you?) you can pass a comma separated list using the Arguments property in the hash.

If Pester is running as part of a CI build, you can also use the return value from Pester to trigger exiting the script with a return value 
and failing the build.

```powershell

{% include 'code/powershell/Pester-Return.ps1' %}

```

Speaking of integrating with CI builds, Pester also supports writing out test results in NUnit xml format so that they can be ingested 
and processed by other standard tools. 

```powershell

{% include 'code/powershell/Pester-NUnit.ps1' %}

```
