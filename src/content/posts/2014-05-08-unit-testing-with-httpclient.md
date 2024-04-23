---
permalink: 2014/05/08/unit-testing-with-httpclient/
layout: post
title: Unit Testing with HttpClient
published: true
tags: [ csharp, code, tdd ]
---

I've been moving some code away from depending on [RestSharp](https://github.com/restsharp/RestSharp) 
and moving to the new [System.Net.Http.HttpClient](http://msdn.microsoft.com/en-us/library/system.net.http.httpclient.aspx) 
in .Net 4.5 to improve security (and that's another story). One nice thing 
about RestSharp is that the RestClient, RestRequest and RestResponse objects 
are implementations of interfaces: IRestClient, IRestRequest and IRestResponse. 

This is good news for unit testing since it means that it makes it relatively 
easy to implement these as fakes or stubs in test code. The disadvantage 
is that implementing IRestClient from scratch smells somewhat wastefully 
verbose since a stub implementation runs to approximately 200 lines of C#. 

Moving to HttpClient I was initially concerned that I wouldn't be able to 
find a seam to exploit for unit testing. Then I noticed one of the constructors 
for HttpClient takes an *HttpMessageHandler* object, and delegates all 
actual network requests to it's *SendAsync* method.

This means that the only thing I need to be able to unit test HttpClient 
code is a fake implementation of HttpMessageHandler! 

The code below uses a fake implementation with a settable HttpResponseMessage property so 
that you can simulate different responses without needing anything on the 
other end of the wire.

{% highlight "csharp" %}

{% include 'code/csharp/HttpClientClientCode.cs' %}

{% endhighlight %}

{% highlight "csharp" %}

{% include 'code/csharp/FakeHttpMessageHandler.cs' %}

{% endhighlight %}

{% highlight "csharp" %}

{% include 'code/csharp/HttpClientTestCode.cs' %}

{% endhighlight %}

So that's 200 lines of code against 20. Win!
