---
layout: post
title: Hacking a Running Azure Instance
published: true 
tags: [ cloud ]
hero: cloud
---

By which I mean, temporarily modifying your application on a live instance, rather than 
going through the build-update-deploy cycle in the portal.

![cloud service](/img/posts/hacking-a-running-azure-instance/cloud-service.png "cloud service icon")

## Warning 

This is a technique you can use to make **temporary**, experimental/debug changes to an instance, 
say by copying a new version of a dependent assembly, rather than a permanent change to the 
deployment. If Azure takes on the idea that the instance needs to be repaved you will lose all 
of your changes. Any changes you make to fix a bug **must** go through the standard package 
and deployment cycle to have any lasting affect.

![cloud service](/img/posts/hacking-a-running-azure-instance/cloud-service-instances.png "portal instances header")

## Steps 1..N 

* Log into the Azure portal with your usual credentials
* Select the Cloud Service and instance
* Connect to start an RDP session
* Copy your debug assembly onto the local machine (somewhere where you can get to it again quickly)
* Open TaskManager
* Find and end the WaHostBootstrapper task (Microsoft Windows Azure Runtime Bootstrapper)
* Wait for a couple of seconds for the Azure processes to terminate (you may get an access denied message if you don't wait)
* **Quickly** copy the new assembly over the old version (you may get an access denied message if haven't finished copying when the bootstrapper starts up)
* Wait for the Azure watchdog to notice the bootstrapper has stopped and restart it
* Run your tests

![task manager](/img/posts/hacking-a-running-azure-instance/task-manager.png "task manager screenshot")





