---
layout: post
title: Windows Installers for the Lazy
published: true
categories: [ code ]
---

If you've ever installed any software for Windows using an installer wizard, 
you will no doubt have experienced the mild annoyance of filling in ticked boxes, 
typing text and clicking through interminable "next" buttons on the wizard. 

You could say that the value you get from the software is worth the effort of 
going through this if you have to install software very occasionally. If, like me, 
you sometimes have to install incremental versions of the same piece of software time 
and again you might start to wonder if there is a better way.

## Installer Modes

The most obvious way to do this is by running your installer from the command line and 
passing the /q option.

Msiexec can run with:

	/qn - Silent mode
	/qb - Basic UI
	/qr - Reduced mode
	/qf - Full UI mode (the default)

In the case of an msi 

	
	msiexec /qn myinstaller.msi
	
	
or in the case of a custom setup.exe 
	
	 
	setup.exe /qn 
	

This should install the software provided that the installer never needs admin 
permissions. If it does, you will often find the installer gets to the point 
where it needs extra permissions, the action fails and the install rolls back.

If the installer *does* need admin level priviledges, you can run in reduced mode 
and the installer will run through it's UI until it finds an option that hasn't 
been set. It will then calmly stop and wait for you to provide the value before 
carrying on.	

## Faking User Input 

Inside the msi package, each UI field on each page has a unique name which 
maps to a value that gets set when you type something into the field. If a default 
is supplied, the installer is happy. If there's no value it's up to you to supply it.

One way to supply it efficiently is to create a batch file with variables to 
represent each field and pass them in on the command line. Something like:

	
	@echo off

	SET OPTION_ON=1

	SET ACCOUNT_USERNAME="Me"
	SET ACCOUNT_PASSWORD="ThisIsNotMyPassword"

	setup.exe /qf /lv logfile.txt INSTALLOPTION=%OPTION_ON% USERNAME=%ACCOUNT_USERNAME% PASSWORD=%ACCOUNT_PASSWORD%  

Now all we need is to supply the correct values with something sensible.

## Orca!

So how do you find these magical values? Microsoft have thoughtfully provided a tool 
called Orca to let you peer inside an installer package and see almost everything about it.

We can use Orca to look at the *Properties* table to see what the values we need to set.
Here's an example of what Mono's Gendarme tool has in it's Property table:

<img src="/img/posts/windows-installers-for-the-lazy/orca.png" class="u-max-full-width" alt="orca" />

Ta-da! look up the names, fill the options in on the command line and the installer 
runs to full completion with no intervention from you!





