---
permalink: 2019/11/07/lazy-creating-of-expensive-objects/

title: Lazy Creating Expensive Objects

tags: [csharp, code, tdd]
thumbnail: /img/posts/lazy-creating-of-expensive-objects/expensive-object-420x255.webp
alttext: expensive
---

Some objects in .net are expensive to create (because of time taken or setup they do internally) so that
Microsoft recommend creating single instances and using them for the "life" of a program rather than
continually creating and destroying them as needed throughout the program as we might with strings or
DateTimes or other, what we think of as "disposable", objects.

If the class hosting and using the expensive object needs to hold onto a single instance of the expensive object,
often the solution is to create a static constructor for the host class and initialise it there.

This can be a problem for unit testing. Because of the way that static constructors fire for the first piece of
code we touch so we don't get a chance to setup proxies or mocks or shims. Anything we do that would allow us to
setup a test scenario is ruined by the static constructor barging in to try to create the "real" object in
memory and possibly reach out to the filesystem, a database or the network. In a test environment that will usually
mean that the constructor will fail.

A better way to approach it is to follow the example of .net source itself and lazy create the object we want using a
factory pattern. In Azure, for instance, the CloudBlobClient is one such expensive object that we would like to only
create once the first time it's needed.

```csharp

{% include 'code/csharp/CloudBlobClientFactory.cs' %}

```

When we need to use it, we do it like this. Instantiation first time, if it does not already exist, and use together
in one line.

```csharp

{% include 'code/csharp/CloudBlobClientFactoryUse.cs' %}

```
