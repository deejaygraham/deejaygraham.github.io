---
permalink: 2014/06/27/starting-c#-development-on-raspberry-pi/
layout: post
title: Starting C# Development on Raspberry Pi
published: true
tags: [ csharp, raspberry-pi, mono ]
---

Youngest child and I have been playing around with the Raspberry Pi using 
[Kano](http://www.kano.me/) and [Raspbian](http://www.raspbian.org/) images.

Most of the programming exercises I have seen involve using Python and Pygame 
so I wondered how much it would take to get a simple C# application running. 
How hard could it be?


First we need mono installed on the Pi. Open a terminal and execute:

	sudo apt-get update
	sudo apt-get install mono-complete
	
or, if you intend to build on another machine:

	sudo apt-get install mono-runtime

Next we need some source code to compile into an application:

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

Some configuration around this in the form of an MsBuild/XBuild script would 
be nice.

This needs to be built with xbuild using:

	xbuild PiTest.proj 
	
or simply

	gmcs PiTest.cs

Once we have an executable we can try it out:

	sudo mono PiTest.exe
	


