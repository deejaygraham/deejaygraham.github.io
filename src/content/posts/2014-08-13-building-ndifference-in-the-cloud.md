---
permalink: 2014/08/13/building-ndifference-in-the-cloud/
layout: post
title: Building NDifference in the Cloud

tags: [code, open-source, ndifference, csharp, cloud]
hero: cloud
---

Ever since I switched over to github to host my [NDifference](http://http://deejaygraham.github.io/ndifference/)
project I have been missing CI builds and looking for something better than
running a script locally to check out code, build and run tests.

Eventually I discovered [Travis CI](https://travis-ci.org/) which is exactly
what I had been dreaming about, a cloud-based continuous integration service
that is free for public github repositories.

## Travis

As with all CI solutions, the idea is that each time you push a change to
github, Travis will see it and run a script to build your project. You even
get a live status indicator so you can check the last build status.

Here's the current status of NDifference: <a href="https://travis-ci.org/deejaygraham/ndifference"><img src="https://travis-ci.org/deejaygraham/ndifference.webp?branch=master" alt="Build Status"></a>

One small complication that you might not expect given the build up so far,
Travis is more commonly used for building Ruby projects and there is no default
setup for .Net.

Thankfully, because Travis is running on a linux instance it's fairly easy to
trick it into thinking it's building a hip language project.

Here are the steps:

- Make sure you can build your code using MsBuild. If it builds with MsBuild it should build fine with [Mono's xbuild](http://mono-project.com/Microsoft.Build).
- Go to the [Travis CI](https://travis-ci.org/) website and sign in using your github account.
- Activate each repository you'd like to enable. This was temperamental for me and you need to be patient. It seems to take a while to discover repostories and hook them up.
- Create a .travis.yml file in the root of your repository (see below).
- Push to changes github.
- Profit!

## .travis.yml

You can refer to the documentation for all the options but here's my travis file for NDifference:

    language: c

    before_install:
    	- sudo apt-get update -qq > /dev/null
    	- sudo apt-get install -qq mono-devel > /dev/null
    	- mozroots --import --sync
    	- export EnableNuGetPackageRestore=true

    install:
    	- sudo apt-get install mono-gmcs

    script:
    	- xbuild NDifference.proj /t:TravisCI

So first I pretend I'm going to be building a C language project (the
trickery part). Then I make sure all packages are up to date before installing
mono. Finally I build the project using xbuild with a specific target
(/t:TravisCI) which means I bypass running unit tests.

![Screenshot](/img/posts/building-ndifference-in-the-cloud/travis-screenshot.webp "Travis Working")

## Gotchas

The most immediate problem I ran into was forgetting that Unix file names
are case sensitive so my script kept failing when the content of the .yml file
didn't match what was on disk.

## Next

The next step is to work out how to run xUnit from this environment so I
can complete the full flow and call it a genuine CI solution.
