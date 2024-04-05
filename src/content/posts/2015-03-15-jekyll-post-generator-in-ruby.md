---
layout: post
title: Jekyll Post Generator in Ruby
published: true 
categories: [ ruby, meta, csharp, code ]
---

A while ago, I blogged a quick console application to create a blog post outline, 
given a set of command line options. That was in C# and has been working fine for 
quite a while. But since the underlying technology stack that this blog is built 
on is jekyll and ruby, I thought it might be a good learning exercise for me to 
(loosely) port it to ruby.

As code goes, I don't consider it my best work but it helped me explore command 
line parsing, file and folder manipulation and content generation, all things I'm 
very comfortable with in the .Net space but had no clue previously in ruby. 

```ruby

{ % include code/ruby/post.rb %}

```

## File System

The main part of the code that I thought would give me most trouble turned out to 
be the easiest. The file system API seemed familiar enough from .Net to let me 
get something working very quickly. Once that was done, I spent a bit more time 
tidying it up and trying to make it a bit more idiomatic and I found the File.open 
closure a very nice feature.

## Command Line Options

Running the tool with no arguments, prompts with the available options:

![no options](/img/posts/jekyll-post-generator-in-ruby/no-options.webp "no options")

and here's a typical use:

``` 
ruby post.rb "Jekyll Post Generator in Ruby" -t "jekyll, ruby, meta, snippets"
```

The options code follows a similar pattern to .Net libraries like NDesk but adding 
options and sensible defaults ended up taking more code than the main work of 
the script.



## Ruby vs .Net 
 
Allowing for differences in the number of options available it appears that 
the ruby and the .Net versions are not too far away from one another in terms 
of lines of code. 

Maybe there is a "ruby" way to approach this problem that would have reduced 
the line count and have increased readability (and it certainly doesn't satisfy
[Sandy Metz](http://www.sandimetz.com/)'s [squint test](https://www.youtube.com/watch?v=8bZh5LMaSmE) ). 

Having said that, I think I got a lot of value from the exercise and it's probably 
best that I quit while I'm ahead :)
