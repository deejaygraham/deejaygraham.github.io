---
layout: post
title: OrderByDescending
published: true
tags: [ csharp, snippets, ms-azure ]
---

Working on some code with Azure blob storage, I needed to get the list of 
all files in a container and delete them in order of longest path first. 

As usual, if your goto is Linq for this kind of algorithm, the code is pretty 
minimal. The example code below has more in the setup than the code needed to 
do the job.

<script src="https://gist.github.com/deejaygraham/a9108421a35b82000657.js"></script>

Note, blobs in Azure storage terms are represented as discrete urls, there is no 
concept of deleting a folder and that delete cascading to all files it contains.
Each delete needs to be made against a single url.


