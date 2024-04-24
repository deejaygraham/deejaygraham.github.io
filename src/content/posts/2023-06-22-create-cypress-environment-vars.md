---
permalink: 2023/06/22/create-cypress-environment-vars/
layout: post
title: Create Environment Variables in Cypress
published: true
tags: [cypress, javascript, code]
thumbnail: "/img/thumbnails/cypress-420x255.png"
alttext: cypress
---

[Cypress](https://cypress.io) allows for greater flexibility in your tests by supporting environment variables to be accessed from a test
file but it's not super clear how to import settings from an external source into Cypress and have them available to your tests.

### Command Line

Cypress does support adding environment variables from the command line:

{% endhighlight %}

npx cypress run --env deployment=QA
npx cypress run --env deployment=PRODUCTION

{% endhighlight %}

Which turns up in the test like this:

{% highlight "javascript" %}

const deployment = Cypress.env("deployment");

{% endhighlight %}

### Configuration

A less well known way of adding environment variables is from within the cypress.config.js file and the {% endhighlight %}setupNodEvents{% endhighlight %}
handler in the {% endhighlight %}e2e{% endhighlight %} block within {% endhighlight %}defineConfig{% endhighlight %}. As in the previous example, variables created this way are
available in the tests using the Cypress.env function.

Here I am reading values from a postman environment file (currently moving from Postman to Cypress for API testing) and
exposing the values within that file as environment variables.

#### cypress.Config.js

{% highlight "javascript" %}

const {
defineConfig
} = require("cypress");
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
e2e: {
setupNodeEvents(on, config) {

            // .. code to resolve the path to the env file...
            const data = fs.readFileSync(pathToFile, 'utf-8');
            const postmanConfig = JSON.parse(data);

            postmanConfig.values.forEach(x => {
                config.env[x.key] = x.value;
            });

            return config;
        },
    },

});

{% endhighlight %}
