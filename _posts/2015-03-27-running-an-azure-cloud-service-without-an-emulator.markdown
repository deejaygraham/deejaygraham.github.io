---
layout: post
title: Running an Azure Cloud Service without an Emulator
published: true 
tags: [ csharp, cloud ]
---

Running and debugging complex code in an Azure deployment environment frequently 
requires implies a long turn around time when running on the Azure fabric. Building,
packing, uploading and startup all take time. Running the code locally on 
an Azure compute emulator is a little better once you wait for the emulator to 
spin up. 

Often the experiment...build...run process doesn't really need to 
use an emulated environment and the grand old tradition of using a temporary 
console application to run a code snippet still applies. But for integration 
level issues, what if you want to replicate as far as possible the 
environment - database, REST service calls, configuration - that you see in 
Azure? 

## Blocking?
 
There are two blocking issues that can prevent you from using a standard console 
application to host your application.

* Your worker role derived from `Microsoft.WindowsAzure.ServiceRuntime.RoleEntryPoint`
* `RoleEnvironment` settings. 

## RoleEntryPoint 

The worker role is often not too much of a problem. It should always be akin to 
the code in a console program's Main method; as small as possible and really 
just plugging together blocks in the right configuration as pressing "go".

## RoleEnvironment 

The `RoleEnvironment` can require a little more work. It's a static class so 
it's reach into a codebase can be pervasive. We can help ourselves a little by 
hiding the static-ness behind an interface `IRoleSettings`, say, and passing that 
into constructors. 

When can then create an `AzureRoleSettings` implementation that delegates to 
`RoleEnvironment` for the deployed scenario. 

For unit testing, we can mock the interface or create a `StubRoleSettings` implementation
that uses a `Dictionary` to store name value pairs.

For integration testing or debugging subtle issues requiring real world values 
we would really like to be able to read the cscfg and pull out values for 
an individual role. Since we already have the `IRoleSettings` interface, we can 
implement an `IntegrationRoleEnviroment` class and use XPath to build our list of 
name value pairs.

The code for all these implementations is at [gist](https://gist.github.com/deejaygraham/7787aa578a33816c24e8) and 
embedded below:

<script src="https://gist.github.com/deejaygraham/7787aa578a33816c24e8.js"></script>

