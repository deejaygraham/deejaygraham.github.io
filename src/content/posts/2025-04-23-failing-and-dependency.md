---
title: Failing and Dependency
tags: [build, ci]
---

Building this personal blog, I have had a few problems with forgetting to include the correct link, making a mess of the 
markdown, pasting in the wrong link for an image. All of these things are fixable by a pipeline that validates, builds 
and tests the site after a commit. For a while, I have had a github workflow to get the markdown, build it with [11ty](http://11ty.dev)
then deploy it to github pages (where this blog lives). 

There are many ways I can break the blog. Writing a bad shortcode or plugin for 11ty so that the build doesn't render the pages correctly, 
mangle the markdown so that incorrect html, or worse, markdown is copied verbatim to the output, incorrect syntax highlight fencing, 
badly written (but mininal) javascript that runs when the site loads. All opportunities to make a mess.

To counteract or catch these errors, I added in some tooling to inspect the source of the site to spot some errors and automated tests 
to spot others once the site is deployed. These used to be in one giant workflow but recently I split them into separate workflows so 
that I could run just part of the whole process (e.g. the automated browser tests) if needed. 

## Dependencies Between Workflows

In github the workflows can be chained together using their names.

### Validate.yml

I have a validation workflow that takes the code and runs some checks on the source and the code used to build the site. Basic validation 
steps to make sure there are no obvious problems. 

```yaml

name: Validate

jobs:
  validate_code:
    runs-on: ubuntu-latest
      
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

  # other stuff here

```


### Build.yml

Once validation has passed, I wanted the build proper to run and to take the markdown files and generate html which can then be deployed.

```yaml
name: Deploy

on:
  workflow_run:
    workflows: ['Validate']
    types: [completed]
```

Putting the Validate workflow into the workflow_run part of the "on" event handler meant that once the validation step completed the build
step would pick up where it left off automatically. Similarly, the testing workflow depends on the 'Deploy' workflow and is launched 
when the deployment completes. All wonderful. 

## Failures 

One thing I noticed, after making and fixing an obvious error in the javascript one day, was that the validation step flagged the error 
but the build step still attempted to publish the site rather than noticing the failure and skipping since it doesn't make sense to 
deploy something we know is no good. 

It took a bit of digging but I eventually found a fix for this. We need to put in an "if" condition into the jobs section like this:

```yaml
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    {% raw %} if: ${{ github.event_name != 'workflow_run' || github.event.workflow_run.conclusion == 'success' }} {% endraw %}
      
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
```

Magically this means that the job is still triggered by the dependency but the job is skipped if the previous workflow failed and, also 
importantly, if the workflow is triggered manually it still runs and completes. 
