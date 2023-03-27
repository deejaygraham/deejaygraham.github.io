---
layout: post
title: Testing at the Top and Bottom of the Triangle
published: true
categories: [code, javascript, presentations]
thumbnail: img/thumbnails/notebook-420x255.png
alttext: talk
---

Here's a transcription of a talk that I am doing at Tech on Tyne on the 30th of March.


## Introduction 

Hi,

Thanks everyone for being here. 


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
1:45 seconds to learn some. 

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

The most important project is a large React application which we test application flow using selenium. For unit testing we were doing 
Jest but just for plain old javascript functions, we didn't find much use for libraries like enzyme. They were able to simulate a browser 
but really just enough to generate markup. We discovered that lots of bugs were undetectable in enzyme but a human running them in a 
browser would spot them instantly. Not really a good experience. I'll come back to this later on.

## SDK 

I have another work responsibility for a set of customer facing documentation that had several small niggles visible on the surface 
and several huge problems in the markup underneath - think html pages exported from Microsoft Word with embedded styling on each 
line. This was a bigger challenge because we wanted to improve things, clean up the internals but leave the externals the same or 
better than before. This clearly needed some proper testing in place. 

I wrote the new version in 11ty and since I was already deeply involved in javascript, I decided to try extending that to using 
cypress. This was with the notion that it probably wouldn't be any better than anything else we have tried. 


## NE Bytes 

Finally, I run a .net developer meetup (NEBytes) and recently moved all the content from an super old fashioned wordpress 
installation to github pages, 11ty and bulma for css. Again a publicly facing website so I needed to make sure that  we don't 
break stuff when we make changes. 


## Test triangle

This is the testing triangle or testing pyramid, that may be familiar to many of you. It's a metaphor for the types and proportions 
of tests we would expect in an application. Its shape shows we have a lot of very simple unit tests/microtests at the base, giving us 
wide coverage, slightly fewer integrated tests in the middle, and fewer still end to end application tests right at the top. 

## Microtests

Microtests are tests where we investigate and exercise behaviour of single functions, single classes or small groups of related classes 
where it makes sense to consider them as a group rather than introducing artificial barriers and seams. Importantly they stick to the 
Feathers definition of unit test, don't talk to any global variables, time, dates, databases, network, file system. 

## UI

At the other end, the end to end tests, test that the whole application hangs together and is wired correctly. So has a web server spun up, 
connecting to a database with config files in place and all that. This takes a lot of deployment effort to do and is relatively more expensive
than microtesting just because of all of the things that need to be in place. For example, needing a database implies that the data needs to be 
kept up to date, is refreshed and restored correctly etc. 

## Middle 

In my experience, where we end up in trouble is in this middle section. Integrated tests are the middle ground where the worst of all 
possible worlds exist. The integrated tests are the cursed places where we are testing that larger chunks of the application play nicely 
together. They have not enough context of the full application but too much knowledge about the 
interals of the application and require more dependencies than unit tests, take longer to run than unit tests and are more 
prone to breakage caused by design changes in one part of the application having a knock on effect on another part. Thses changes 
may be entirely invisible to the outside of the application. So not guaranteeing the whole system works but requiring almost as much maintenance as 
those tests. For a longer rant about this, I recommend Joe Rainsberger's talk "Integration tests are a scam"


## My Triangle

Over many projects and many opportunities to try this over and over again, I have my own version of this triangle.

I hope it's now clear why my talk is now testing at both ends of the triangle (but not the middle).

## Web Testing 

Specifically I want to talk about web testing in this session, so I want to talk about using my favourite web testing tool 
cypress. 

## Cypress 

I found about cypress quite a while ago, but originally I was using cypress purely to do end to end kinds of tests. It's 
really good at that but the thing that got me evangelising at work about it was in v10 when component testing came into beta.
First we'll talk about the cypress in general, then see some examples of end to end to give you a flavour of what that looks 
like, then we will do some component testing and look at some of the subtleties there. 


## Installing

Assume you have an node application. If not, npm init and answer questions or accept defaults. 

npm install cypress

npx cypress open 

Has two modes of running, interactive and command line

npx cypress run will run tests on command line like a jest test
npx cypress open opens interactive app 




First test


Example 1

End to end testing, Reed.com, bbc.co.uk

Example 2

React components demo


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


## APIs

## Custom Commands 

## What doesn't it do well



cy.log(hello tech on the tyne)


Slide 1: Introduction

Brief overview of the importance of testing in web development

Slide 2: The Testing Triangle

Explanation of the "testing triangle" and how it represents the different levels of testing in web development
Discussion of why it's important to test both the top and bottom of the triangle (user-facing features and underlying code)

Slide 16: Real-world Examples

Presentation of real-world examples and case studies of successful Cypress testing
Discussion of how these examples demonstrate the benefits of using Cypress for testing full web

Slide 3: Setting Up Cypress

Introduction to Cypress and its benefits for testing full web applications and React components
Overview of how to install and set up Cypress for testing
Discussion of the Cypress Dashboard and its benefits for monitoring test results

Slide 4: Writing Tests

Explanation of the basic structure and syntax of Cypress tests
Overview of how to write tests for your applications

Slide 11: End-to-end Testing

Explanation of what end-to-end testing is and why it's important
Overview of how to use Cypress to perform end-to-end testing

Slide 5: Testing with the Cypress API

Overview of the Cypress API and its key features
Discussion of how to use the API to write tests for your applications

Slide 6: Testing with React Components

Explanation of how to test React components with Cypress
Discussion of best practices for testing React components and maximizing test coverage

Slide 7: Testing with the UI

Overview of how to test user interfaces with Cypress
Discussion of best practices for testing user interfaces and ensuring the quality of user experiences

Slide 8: Testing with the Command Line Interface

Explanation of how to run tests from the command line with Cypress
Discussion of how to use the CLI to improve the efficiency and speed of your testing process

Slide 9: Debugging Tests

Overview of how to debug Cypress tests
Explanation of how to use the Cypress debugger to identify and fix test failures

Slide 10: Advanced Topics

Discussion of advanced topics such as end-to-end testing, testing with CI/CD pipelines, and integrating with other testing frameworks
Explanation of how to use these features to improve the efficiency and effectiveness of your testing process

Slide 14: Debugging and Troubleshooting

Overview of common issues that may arise when using Cypress
Explanation of how to troubleshoot and resolve these issues

Slide 15: Best Practices

Overview of best practices for using Cypress for testing
Discussion of how to write efficient and effective tests, optimize test performance, and ensure the quality of your applications
Lint



