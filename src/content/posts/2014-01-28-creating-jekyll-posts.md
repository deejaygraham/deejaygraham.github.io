---
permalink: 2014/01/28/creating-jekyll-posts/
layout: post
title: Creating Jekyll Posts
published: true
tags: [meta, csharp, code]
---

Being a good programmer, [I am told](http://c2.com/cgi/wiki?LazinessImpatienceHubris),
is all about being lazy. So, I got bored with creating posts by hand and
wrote a little console application to do it for me.

It accepts up to 3 arguments, the post title, a date in [ISO 8601](en.wikipedia.org/wiki/ISO_8601)
format (today's date is assumed), and a list of tags.

Many of the refinements are based on my own setup, so if it's run from the
main jekyll folder, with a \_posts subfolder, the post will be created there.

{% highlight "csharp" %}

{% include 'code/csharp/Jekyll_GeneratePost.cs' %}

{% endhighlight %}

One important feature to note is jekyll _really, really_ doesn't like [Unicode with BOM](en.wikipedia.org/wiki/Byte_order_mark), so
you have to be careful to explicitly create a UTF8Encoding object (with BOM turned off)
when writing out the file content (see line 42).
