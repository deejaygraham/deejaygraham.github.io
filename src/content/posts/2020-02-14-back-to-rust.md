---
layout: post
title: Getting Back to Rust
published: true
categories: [code]
thumbnail: "/img/thumbnails/rust-420x255.webp"
alttext: rust
---

Our weekly lunchtime coding dojo is starting back up again and this time our junior engineers wanted to try a new language. We 
decided on <a href="https://www.rust-lang.org/">rust</a> and used <a href="https://cyber-dojo.org/">cyber-dojo</a> to kick off 
with a *let's see if we can get anthing working* session using FizzBuzz test-first as our objective. 

Lots of the original floundering was helped by the wonderful documentation and the diagnostics emitted by the compiler. Chief 
among the confusions was re-aquainting ourselves with the memory management model and the idea of ownership. Coming from a managed 
language like C#, the distinction between string literals and String objects was initially confusing but the diagnostics really 
did help with their suggestions on what we should be doing. 

We also liked the declarations for parameters and return types for functions which are very like the Elm model or the way that UML 
handles documentation of types - value : type.

Here's the less than elegant but working function followed by the tests we used to drive it. 

```rust

{ % include code/rust/fizzbuzz.rs %}

```
