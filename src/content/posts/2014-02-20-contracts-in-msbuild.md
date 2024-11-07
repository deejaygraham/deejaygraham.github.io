---
permalink: 2014/02/20/contracts-in-msbuild/
layout: post
title: Programming by Contract in MsBuild
published: true
tags: [msbuild, code]
---

One of the great ways to prevent bugs creeping into your code during development
is to use contracts and assertions for what you _know_ is true or what
_should_ be true at particular points in your code. Using this technique allows
you to automatically catch the kinds of errors that are easy to cause (e.g. by
forgetting to set a required property correctly) and are often difficult to
track down.

Spending a while developing MsBuild scripts that are used by non-technical
team mates leaves open the possiblity that they may be misused or and fail to
build. The only clue to what has gone wrong can be a cryptic error message.

The _Error_ task in MsBuild can be used to allow a sort of programming by
contract if you make use of the Condition attribute.

For example, say the script relies on a file path existing and having the
value loaded into a specific property before a target uses it.

I can embed an Error task in the script to make sure the value has been defined:

```xml
    <Error
    	Text="The FooBar property has not been set."
    	Condition=" '$(FooBar)' == '' "
    	/>
```

and I can embed another Error task to make sure that wherever the value is pointing
actually exists:

```xml
    <Error
    	Text="The file $(FooBar) does not exist"
    	Condition=" !Exists($(FooBar)) "
    	/>
```

I have found using this approach over the last couple of months has saved
time tracking down silly bugs and made my scripts much more reliable.
