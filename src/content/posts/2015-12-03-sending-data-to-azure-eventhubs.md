---
permalink: 2015/12/03/sending-data-to-azure-eventhubs/
layout: post
title: Sending data to Azure EventHubs
published: true
tags: [cloud]
hero: cloud
---

I've been doing some experimenting with [Azure EventHubs](https://azure.microsoft.com/en-gb/services/event-hubs/) recently.

Event Hubs are a new way of logging events to temporary(ish) storage so that they can be consumed by other Azure
services, like [Stream Analytics](https://azure.microsoft.com/en-gb/services/stream-analytics/). The main positive for me is
it has much better performance characteristics than table storage.

Here's a snippet to illustrate sending a piece of data to an event hub.

{% highlight "csharp" %}

{% include 'code/csharp/SendToEventHub.cs' %}

{% endhighlight %}
