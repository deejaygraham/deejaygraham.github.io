---
title: Logging from MsBuild's Commandline
tags: [msbuild]
---

There's a fair bit of flexibility built into msbuild's logging that goes under
appreciated.

Normally you would run something like this command from the console:

```sh
msbuild MyBuild.proj
```

which outputs all kinds of text to the console. If you want to see any errors
it's a bit of a faff to find them by scrolling back through hundreds of lines
of text. You _could_ redirect everything to a file:

```sh
msbuild MyBuild.proj > log.txt
```

but that kills all output until the build completes and still leaves you with a huge
file to grep through.

##Basic logging

The same kind of output can be achieved using the /fileLogger (/fl) switch to create a
file named msbuild.log in the current directory.

```sh
msbuild MyBuild.proj /fl
```

##flp to the rescue!

If you care what file is called you can change it by pairing /fl with a /fileLogger (/flp):

```sh
msbuild MyBuild.proj /fl /flp:logfile=MyBuildOutput.log
```

##Verbosity logs

```sh
msbuild MyBuild.proj /fl /flp:verbosity=diagnostic
```

This leaves the normal console output at the default level but logs all the
detail to the log.

##Error only logs

One option that's often useful when debugging build errors is
the ability to split the log into multiple outputs based on logging level.

So, to create a log of just errors we can use:

```sh
msbuild MyBuild.proj /fl /flp:errorsonly
```

This creates an msbuild.log file containing just the build errors.

##Errors and Warnings

Similarly, you can pipe errors to one file and warnings to another:

```sh
msbuild MyBuild.proj
/fl
/fl1 /flp1:logfile=BuildErrors.log;errorsonly
/fl2 /flp2:logfile=BuildWarnings.log;warningsonly
```

##Multiple files

As you might have guessed from the last example, MsBuild supports pairing
of numbered /fl and /flp switches, starting at /fl1 /flp1
up to /fl9 /flp9 allowing you to mix and match combinations to support whatever
logging you need.

