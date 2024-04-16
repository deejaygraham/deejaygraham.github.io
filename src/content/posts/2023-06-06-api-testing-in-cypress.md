---
permalink: 2023/06/06/api-testing-in-cypress.html
layout: post
title: Api Testing in Cypress
published: true 
categories: [ cypress, javascript, code ] 
hero: power
thumbnail: "/img/thumbnails/cypress-420x255.png"
alttext: cypress
---

One thing missing from [Cypress](https://cypress.io), perhaps deliberately, is explicit support for API testing. I had been able to find a project that 
did offer a nice set of features but didn't match the requirements I had. So...here's what I came up with. 

I wanted to be able to support a couple of features with my example:

* Simple case of providing and string as a url, execute against that url and return the data.
* Support normal range of http verbs
* Support default headers without explicitly coding them in each test
* Support payload handling
* Support query handling
* Good logging of sent and received data to help with debugging

I would like to be able to, at it's simplest, call an api like this:


#### test.cy.js

```javascript

it('calls simple endpoint', () => {

  cy.api("/foo").then((response) => {
        // do stuff with response
    });

});

```

I also wanted to be more fine-grained and control all aspects of the request, query parameters for example:

```javascript

it('adds query to request', () => {
    cy.api({
        method: "GET",
        url: "/books",
        qs: {
            $order: "cheapest",
        }
    });
});

```

Also, to allow for PUT and POST operations requiring a payload:

```javascript

it('puts data back to the api', () => {
    cy.api({
        method: "PUT",
        url: "books/999",
    body: {
        author: {
                id: 666,
                name: 'Stephen King'
            }
        }
    });
});

```

For the implementation, custom commands are added to Cypress in the e2e.js file in the support folder:

#### e2e.js

```javascript

Cypress.Commands.add('api', (requestOptions) => {

    const stem = Cypress.config('baseUrl');

    let options = null;

    if (typeof requestOptions === 'string') {
        options = {
            method: 'GET',
            url: requestOptions,
            headers: buildDefaultHeadersFromEnvironment()
        };
    } else if (typeof requestOptions === 'object') {
        options = requestOptions;

        if (options.hasOwnProperty('headers')) {
            // cy.debug();
        } else {
            options.headers = buildDefaultHeadersFromEnvironment();
        }
    }

    // we want failures to be surfaced in the tests
    options.failOnStatusCode = false;
    options.log = false;

    const message = options.data ?
        `${options.method} request to ${options.url} with data ${JSON.stringify(options.data, null, 2)}` :
        `${options.method} request to ${options.url}`;

    // log before in case call fails
    const log = Cypress.log({
        name: 'api',
        message,
        autoEnd: false,
        consoleProps: () => {
            return {
                Site: stem,
                Url: options.url,
                Method: options.method,
                Headers: buildLoggableHeader(options.headers),
                Sent: options.body ? buildLoggablePayload(options.body) : undefined
            };
        },
    });

    return cy
        .request({
            ...options,
            log: false
        })
        .then((response) => {
            console.log(options.url, options.method, response.status);
            if (response.body) {
                if (Array.isArray(response.body)) {
                    console.table(response.body);
                } else {
                    console.log(response.body);
                }
            }
            log.set({
                consoleProps() {
                    return {
                        Site: stem,
                        Url: options.url,
                        Method: options.method,
                        Headers: buildLoggableHeader(options.headers),
                        Sent: options.body ? buildLoggablePayload(options.body) : undefined,
                        Status: `${response.status} (${response.statusText})`,
                        Received: response.body ? buildLoggablePayload(response.body) : undefined,
                        Duration: response.duration
                    };
                },
            });

            log.end();

            return response;
    });
});

```

I spent a long time trying to get the logging correct, or to be as useful as possible to help 
with debugging when the cy.request function doesn't show up in the network tab in the browser's dev tools window. I used
a mixture of Cypress logging and console logging to find (what I think to be) the right level of logging clarity 
particularly in situations where a network call fails or in some circumstances where there are a lot of 
tests in one file, Cypress wipes out the Cypress log and we have to fall back on the console if we want to see 
what's happening at the api.

I also wanted a clean-ish log of headers and data so had to build that in:

```javascript

const buildLoggableHeader = (header) => {
    const loggable = Object.assign(Object.create(null), header);

    return loggable;
}

const buildLoggablePayload = (data) => {
    const loggable = Object.assign(Object.create(null), data);

    return loggable;
}

```

One of the critical features was having a set of headers that were added to any request by default, not explicitly added 
for every test. Here I use the Cypress environment to search for values and add them to the request:

```javascript

const buildDefaultHeadersFromEnvironment = () => {

    const map = new Map();

    map.set('BearerToken', 'Authorization');
    // add other default headers

    const defaultHeaders = {
        'Content-Type': 'application/json'
    }

    // environment variables taken from environment
    map.forEach((headerName, environmentName) => {
        const value = Cypress.env(environmentName);

        if (value) {
            defaultHeaders[headerName] = value;
        }
    });

    return defaultHeaders;
}

```

Of course, if you want to specify individual headers, you can supply an object as part of the request:

```javascript

it('overrides default headers', () => {
    cy.api({
        method: "GET",
        url: "mystuff",
        headers: {
            Authorization: "MyCustomBearerToken"
        }
    });
});

```
