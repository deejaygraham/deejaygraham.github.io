---
title: Better Date Handling in Cypress
tags: [cypress, javascript, code]
hero: power
thumbnail: "/assets/img/thumbnails/cypress-420x255.png"

---

I've been getting into using [Cypress](https://cypress.io) for API testing recently and needed some nicer way of handling dates than just the raw Date class in JavaScript.
At this point in time - who knows it might be different by the time you read this :) - [dayjs](https://day.js.org) seems to be the way to go rather than moment or one of the others.

The process of how to add it to Cypress and expose it in a nice way turned out to be fairly easy. First we need to install dayjs, usually I use npm but other
package managers work just as well I am told.

Once the package is installed, I needed to make Cypress aware of it. API tests come under the umbrella of end-to-end-tests so the e2e.js file under the cypress folder was the place to
do that.

#### e2e.js

```javascript

const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc'); // we handle dates in utc only

dayjs.extend(utc);

```

The main dayjs is required plus the utc plugin so we can work with UTC dates.

Once the utc extension has been added, we can hang dayjs on the global Cypress object.

#### e2e.js

```javascript

Cypress.dayjs = dayjs;

```

and then access it in the test code like this:

```javascript

it('api can do dates', () => {

const today = Cypress.dayjs.utc();

});

```

This works for general exposure to the full utility but we can also set up some custom functions if we want:

#### e2e.js

```javascript

Cypress.formatted_date = () => dayjs.utc().format('YYYY-MM-DD');

```

```javascript

it('api can do dates as text', () => {

const today = Cypress.formatted_date();

});

```
