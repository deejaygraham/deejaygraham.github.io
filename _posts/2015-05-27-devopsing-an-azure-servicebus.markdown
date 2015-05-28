---
layout: post
title: DevOpsing an Azure ServiceBus
published: true 
tags: [ azure, cloud, powershell ]
---

I was debating with a couple of DevOps people some approaches to monitoring an Azure Service 
Bus message queue for "stuck" content. It needed to be a solution that would fit 
in with the existing monitoring ecosystem and be able to talk to the Azure infrastructure
directly. A custom Powershell Cmdlet seemed to fit on both counts. 

After the discussion, I got to work on a little 
[PowerShell Cmdlet](https://github.com/deejaygraham/AzurePowershellDevOps/blob/master/src/AzureServiceBusCmdlets/GetAzureServiceBusQueueCommand.cs) 
to connect to a number of Service Bus namespaces and report on active and dead letter message counts.

It's a fairly simple piece of code, using <code>Microsoft.ServiceBus.NamespaceManager</code> to query 
individual queues (or all available queues) and output <code>Microsoft.ServiceBus.Messaging.QueueDescription</code> objects.

The control and flexibility of PowerShell wrapped around this little utility makes for a nice reusable tool with very 
little effort. I must investigate further in the coming weeks. 

The new repo is [here on github](https://github.com/deejaygraham/AzurePowershellDevOps).



