# deejaygraham.github.io

This is my Github user page that used to be made with Jekyll. It is now made using 11ty. If this page gets published at http://deejaygraham.github.io something has gone badly wrong.

## Build 

The site is built using [11ty](https://www.11ty.dev) and published here in glorious github.

## Test

Tests are split into two areas. Plain javascript - 11ty filters etc - is tested using the [ava](https://github.com/avajs/ava) test runner. End to end tests are 
done by [cypress](https://www.cypress.io). There are a set of [Playwright](https://playwright.dev) tests in the tests folder but the syntax is not as nice, they 
seem to take longer than cypress and the clipboard functionality seems to be failing on github actions - even though it works locally. 
