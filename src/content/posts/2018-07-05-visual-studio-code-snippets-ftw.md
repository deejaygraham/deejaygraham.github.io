---
layout: post
title: Visual Studio Code Snippets FTW
categories: [ code ]
published: true
---

I think I had mostly forgotten about lots of little features in Visual Studio, like code snippets. Today I was updating some unit tests from NUnit 2.X to 
the most recent version of <a href="http://nunit.org/documentation/" alt="nunit homepage">NUnit</a> because there are <a href="https://github.com/nunit/docs/wiki/Breaking-Changes" >quite a few breaking 
changes</a>. For example the ExpectedException attribute is no longer supported and has been replaced with an Assert. I think this is a positive 
change for the code but it meant that a lot of code needed to be migrated from one form to the other, from an attribute above the method to a code 
change within it. 

The original code was like this:

```csharp

{% include 'code/csharp/ExpectedExceptionTest.cs' %}

```

and it needed to look like this:

```csharp

{% include 'code/csharp/AssertThatExceptionTest.cs' %}

```

Not a big change, but not something that can be done as a search and replace which would have been nice given the spread of the original code throughout 
our existing tests. The code for each test needs to be inspected to see where the exception is expected and code above and below sometimes needs to be 
cleaned up or removed. This was fiddly enough that I found I created a template in notepad so that I could switch between that and the code to cut and paste 
into each method. Part way through it occurred to me that we should really have a refactoring for this and remembered that a few years ago, at a different 
job, I had used code snippets and templates to do some of this kind of automation. Rather than finding something in the refactoring section of Visual Studio's 
**Edit** menu, under **Intellisense** (or from a right-click context menu) there is **Insert Snippet... (Ctrl+K, X)** and **Surround With... (Ctrl+K, S)**.

The surround with option gives you some options you might expect #if, do, while, if etc., the very things you think about in code that wrap around 
something else. 

![surround](/img/posts/visual-studio-code-snippets-ftw/surround-with-before.webp)

Unfortunately, there wasn't one for what I wanted. Hmmm. Knowing Visual Studio, I thought there was probably a mechanism to extend those and I was right. Under 
**Tools\Code Snippets Manager** there are a series of code snippets for each language. 

![surround](/img/posts/visual-studio-code-snippets-ftw/code-snippets-manager.webp)

I used one of these built-in snippets as a template to create my own NUnit surround. I called it 

```xml

{% include 'code/csharp/NUnitAssertThrowsSnippet.xml' %}

```

You can save it to the same folder as Visual Studio's (under program files) or put it under My Code Snippets (under My Documents).

Once it's installed and VS has restarted, the Surround With menu includes the new snippet:

![surround](/img/posts/visual-studio-code-snippets-ftw/surround-with-after.webp)

The whole thing took me 20 minutes at most and meant I was able to complete the refactor work in about 1/10 of the time I was expecting it to take. Visual 
Studio code snippets FTW! I will be definitely exploring what else we can do with these snippets and maybe look at refactoring snippets too.


