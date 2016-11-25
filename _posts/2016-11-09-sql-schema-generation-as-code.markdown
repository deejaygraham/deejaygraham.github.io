---
layout: post
title: SQL Schema Generation as Code
published: true
tags: [ cloud, powershell  ]
hero: power
---

While I was generating test data from a SQL database in the last post, I returned to another
irritating part of SQL Server's "Generate and Publish Scripts" wizard. Running the wizard is
difficult if there are lots of advanced settings that you don't want to leave at their default
e.g. for deploying to SQL Azure. The interface is a long list of true/false settings and it's
always a pain to make sure that you haven't accidentally missed a setting or changed a value
you shouldn't have.

Plus the bug in a lot of versions of SQL server that means that the order that the tables are
scripted in is entirely random so that seeing changes between one version and the other is
all but impossible.  

What we'd really like is a repeatable, source-controllable means of creating a database schema...? Almost
as if I had written it myself - here's a script I wrote myself to do just that.

This PowerShell script takes an existing database and generates the SQL statements
required to generate the database schema from scratch, in alphabetical (so mostly diff-able), repeatable order.

<script src="https://gist.github.com/deejaygraham/283065a57521f639ced0cd4741a3a459.js"></script>
