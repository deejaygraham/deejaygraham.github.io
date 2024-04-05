---
layout: post
title: Testing Azure ServiceBus Queues
published: true 
categories: [ cloud, csharp ]
hero: cloud
---

Here's a quick example of using Microsoft Azure's ServiceBus message queue to decouple 
communication between two applications.

In this case it's two console applications for ease of demonstration although you would 
never (I hope) use cloud infrastructure for on-premise communication.

## In the Write Corner...

...an application that connects to the message bus using 
<code>Microsoft.ServiceBus.Messaging.MessagingFactory.CreateFromConnectionString</code> 
and sends <code>Microsoft.ServiceBus.Messaging.BrokeredMessage</code>s using the 
<code>Microsoft.ServiceBus.Messaging.MessageSender</code> class.  

### Writer

```csharp

{ % include code/csharp/AzureServiceBusWriter.cs %}

```

![writer](/img/posts/testing-azure-servicebus-queues/writer.webp "writer")

## In the Read Corner...

...an application that reads from the message bus using the <code>Microsoft.ServiceBus.Messaging.MessageReceiver</code> 
class.


### Reader 

```csharp

{ % include code/csharp/AzureServiceBusReader.cs %}

```

![reader 1](/img/posts/testing-azure-servicebus-queues/reader-1.webp "reader 1")

## Totally, like, random

In both applications I have introduced a bit of randomness in sending and receiving to 
demonstrate that you can run more than instance of the reader application and each instance 
should pick up and process their own share of messages without interfering with each other.

![reader 2](/img/posts/testing-azure-servicebus-queues/reader-2.webp "reader 2")

This sample also demonstrates the use of the <code>Defer</code> method to allow an instance to 
claim a message to work on, complete some process then come back to the message, retrieve it 
from the queue and mark it as complete.
