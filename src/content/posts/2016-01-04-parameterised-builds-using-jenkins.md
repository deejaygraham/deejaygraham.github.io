---
title: Parameterised Builds using Jenkins
tags: [powershell]
hero: power
thumbnail: "/img/thumbnails/parcel-420x255.webp"

---

My experiments with CI using [Jenkins](https://jenkins-ci.org/) continue.

Latest in the list of requirements is being able to specify parameters to the build
so that we don't need to modify the configuration of a build and save it each time
a deployment is done of a new version (with a new drop folder).

Adding parameters to a build configuration is really easy. First, open the
configuration page for your build. Check the "Build is Parameterised" box.

![checkbox](/img/posts/parameterised-builds-using-jenkins/build-is-parameterised.webp)

You can then fill in variables - the name, a default value and a description. The
variable name is the name of the environment variable that will be created, the
default value is, as you would expect, the default value you are prompted with the
next time you select build (which is now changed to Build with Parameters) and the
description gives a hint when the build parameters dialog is shown.

![string](/img/posts/parameterised-builds-using-jenkins/string-parameter.webp)

So that turns the horrible, hard-coded script in the Windows Powershell step into a
set of parameters read from environment variables:

![script](/img/posts/parameterised-builds-using-jenkins/build-with-parameters.webp)

And the build command itself now has a set of variables, with defaults, ready for
you to fill in.

![build](/img/posts/parameterised-builds-using-jenkins/build-parameter.webp)
