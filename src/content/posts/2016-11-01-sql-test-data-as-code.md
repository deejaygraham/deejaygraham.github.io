---
permalink: 2016/11/01/sql-test-data-as-code.html
layout: post
title: SQL Test Data as Code
published: true
categories: [ powershell  ]
hero: power
thumbnail: "/img/thumbnails/parcel-420x255.webp"
alttext: powershell
---

I'm a big fan of driving manual, error-prone setup steps for anything into scripts and
automated tests.


### Binary Test Data

For a while we have been relying on test data stored in a SQL server database. Running a
suite of tests requires that the database is in a known state before the tests run and that
implies restoring the database from a known image. SQL server backups are, often of necessity,
in an opaque binary format, e.g. bcp files or .bak or .bacpac files.

These are not good formats to be able to store in version control or see history and track differences. So
databases tend to be stored on network drives and drift out of a known good state over time as people
add new test cases and data and forget to merge back into the original, "golden" copy of the data. Repeatability
of tests become a problem when the data can't easily be inspected for changes across lots of tables.

Add in branch-based development and you quickly have more problems where data represents a munging of schema changes
across branches for a single source of data, or else merging between branches is impossible because of the data format.

Also, running tests that mutate the data implies a golden master version of the data *and* a working copy, taken
from the master, which the tests run against.


### Slightly Better?

I came up with a slightly better approach to this by swapping the binary backup format for a text-based format. Creating the
database from scratch each time by running a set of insert statements would give you a repeatable,
known working version of the database. It would also let you run "diff" tools to see differences between versions,
add the file(s) to source control and be able to work in branches since the diffing becomes at least possible.

The PowerShell script below takes an existing database and generates the insert statements
required to generate the data from scratch.

<script src="https://gist.github.com/deejaygraham/aa43d0f560c5ed06d734b5d3d38a4726.js"></script>


### Processes

The process during development is something like:

* Run the script to create populate test data in a clean database
* Write tests and iterate on data
* Clean up unused data from the tests
* Check out the generated script
* Run the PowerShell script to re-generate SQL
* Check in the script

The process running the tests in CI or regression tests becomes:

* Get latest script
* Run the script to create populate test data in a clean database
* Run the tests
* Delete the database


### Merges

One remaining issue is handling of more than one developer adding test data to the database at once.
As each developer is adding in new data they will be generating new primary keys and inserting
foreign keys into columns. These keys need to be preserved and kept consistent even if their actual
values are different between the original version and the checked-in version. Some care needs to be used
before checking in the merged SQL code to make sure that primary and foreign keys relationships are
preserved correctly and clashing keys do not accidentally create incorrect relations between
different tests.
