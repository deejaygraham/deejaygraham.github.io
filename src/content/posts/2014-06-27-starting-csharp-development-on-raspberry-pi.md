---
title: Starting C# Development on Raspberry Pi
tags: [csharp, raspberry-pi, mono]
---

Youngest child and I have been playing around with the Raspberry Pi using
[Kano](http://www.kano.me/) and [Raspbian](http://www.raspbian.org/) images.

Most of the programming exercises I have seen involve using Python and Pygame
so I wondered how much it would take to get a simple C# application running.
How hard could it be?

First we need mono installed on the Pi. Open a terminal and execute:

```console
sudo apt-get update
sudo apt-get install mono-complete
```

or, if you intend to build on another machine:

```console
sudo apt-get install mono-runtime
```

Next we need some source code to compile into an application:

```csharp
using System;

namespace MonoPiTest
{
    class Program
    {

        static void Main(string[] args)
        {
            Console.WriteLine("Hello, {0}", Environment.OSVersion);

            Console.ReadKey();
        }
    }
}
```

Some configuration around this in the form of an MsBuild/XBuild script would
be nice.

This needs to be built with xbuild using:

```console
xbuild PiTest.proj
```

or simply

```console
gmcs PiTest.cs
```

Once we have an executable we can try it out:

```sh
sudo mono PiTest.exe
```
