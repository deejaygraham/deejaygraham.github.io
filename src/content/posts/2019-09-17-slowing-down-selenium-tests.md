---
permalink: 2019/09/17/slowing-down-selenium-tests.html
layout: post
title: Slowing Down Test Execution in Selenium
published: true
categories: [ csharp, code, tdd ]
thumbnail: img/posts/slowing-down-selenium-tests/thumbnail-420x255.webp
alttext: slowing down selenium
---

Running automated tests against a web application using Selenium you can sometimes hide issues both in the application itself and 
in your implementation of the automation if you always rely on the browser and the web driver running at their peak performance on 
the test machine. 

The chrome browser has a nice feature built into it so that it can simulate different network speeds. You can, for instance, go from a 
spiffy wifi throughput to a 2g experience to simulate a web page loading on a mobile with a bad signal. 

This feature is also available from the automation side of things when you are using the chrome webdriver.

## Code 

I setup a class to take a text description of the network quality, perhaps from a config file, and convert it to a set of network characteristics 
matching that network behaviour - network latency, download and upload speed. 


Throttling.cs
```csharp

{% include 'code/csharp/Selenium_Throttling.cs' %}

```

As part of the instantiation of the web driver we can inspect the throttling characteristics we have just built and apply them to the 
chrome driver via the NetworkConditions property. 

WebDriverFactory.cs
```csharp

{% include 'code/csharp/Selenium_UseThrottling.cs' %}

```

The differences in performance of the browser can be quite marked when going below anything but "wifi", mostly because in a desktop environment we are 
mostly used to the luxury of super fast internet. Some pages can be super annoying to wait for them to finish but it is a good thing to be brought back 
to how some of our customers must experiencce our applications in the wild. 

Be prepared also for what breaks in the automation scripts where a thread sleeping for a number of seconds is suddenly no longer adequate and a better solution, 
perhaps waiting on a piece of data in the page to appear, beomes necessary. These kinds of sleeps injected (seemingly at random) into the automation code 
seem fine at the time but are nearly always a bad idea because of how much flakiness they create in the automation while simultaneously giving the opposite impression 
while everything is working at top speed. 

A more robust method of determining a page is in the right state before progressing is always better and pays off more in the long run when we want this kind of automation 
to be as reliable as possible so that it "just runs" and if we find a failure we can be assured that there is a legitimate breakage or regression in the application rather 
than a hit-and-miss automation problem with a slightly slow connection. 
