---
title: Travis supports C# CI
tags: [code, open-source, ndifference, csharp, cloud]
hero: cloud
---

It's great news that my favourite cloud CI service, [Travis CI](https://travis-ci.org/)
now supports C# directly.

Previously, I detailed [how you could trick it](http://deejaygraham.github.io/2014/08/13/building-ndifference-in-the-cloud/)
into working with C#. Now [they have added direct support for it](http://docs.travis-ci.com/user/languages/csharp/)
and even support for NUnit or XUnit.

Even though this is only a beta deployment, it feels like a massive step forward. I hae
all of my code building at commit time AND I have unit tests as well!

## Changes to .travis.yml

Gone is the need to convince travis that this is a C project. We can at last
proudly proclaim it to be C#. Another big change is that we don't have to
direct it to install mono, it's already done for us.

```yaml
    language: csharp
    solution: NDiffference.sln

    install:
    	- nuget restore NDifference.sln
    	- nuget install xunit.runners -Version 1.9.2 -OutputDirectory testrunner

    script:
    	- xbuild /p:Configuration=Release NDifference.sln
    	- mono ./testrunner/xunit.runners.1.9.2/tools/xunit.console.clr4.exe ./tests/UnitTests/bin/Release/NDifference.UnitTests.dll
```

One thing to note, NDifference is built against v4 of the .Net runtime so I had
to make sure that I started the correct xunit console runner.

## Build

Here's how Travis does the build now:

![Screenshot](/assets/img/posts/travis-supports-cs-ci/travis-build.png "Travis Working")

## Fail

Currently, all my tests pass when run on a Windows machine but not when run in
Travis. I will investigate the differences and report back.

## Build Status

Here's how Travis thinks NDifference is performing: *link redacted*
{# <a href="https://travis-ci.org/deejaygraham/ndifference"><img src="https://travis-ci.org/deejaygraham/ndifference.png?branch=master" alt="Build Status"></a> #}


## Update

I have moved this build process away from travis and onto github now so links to the project on their website no longer work. 


