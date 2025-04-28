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

```shell
npm install @badeball/cypress-cucumber-preprocessor
```

and something to match the build process you have in place, e.g.:

```shell
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
import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
  },
});
```

Here we expect the scenarios are going to be defined in .feature formatted text files. Running 

```shell
npm cypress run 
```

Should now attempt to load all of the .feature files, compile them and attempt to run them against 
anything it can find in the cypress test code that it can match against the given/when/then steps 
of the cucumber code. 

At this point, if you have pre-written cucumber scripts, you may have a lot of failing tests.

## Example

Let's walk through a simple example.

### cypress/e2e/features/duckduckgo.feature

```javascript

Feature: duckduckgo.com
  Scenario: visiting the frontpage
    When I visit duckduckgo.com
    Then I should see a search bar
```

One thing to be careful of is the way that step definitions and features are resolved. See the 
[documentation](https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/docs/step-definitions.md) for 
details which are not intuitive compared to some other frameworks.

### cypress/support/step_definitions/duckduckgo.cy.js

```javascript
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("I visit duckduckgo.com", () => {
  cy.visit("https://www.duckduckgo.com");
});

Then("I should see a search bar", () => {
  cy.get("input").should(
    "have.attr",
    "placeholder",
    "Search without being tracked"
  );
});
```
