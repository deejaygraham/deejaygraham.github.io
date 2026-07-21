# deejaygraham.github.io

This is my Github user page that used to be made with Jekyll. It is now made using 11ty. If this page gets published at http://deejaygraham.github.io something has gone badly wrong.

## Start

Clone repo and run ./clean_start to prepare the dev environment. Runs ./check script at the end to run basic lint and tests.

## Validation

The markdown and javascript used in the site for building or at runtime are validated with several lint tools before building. 
./check script runs lints and unit tests to make sure everything looks good before committing.

## Build 

The site is built using [11ty](https://www.11ty.dev) and published here in glorious github.

```mermaid
flowchart TD
  subgraph entry [Common entry points]
    buildCmd["npm run build"]
    startCmd["npm start"]
    validatePre["npm run validate:pre"]
    validatePost["npm run validate:post"]
    testCmd["npm test"]
    unitCmd["npm run unit-test"]
  end

  subgraph buildFlow [npm run build]
    parallel["npm-run-all --parallel"]
    css["css<br/>tailwindcss<br/>src/assets/css/tailwind.css<br/>→ src/_generated/css/tailwind.css"]
    js["build:js<br/>esbuild site.js + search.js<br/>→ src/assets/js/"]
    eleventy["eleventy"]
  end

  buildCmd --> parallel
  parallel --> css
  parallel --> js
  css --> eleventy
  js --> eleventy

  subgraph eleventyLifecycle [Inside Eleventy]
    before["eleventy.before<br/>build:sw via scripts/build-service-worker.mjs<br/>→ src/_generated/sw.js<br/>+ cache-version.js"]
    templates["Process templates<br/>content · _generate · includes · data<br/>plugins: images, social OG, favicons, shiki"]
    passthrough["Passthrough copy<br/>JS · CSS · SW · downloads · select images"]
    after["eleventy.after<br/>copy build-cache/img/previews<br/>→ _site/img/previews"]
    out["_site/"]
  end

  eleventy --> before --> templates --> passthrough --> after --> out

  subgraph startFlow [npm start — local dev]
    wjs["watch:js"]
    wcss["watch:css"]
    serve["start:11ty<br/>eleventy --serve"]
  end

  startCmd --> wjs
  startCmd --> wcss
  startCmd --> serve
  serve -.-> before

  subgraph validatePreFlow [npm run validate:pre]
    lintSrc["lint:src — eslint ./src"]
    lintTests["lint:tests — eslint ./tests"]
    mdlint["mdlint — markdownlint content"]
    lintTags["lint:tags"]
    lintPosts["lint:posts"]
    lintImages["lint:images"]
    ava["unit-test — ava"]
  end

  validatePre --> lintSrc --> lintTests --> mdlint --> lintTags --> lintPosts --> lintImages --> ava

  validatePost --> lintOut["lintoutput — eslint ./_site"]
  testCmd --> playwright["playwright test"]
  unitCmd --> ava
```

## Workflow

GitHub Actions runs CI on every push and pull request. Deploy to GitHub Pages happens only after a successful CI run on a push to `main`.

```mermaid
flowchart TD
  subgraph triggers [Triggers]
    push["push any branch<br/>(ignore .gitignore, _drafts)"]
    pr["pull_request"]
    manual["workflow_dispatch"]
  end

  push --> ci
  pr --> ci
  manual --> ci

  subgraph ciJob [Job: ci — ubuntu-latest]
    checkout[Checkout code]
    node[Setup Node]
    deps[Install dependencies]
    pre["Validate pre-build<br/>npm run validate:pre<br/>eslint · mdlint · tags/posts/images · ava"]
    cacheIn[Restore social preview cache]
    build["Build<br/>npm run build<br/>Tailwind + esbuild + Eleventy"]
    cacheOut[Save social preview cache]
    artifact[Upload _site artifact<br/>site-build]
    sizeInspect[Inspect _site size]
    sizeBudget{"_site ≤ 200 MB?"}
    post["Validate site output<br/>npm run validate:post<br/>eslint _site"]
    pwInstall[Install Playwright]
    pwTest[Run Playwright on _site]
    pwReport[Upload Playwright report<br/>always]
  end

  ci --> checkout --> node --> deps --> pre --> cacheIn --> build
  build --> cacheOut --> artifact --> sizeInspect --> sizeBudget
  sizeBudget -->|fail| failCi[CI fails]
  sizeBudget -->|pass| post --> pwInstall --> pwTest --> pwReport

  subgraph deployGate [Deploy only if]
    cond{"ref == main<br/>AND event == push?"}
  end

  pwTest --> cond
  cond -->|no — PR / other branch| doneCi[CI complete — no deploy]
  cond -->|yes| deployJob

  subgraph deployJob [Job: deploy — needs: ci]
    dl[Download site-build artifact]
    pagesSetup[Configure GitHub Pages]
    pagesArtifact[Upload Pages artifact]
    deploy[Deploy to GitHub Pages]
  end

  dl --> pagesSetup --> pagesArtifact --> deploy --> live[Live site]
```

## Test

Tests are split into two areas. Plain javascript - 11ty filters etc - is tested using the [ava](https://github.com/avajs/ava) test runner. End to end tests are 
done by [Playwright](https://playwright.dev) and are run on every push to main. One test is excluded - testing the clipboard copy - because I can't get it to 
work correctly in CI, it is available to run on a local build. 
