---
layout: post
title: Testing at Both Ends of the Triangle
published: true
categories: [code, javascript, presentations]
thumbnail: img/thumbnails/notebook-420x255.webp
alttext: talk
---

Here's a transcription of a talk that I am doing at Tech on the Tyne on the 30th of March.

I use [Slides Code Highlighter](https://romannurik.github.io/SlidesCodeHighlighter/) to 
take markdown code samples into keynote.


## Introduction 

Hi,

Thanks everyone for being here. 

Ask questions at any time.

## Who Likes Testing?

Who (by show of hands) are developers in the room? Unconnected, who likes testing?

All the developers should at least continue to keep their hands up. Thinking about the code your wrote today,
how much certainty do you have about it's correctness? How much is that something you are willing to bet on?

Now I've got the awful questions out of the way, welcome. Tonight I want to talk about being a developer and testing 
web stuff. Why we should be testing some things and not others, and how to use cypress to make some of your life much 
easier and give you some confidence that the code you are shipping is correct.


## Selenium 

I am not going to talk about Selenium, Playwright or other similar testing frameworks (and I have used some of them in the past) 
just because I have found cypress to cover most of what I need and do it very easily.


## Javascript

The other thing to note is that all the examples will be in Javascript, so if you don't know any javascript, you have approximately
10 minutes to learn some. 


## Early Web Times

I was not always a web developer. I started working with code at about the time I got my first modem and a work friend and I 
used to make plain html websites just for fun to explore what we could do. The majority of my time was spent in writing 
software for Windows or non-ui code. 


## Blog 

I've had a blog for a while which is only for me, but several people have linked to 
illustrations and stuff from there, so when I moved from one website technology to using github pages and ruby/Jekyll to build 
the site, I wanted to make sure that those links didn't break. 

## PowerShell 

At the time I was learning PowerShell so I wrote some tests in PowerShell to check that the links still worked and at an http level, 
I could request a page and get the content correctly. Trusting that if the page existed, the markup would be correct and the page 
ought to work. 

## Web 2.0

Fast forward quite a few years and I am currently in the middle of several web projects, a few of which did not have any tests 
apart from a little bit of inspection to make sure things looked "kind of ok". 


## React and Jest

The most important project is a large React application. We test customer facing application using c#, NUnit and Selenium. For 
unit testing we were doing Jest but just for plain old javascript functions, we didn't find much use for libraries like enzyme. They 
were able to simulate a browser but really just enough to generate markup. We discovered that lots of bugs were undetectable in 
enzyme but a human running them in a browser would spot them instantly. Not really a good experience. I'll come back to this later on.

## SDK 

I have another work responsibility for a set of customer facing documentation that had several small niggles visible on the surface 
and several huge problems in the markup underneath - think html pages exported from Microsoft Word with embedded styling on each 
line. This was a bigger challenge because we wanted to improve things, clean up the internals but leave the externals the same or 
better than before. This clearly needed some proper testing in place. 

I wrote the new version in 11ty and since I was already deeply involved in javascript, I decided to try extending that to using 
cypress. This was with the notion that it probably wouldn't be any better than anything else we have tried. 

## NE Bytes 

Finally, I run a .net developer meetup (NEBytes) and recently moved all the content from an super old fashioned wordpress 
installation to github pages, 11ty and bulma for css. Again a publicly facing website so I needed to make sure that we don't 
break stuff when we make changes. 

All this talk of testing and breaking things leads me on to...

## Test triangle

This is the testing triangle or testing pyramid, that may be familiar to many of you (lots of different versions of it). It's a metaphor for the types and proportions 
of tests we would expect in a project. It shows the degree of interconnectedness or integration running from zero at the bottom 
where we do microtests to the top where the application is tested from the outside.

Its shape is intended to show we will have a lot of very simple unit tests/microtests at the base, giving us 
wide coverage, slightly fewer integrated tests in the middle, and fewer still end to end application tests right at the top. 

We want to have a lot of tests which are quick to write, give us good feedback quickly, and are the lowest cost.
We want to have relatively few test which are slow, complex, and more costly. 

## Microtests

Tests at the bottom of the triangle give fast, precise feedback, are as isolated as possible and are there to guarantee that each 
thing works on it's own. 

Microtests are tests where we investigate and exercise behaviour of single functions, single classes or small groups of related classes 
where it makes sense to consider them as a group rather than introducing artificial barriers and seams. Importantly they stick to the 
Feathers definition of unit test, don't talk to any global variables, time, dates, databases, network, file system. 

## End to End

At the top, the tests take longer to write or change or debug, are more complex, slower, broader in scope and can fail for 
more reasons. These tests are there to make sure the application is wired together correctly.

So, has a web server spun up, connecting to a database with config files in place and all that. This takes a lot of deployment 
effort to do and is relatively more expensive than microtesting just because of all of the things that need to be in place. For 
example, needing a database implies that the data needs to be kept up to date, is refreshed and restored correctly etc. 

## Middle 

In my experience, where we end up in trouble is in this middle section. Integrated tests are the middle ground where the worst of all 
possible worlds exist. The integrated tests are the cursed places where we are testing that larger chunks of the application play nicely 
together. Here we find places where the database is faked but an API is real, or a database is real but an API is faked.
There's not enough context of the full application but too much knowledge about the 
interals of the application and require more dependencies than unit tests, take longer to run than unit tests and are more 
prone to breakage caused by design changes in one part of the application having a knock on effect on another part. These changes 
may be entirely invisible to the outside of the application. So not guaranteeing the whole system works but requiring almost as much maintenance as 
those tests. For a longer rant about this, I recommend Joe Rainsberger's talk "Integration tests are a scam"


## My Triangle

First problem I see is that we don;t want to enforce the number of each kind of test, it depends on our application and the exact circumstances. 
Of course we don't want to limit ourselves to say 100 unit tests and 5 ui tests just so we maintain a fictional ratio or a set number of each kind of test.
So it's a guideline, not an overall test strategy. 

Over many projects and many opportunities to try this over and over again, I have my own version of this triangle.
I have two kinds of tests, 1 dev focused, fast, targetting specific qualities of the code so that we have huge confidence in it. The kinds of tests you want to 
run each time you commit your code to source control.

Second, tests that indicate how releaseable the product is. Does it hang together? Is it of sufficient quality. BDD and acceptance kinds of tests are
 good candidates here. I've done this with Selenium but not yet gone that far with cypress (not felt the need).

I hope it's now clear why my talk is now testing at both ends of the triangle (but not the middle).

## Web Testing 

Specifically I want to talk about web testing in this session, so I want to talk about using my favourite web testing tool 
cypress. 

-------------

## Cypress 

I found about cypress quite a while ago, but originally I was using cypress purely to do end to end kinds of tests. It's 
really good at that but the thing that got me evangelising at work about it was in v10 when component testing came into beta.
First we'll talk about the cypress in general, then see some examples of end to end to give you a flavour of what that looks 
like, then we will do some component testing and look at some of the subtleties there. 


## Good

Some features of cypress (as compared to Selenium) that are really nice and make my job easier

* Runs "inside" the browser
* Automatic Waiting 
* Debugging 
* Snapshots make time travel possible
* Spies and Stubbing
* Control Network Traffic
* Screenshots and Videos
* Hot reload
* Retries

One of the biggest advantages for me is that cypress runs in the browser so it 
understands network requests and page loading and will wait for these to finish before 
continuing. Something you need to explicitly cater for in Selenium.

## Bad

* Runs inside the browser so doesn't support multiple tabs
* New-ish, not as established like Selenium
* Javascript only, no other language bindings
* No support for Safari
* iFrames are limited


## Documetation

https://docs.cypress.io is really good, they have good tutorials and lots of good guidance 
as well as good individual docs for each function.


## Installing - TODO !!!!

Assume you have an node application. If not, npm init and answer questions or accept defaults. 

npm install cypress

npx cypress open 

Has two modes of running, interactive and command line

npx cypress run will run tests on command line like a jest test
npx cypress open opens interactive app 


## Test Naming

Cypress builds on top of this by using commands prefixed with cy. Also by convention, 
Jest runs tests that end with .test.js, Cypress runs it's tests from files that end with .cy.js


## RSpec

Before we run our first test, let's just talk about the format of the tests. The format 
will be familiar to anyone using mocha or chai in the js world or anyone using PowerShell Pester,
Ruby RSpec etc. 

```js
describe('The thing I am testing', () => { 
    it('should do this', () => {
        expect(1 + 1).toBe(2); 
    });

    it('ought not to do that', () => {
        expect('red').toBe('green');
    });
});
```

## First Test

```js

describe('Google', () => {
    it('Knows about Tech on the Tyne', () => {
  
        cy.viewport(1280, 720);
        cy.intercept('https://www.google.com/search*').as('google');

        cy.visit('https://www.google.com/');
  
        // find reject all button...
        cy.get('#W0wltc').click();

        cy.get('input[name="q"]')
            .type('Tech on the Tyne');
  
        cy.get('form').submit();

        cy.wait('@google');
    });
  });

```

Let's talk about what's going on here because there's a lot.

* visit
* get
* type
* submit
* intercept and wait
* viewport


## Arrange

Make some action, visit a site, or load a component (later),
setup viewport, setup interception etc. 

```js 
    cy.visit('/stuff');
```

## Act 

Find by text content on a page


```js

    cy.contains('Google');
    cy.contains('google', { matchCase: false });

```

Find by css selector: id or by class

```js

    cy.get('#password');

```

Find by XPath

```js

    cy.get('input[type=submit]');

```

Will throw if it can't find the password


## Actions 

We can chain commands together

```js

    cy.get('#password')
        .type('random password');

```

## Assertions 

```js

    cy.title().should('contain', 'Google is Awesome');
    cy.get('#password').should('not.contain', 'swordfish');

    cy.get('#password')
        .should('not.contain', 'passw0rd')
        .and('not.contain', 'swordfish'); 

    cy.get('#password')
        .type('random password')
        .should('have.value', 'random password');
```

## Common Assertions to Should

* be.visible
* have.attr
* have.value
* have.text
* not.exist


```js

cy.get('h1')
    .invoke('attr', 'class')
    .should('eq', 'title');

```

Find broken images 

```js

    cy.get('.article').within(($article) => {

    if ($article.find('img').length > 0) {
        cy.get('img').each(($img) => {
        cy.wrap($img).scrollIntoView().should('be.visible');

        expect($img[0].naturalWidth).to.be.greaterThan(0);
        expect($img[0].naturalHeight).to.be.greaterThan(0);
        });
    }
});

```

Assign items to variables and use just like normal js.

```js

    const block = cy.get('#doc-content')
      .find('div.notification.is-info.hint-box');

      block.should('be.visible');

      block.within(() => {
        cy.get('p.title').contains('Deploying Your Application');
          cy.get('p:last').contains('When you deploy your application you will not need to include any of the Sage assemblies.');
      });

```

```js

const anchor = cy.get('a');

            anchor.contains('Overview');
            anchor.should('have.attr', 'href', './DOC0004_Overview.html');
            anchor.should('have.attr', 'target', '_self');
            anchor.should('have.attr', 'title', 'Show overview');

            // example button is not active
            cy.get('span.is-static').contains('Example');

```

Before and After, beforeEach, afterEach 

```js

before(() => {
  cy.clearLocalStorage();
  cy.visit(examplePage);
});


```

Search within a page element.

```js

const screenshot = cy.get('figure.screenshot').first();
    screenshot.scrollIntoView();
    screenshot.should('be.visible');
    screenshot.within(() => {
      const img = cy.get('img');
      img.should('have.attr', 'src', '../img/ArchitectureDiagramOnPremise.png');
      img.should('have.attr', 'alt', 'object model');
      cy.get('figcaption').contains('Figure 1: Sage 200 On Premise Architecture');
    });

```

```js
describe('Weather', () => {
    beforeEach(() => {
        cy.visit('https://bbc.co.uk/weather');
      });

    // before(() => {
    //     cy.visit('weather');
    //   });

    it ('Has the correct title', () => {
        cy.title().should('contain', 'BBC Weather');
        cy.contains('UK Summary');
    });

    it('search can be refined by picking from a list', ()=> {
        cy.get('#ls-c-search__input-label').type('Newcastle');
        // how do we find this list?
    });

    it('Specific places give single results', ()=> {
        // chain together
        cy.get('#ls-c-search__input-label').type('Gosforth, Newcastle upon Tyne {enter}');
        cy.contains('Gosforth');
        cy.contains('rain');
        cy.contains('Observations');
        cy.contains('Humidity');
        cy.contains('Visibility');
        cy.contains('Pressure');

        // contains a regional weather video
        cy.get('.wr-c-video-forecast__video').scrollIntoView();
    });

});
```

## API requests 

We can validate API requests to our backend services if we need to get an auth token.

```js

    it('Gets Star Wars Characters', () => {
        cy.request({
          url: 'https://swapi.dev/api/people/1',
          method: 'GET'
        })
        .its('body')
        .should('deep.contain', {
          name: 'Anakin Skywalker'
        })
    })
```

## Intercept requests made by components

```js
cy.intercept('GET', 'https://swapi.dev/api/people/1', {
            statusCode: 200,
            body: {
              name: 'Peter Pan',
            },
          })
```

## Clipboard 

```js

    cy.window().then((win) => {
        win.navigator.clipboard.readText().then((text) => {
        expect(text).to.contain('Hello this was copied to the clipboard');
        });
    });

```


const { defineConfig } = require("cypress");

module.exports = defineConfig({
  contentFolder: "_site/html",

  e2e: {
    baseUrl: 'http://localhost:8080',
    screenshotOnRunFailure: false,
    trashAssetsBeforeRuns: false,
    video: false,
    setupNodeEvents(on, config) {
    // implement node event listeners here
    },
  },
});


## Components 

https://github.com/deejaygraham/calendar


```js

import Calendar from '../Calendar';

describe('My Calendar', () => {
  it('Defaults to today\'s date',
    () => {
      cy.mount( <Calendar /> 
  );
  cy.get('[data-component="content"]').should('have.length', 2)

  cy.get('#infoPanelTest');
    });
  });


cy.get("input")
            .click()
            .type('All', { delay: 250 })
            .type('{downArrow}', { delay: 250 })
            .type('{downArrow}', { delay: 250 })
            .type('{enter}');

        cy.get("input").should('have.value', 'Not Allowed');

        cy.get("input").click().type('Not', { delay: 250 });

        cy.get('[type="radio"]').should('not.be.checked');

         cy.get('input').should('be.disabled');
         cy.get('input').should('have.attr', 'readonly', 'readonly');
```

```js

it('Will call onClick function if no "canClick" prop is provided', () => {
    const onClick = cy.stub();

    cy.mount(
      <CustomLink
        id='Link'
        tag={Button}
        onClick={onClick}
      >
        {'Test'}
      </CustomLink>
    );

    cy.get('button').click().then(() => {
      expect(onClick).to.be.called;
      expect(onClick).to.not.be.called
    });
  });

```

## Spying 

```js

 const onChangeSpy = cy.spy().as('onChangeSpy')
  cy.mount(<Stepper onChange={onChangeSpy} />)
  cy.get('[data-cy=increment]').click()
  cy.get('@onChangeSpy').should('have.been.calledWith', 1)
```

```js

cy.store().dispatch({type: 'order-date', value: '2022-04-30'});
 cy.store().getState('credit_limit').should('equal', '0.00000');

```


## Custom Commands 


```js
cy.window().its('store').invoke('dispatch', {type: 'description', value: 'my store description'});
```



cy.log(hello tech on the tyne)

```js
    it('Gets Luke Skywalker', () => {

        cy.intercept('GET', 'https://swapi.dev/api/people/1', {
            statusCode: 200,
            body: {
              name: 'Peter Pan',
            },
          })

          
        cy.request({
          url: 'https://swapi.dev/api/people/1',
          method: 'GET'
        })
          .its('body')
          .should('deep.contain', {
            name: 'Anakin Skywalker'
          })
      })
```

## Component Testing

Component tests are new to Cypress since v10. They offer a way to test a small component of the application in isolation, 
sandboxed, with as little cruft around it. It's a good way to flush out dependencies you didn't know you had in the application. 
Runs in browser but doesn't require anything else to be running.

Using cypress open you can get a number of configuration files created for you under the cypress folder. Tests go in the components 
subfolder and the usual support and fixtures folders are there too.

My desk calendar control is a simple display of today's day and date with a way to scrolling back and forward through the month. 
We can create a calendar.cy.js file to test it and run cypress to see it pick it up.

```js

import React from 'react';
import DeskCalendar from './pathtoo/Calendar';

describe('DeskCalendar component', () => {
    

    it('Shows a count of the current day in the month', () => {
        cy.mount(<DeskCalendar />);
        
        cy.get('.day-of-month').should('contain', '28');
    });

    it('Shows the day of the week', () => {
        cy.mount(<DeskCalendar />);
        
        cy.get('.day-of-week').should('contain', 'Tuesday');
    });

    it('Pressing the previous button shows yesterdays date', () => {
        cy.mount(<DeskCalendar />);
        
        cy.get('#prev').click();

        cy.get('.calendar').contains('Monday');
        cy.get('.calendar').contains('27');
    });

    it('Pressing the next button multiple times shows date in the future', () => {
        cy.mount(<DeskCalendar />);
        
        cy.get('#next').click().click();
        
        cy.get('.calendar').contains('Thursday');
        cy.get('.calendar').contains('30');
    });
});

```

## Component-Index.html

Before we look at the tests...

Immediately there are a couple of problems evident. The control has no styling and looks a bit disappointing.
We can provide some styling and html context for a control, but editing te component-index.html file. 

```html

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Components App</title>
    <style>
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
        }

    .calendar {
        border: 1px solid grey;
        box-shadow: 10px 10px lightgrey;
        margin: auto;
        padding: 2em;
        width: 25%;
        }

    .day-of-week {
        color: yellowgreen;
        font-size: 2em;
        }

    .day-of-month {
        color: red;
        font-size: 10em;
        letter-spacing: 0.1em;
        }

    .previous, .next {
        display: inline-block;
        background-color: #grey;
        font-size: 0.3em;
        padding: 0.5em;
        margin: 0 2em 0 2em;
        width: 5em;
        color: #yellowgreen;
        text-align: center;
        }
    </style>
    <style>
        [data-cy-root] {
            padding: 2em;
        }
    </style>
  </head>
  <body>
    <!-- component sits here -->
    <div data-cy-root></div>
  </body>
</html>

```

With the styling fixed we can see that the viewport isnt what we need to be (500 x500) so we can either change it 
in the config or we can use the viewport command :

```js

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

```

Now we'll move onto the tests. Each one runs and we can see them in the editor, we can expand each one and step 
through them to see before and after states. We can examine the DOM using dev tools and look at failures. 

## Logging 

Similar to console.log(args);

```js

cy.log('hello');

```

## Its and Invoke

Get a Property, Call a function
Example, get sessionStorage property of a window

```js
cy.window().its('sessionStorage');

```

Redux

```js
  
  cy.window().its('store');

```

```js

  cy.window().its('store').invoke('dispatch', {type: 'description', value: 'smol'});

```

## Commands in Component.js

inside support folder, there is a component.js file where we can add custom commands. Tidies up 
some things you can do with its 

E.g. 

```js

// get redux store
// e.g.
//   cy.store()...
Cypress.Commands.add('store', () => {
  return cy.log('Redux - Store').window({ log: false }).its('store', { log: false });
});

// get state of current redux value (node) or entire state
// const state = cy.store().getState();
Cypress.Commands.add('getState', (node) => {
  return node 
    ? cy.log(`Redux - State[${node}]`).window({ log: false }).its('store', { log: false }).invoke('getState').its(node.toString()) 
    : cy.log('Redux - State').window({ log: false }).its('store', { log: false }).invoke('getState');
});

// dispatch a type and value object to the redux store
// e.g.
//   cy.store().dispatch({type: 'name', value: 'Alice'});
Cypress.Commands.add('dispatch', (obj) => {
    const { type, ...data } = obj;
    return cy.log(`Redux - Dispatch: ${type}`, data)
        .window({ log: false })
        .its('store', { log: false })
        .invoke('dispatch', obj);
});

```