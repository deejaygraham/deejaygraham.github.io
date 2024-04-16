---
permalink: 2013/10/10/team-definition-of-done/
layout: post
title: Team Definitions of Done
published: true 
categories: [ agile ]
hero: agile
---

Quoting from the [Scrum Guide](http://www.scrumguides.org/) :

> When the Product Backlog item or an Increment is described as "Done", everyone must
> understand what “Done” means. Although this varies significantly per Scrum Team, members
> must have a shared understanding of what it means for work to be complete, to ensure
> transparency. This is the "Definition of Done" for the Scrum Team and is used to assess when
> work is complete on the product Increment.

A team's shared definition of done is one of the most overlooked aspects of scrum. It's important 
that the whole team agree on a set of criteria that they will work to. It should be a living 
document that can be reviewed and modified during scrum's "inspect and adapt" cycles. Usually 
a team new to scrum will create a basic definition and add to it as they mature.
 
Here's an example that I often use as a starting point for discussion:

* All production code must have unit tests that pass.
* All production code should be written by a pair (or)
* All production code must reviewed by another developer.
* All production code must be checked into source control.
* Documentation is written for the feature.
* CI build passes.
* Application is deployed from build server not local builds
* Application deploys without errors.
* System tests pass.
* Product owner sign off.