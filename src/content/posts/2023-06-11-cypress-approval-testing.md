---
title: Approval Testing in Cypress
tags: [cypress, javascript, code]
hero: power
thumbnail: "/assets/img/thumbnails/cypress-420x255.png"

---

Continuing with using [Cypress](https://cypress.io) for API testing, a lot of the focus is on the live API connected to a
real database populated with known example data. The majority of the tests centre on "given this request, the data returned should
look like this", i.e. approval testing.

Approval testing is the approach of using real data and comparing returned data against a known good version - the "approved" version.

In Cypress there is no way to compare one object against another in sufficent detail to support a multi-level API object. Fortunately, there
is an easy way to add it. Again, API testing is really end-to-end testing so we extend using the cypress/e2e.js file, require the compare function(s)
and attach them to the Cypress object.

#### e2e.js

```javascript

const compare = require('./compare');

// ... other stuff

Cypress.compare = compare;

```

That was the easy part. The slightly more awkward part is the comparison function itself. We'd like to be able to write a test like this:

#### test.cy.js

```javascript

it('objects match', () => {

    const golden = {
        name: 'bob',
        age: 99,
        address: {
            line1: '55 Imaginary Street',
            line2: 'Unknown Town'
            postcode: 'UT55 IST'
        }
    };

    Cypress.compare.match(api_data, golden);
});

```

The comparison function needs to use the golden (expected) object as a reference, iterate through it's properties and find the matching property on the
actual object.

#### compare.js

```javascript

export const match = (actual, expected, options = {}) => {

    const maxDepth = options.maxDepth || 999;
    const depth = options.depth || 0;
    const propertyName = options.property || '';
    const exactIds = options.exactIds || false;
    const path = options.path || '';

    if (depth === 0) {
        cy.log('Comparing', JSON.stringify(actual, null, 2), JSON.stringify(expected, null, 2));
    }

    if (depth > maxDepth) return;

    if (Array.isArray(expected)) {
        expect(Array.isArray(actual), `Array '${path}'`).to.be.true;

        for(const index in expected) {
            // Find matching record in the actual data before compare -
            // elements in the array may not be in same order in both objects.
            // Get first property in expected object and use that to match in actual.
            const expectedObject = expected[index];
            const [key, value] = Object.entries(expectedObject)[0];

            const actualObject = actual.find(x => x[key] === value);

            const newOptions = {
                maxDepth,
                depth: depth + 1,
                property: `index ${index}`,
                exactIds,
                path: `${path}[${index}]`
            };

            expect(actualObject, `Matching ${newOptions.path}.${key} = ${value}`).not.to.be.undefined;
            match(actualObject, expectedObject, newOptions);
        }
    } else if (typeof expected === 'object') {
        expect(typeof actual, `Object '${path}'`).to.equal('object');

        Object.keys(expected).forEach(key => {

            const newOptions = {
                maxDepth,
                depth: depth + 1,
                property: key,
                exactIds,
                path: `${path}.${key}`
            };

            match(actual[key], expected[key], newOptions);
        });

        // ok for actual data to have more properties but not less
        const keys1 = Object.keys(expected);
        const keys2 = Object.keys(actual);
        expect(keys2.length, `Number of object properties in '${path}'`).to.be.at.least(keys1.length);
    } else {
        expect(actual, `Object property '${path}' exists`).to.not.be.undefined;
        expect(actual, `'${path}'`).to.be.equal(expected);
    }

};

```

I spent quite a bit of time trying to get the error messages to help as much as possible when there is a failure. The path helps to
identify array indexes and nested objects when the api data and the compared object are large and could contain many elements.
