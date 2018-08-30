---
layout: post
title: Passing Parameters to a Pester Test
published: true 
categories: [ powershell ]
hero: power
---

A useful snippet if you don't want to hard-code values in a <a href="https://github.com/pester/Pester">Pester</a> 
test, either because you want to re-use the test for other situations or to provide values from a CI system 
at runtime. Pester normally takes a Script parameter as a string to a single test or a set of wildcarded tests. Handily, 
it also accepts a hash with the Path mapping to the original script argument and Parameters as a nested hash of 
name value pairs passed as parameters to each test script. 

```powershell

{% include code/powershell/Pester-Parameters.ps1 %}

```

The parameters surface in the test script using the usual param block. If you need positional parameters in a script (but why 
would you?) you can pass a comma separated list using the Arguments property in the hash.
