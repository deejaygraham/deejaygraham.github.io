---
permalink: 2014/05/27/orderbydescending.html
layout: post
title: OrderByDescending
published: true
categories: [ csharp, code, cloud ]
hero: cloud
---

Lately I've been working on some code that will delete a hierarchical list 
of files from Azure blob storage.

According to [msdn](http://msdn.microsoft.com/en-us/library/ee772840.aspx) 
deleting a container blob will cause contained blobs to fail while the delete 
is in progress. 

With this in mind, I didn't want to rely just on the order that the names were
returned to me from *CloudBlobClient.ListBlobs()*. I needed to get the list of 
files in order of longest path first to be sure that content is deleted before the
container.  

As usual, if your goto is Linq for this kind of algorithm, the code is pretty 
minimal. The example code below has more in the setup than the code needed to 
do the job.

```csharp

{% include 'code/csharp/OrderByDescendingExample.cs' %}

```

Note, blobs in Azure storage terms are represented as discrete urls, there is no 
concept of deleting a folder and that delete cascading to all files it contains.
Each delete needs to be made against a single url.
