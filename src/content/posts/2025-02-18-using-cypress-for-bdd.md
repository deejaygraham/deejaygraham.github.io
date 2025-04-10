---
title: Using Cypress for BDD
tags: [cypress, javascript, code]
---

We've been using [bdd](https://dannorth.net/introducing-bdd/) for a while for some web automation projects but 
mainly using C# and SpecFlow to process the Feature/Scenario files into runnable NUnit tests. Given that I have also 
been using Playwright and [Cypress](https://cypress.io) for automation testing outside of bdd, it seems natural to bring 
those two worlds together and [run the bdd scripts](https://docs.cypress.io/app/faq#Can-I-use-Cucumber-to-write-tests), 
unchanged, as cypress automation scripts 

## Pre-processing

The main thing required for a bdd spect to run automatically is for the glue to exist between the text representation and the 
executable code. For cypress, this is the [Cypress Cucumber Pre-processor](https://github.com/badeball/cypress-cucumber-preprocessor).

### Command line

```
npm install @badeball/cypress-cucumber-preprocessor
```

and something to match the build process you have in place, e.g.:

```
npm install @bahmutov/cypress-esbuild-preprocessor
```

So the package.json should look something like this...

### package.json

```json
{
  "type": "module",
  "scripts": {
    "test": "npx cypress run"
  },
  "dependencies": {
    "@badeball/cypress-cucumber-preprocessor": "^22.0.1",
    "@bahmutov/cypress-esbuild-preprocessor": "^2.2.4",
    "cypress": "^14.3.0",
  }
}

```
With the preprocessor now installed, there is some configuration to do to adapt the cypress config to use it.
This is stolen directly from the github page for the preprocessor and seems to work fine. 

### cypress.config.js

```javascript

const { defineConfig } = require("cypress");
// new ...
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  return config;
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'application url here',

    specPattern: "**/*.feature",
    setupNodeEvents,
  },
});

```

Here we expect the scenarios are going to be defined in .feature formatted text files. Running 

```
npm cypress run 
```

Should now attempt to load all of the .feature files, compile them and attempt to run them against 
anything it can find in the cypress test code that it can match against the given/when/then steps 
of the cucumber code. 

At this point, if you have pre-written cucumber scripts, you may have a lot of failing tests.

## Example

Let's walk through a simple example.

#### google.feature

```javascript

Feature: Search
  Scenario: Looking for anything on the web
    Given I go to the google homepage
    When I type Cypress
    Then the cypress homepage should be included in the list of links

```

One thing to be careful of is the way that step definitions and features are resolved. See the 
[documentation](https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/docs/step-definitions.md) for 
details which are not intuitive compared to some other frameworks.

