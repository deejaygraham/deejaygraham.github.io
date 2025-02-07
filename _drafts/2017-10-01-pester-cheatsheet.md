---
layout: post
title: Get-PesterCheatSheet
tags: [ powershell ]

thumbnail: "/img/thumbnails/parcel-420x255.webp"
alttext: powershell
---

I've been meaning to investigate <a href="https://github.com/pester/Pester/">Pester</a>, the
bdd-like testing framework for PowerShell for quite a while now. Last month I worked on a
new DevOps project where "we" (our PowerShell experts) used Pester to validate pre- and
post- deployment conditions so I thought it was time to dig a bit deeper.

$PSVersionTable - need  v 5

Import-Module PackageManagement

Install-Module Pester -Force 

## Getting Pester


## Test, First

To begin with, we need a test script to host the tests. This should be named something like:
Widgets.Tests.ps1. If you use the Invoke-Pester Cmdlet on a folder, Pester will consider
.Tests.ps1 files as things it should understand. Maybe the first line of the file
should import the Pester module:

~~~

Import-Module Pester

~~~

Since we are going to be testing a local copy of our code rather than an installed one,
we need to know where we are running from and also make sure that we are dealing with the
local version of the code. We can do that by removing any matching in-memory module and
re-importing it.

~~~

$here = Split-Path -Path $MyInvocation.MyCommand.Path

Get-Module MyLovelyCode | Remove-Module -Force
Import-Module $here\MyLovelyCode.psm1 -Force

~~~

## Spec

The first thing to strike me about Pester is that it looks an awful lot like <a href="http://rspec.info/">Rspec</a> the
ruby bdd tool, with "describe", "context" and "it" blocks.


~~~

Describe 'My Lovely Code' {

      Context 'Happy Path' {

          It 'Lovely Code should be completely great' {

              Invoke-LovelyFunction 'cool' | Should Be 9
          }
      }
}

~~~

## Should

"If frogs had wings, they wouldn't bump their asses every time they jumped."


## Modules

It's good to group sets of cmdlets into Modules so the first thing we should be doing
In order to be able to
Pester cheat sheet


## Tags

Describe blocks can have free form text -Tag parameters so that we can classify tests (say, into
  'unit' or 'acceptance' tests) and tell Pester to only run those tests:

~~~

Invoke-Pester -Tag 'unit'

~~~
