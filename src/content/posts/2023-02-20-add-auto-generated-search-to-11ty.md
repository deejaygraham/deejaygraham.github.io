---
title: Add Auto-generated Search to 11ty
tags: [code, javascript, 11ty]
thumbnail: /img/thumbnails/eleventy-alt-420x255.png

---

A lot of people in the wonderful 11ty community have helped me, through suggestions and inspiration, to 
build some challenging site features. These were done using eleventy 
in a lot less time than if I had been using some original home grown tools or maybe some other
static generators. One essential I had for a site, which had been previously supplied by the
aforementioned tools was search.

## Research

I drew on a couple of sources, most notably this post by Duncan McDougall
[Add Search to an Eleventy website with Elasticlunr](https://www.belter.io/eleventy-search/).
This got me setup with a [elasticlunr](http://elasticlunr.com/docs/index.html), an awesome js
search engine, how to build the search index into a json document, and an example search page
for the site.

## Content

This worked brilliantly well but the only downside for my large-ish site was that I needed
some search content. Duncan had approached this in his post the same way a lot of people seemed
to have, by adding keywords as an array to the front matter on each page. That didn't seem super
unreasonable, if a pain to generate in the first place. I bit the bullet and wrote a small
c# console application to list what I thought were the most important keywords and identify
which of the 700+ pages contained which keywords then wrote out the front matter for each page.

The idea and hope being that as content was changed in the markdown source, the keywords could be
maintained by the person making the change so that they would stay relevant to the content of each
page. This content then went into the json index using Duncan's method from the post.

The search worked brilliantly but the list of keywords was finite (the whole json doc was about
800Kb in size) and didn't totally reflect what the content of each page actually was.

## Code

Despite these few reservations, this all went swimmingly for a few months until a few people noticed
that they would like to be able to have a better refined search, especially within the source code
examples that we included on many of the pages.

The source code was included as another process in the 11ty pipeline (described in another post) and happened
fairly late on in the build process so wasn't available to the keyword front matter and if the
code example changed, the keywords wouldn't automatically reflect those changes.

There looked to be no way to fix this until the latest v2.0 of 11ty came out and
[events](https://www.11ty.dev/docs/events/#event-arguments) were filled out a bit more.

## Plugin

What I needed was a way to write "something" (waves hands at sky) that would take the finished document,
with source code included, and extract all the interesting pieces from it, not just several specific keywords.
From reading the docs, that seemed to imply I needed to write an [11ty plugin](https://www.11ty.dev/docs/plugins/).

```javascript
eleventyConfig.on(
  "eleventy.after",
  require("./\_11ty/plugins/search-index-generator"),
);
```

Once more, the community and [11ty](https://jec.fyi/blog/creating-filters-shortcodes-plugins)
[bloggers](https://timothymiller.dev/posts/2020/making-a-real-bonefide-plugin-for-11ty/) came to my rescue with
some great examples.

## Local?

One worry was that I didn't really want to go to the effort of publishing this as an "official" plugin and didn't
think anybody else would want to use it. Fortunately, it is possible to create a local plugin that just lives in the
main document repo along with the source documents and other \_11ty code without needing npm or anything like that.

## Events

I already mentioned the improvements in events with the v2.0 of 11ty. Another part of the puzzle was when or how to invoke
the code I was about to write that would extract the data? Upgrading from v1.something to v2 let me use the
"elevent.after" event with the new data that is now passed to it.

### .elevent.js

```javascript
eleventyConfig.on(
  "eleventy.after",
  require("./_11ty/plugins/search-index-generator"),
);
```

In the after event we get an array of all the pages that have been built and, crucially, the finished content of each page.
This means we don't need to inspect keywords in the front matter but can make use of the full text to add to the search.

## Search

The search code itself borrows from the original filter code and creates an elastic lunr object which it feeds data to
about each page that we see. The content is fully html so I needed a library to help me make sense of that so that I could
exclude repeated portions of each page from the search (e.g. the left hand navigation) and extract only the meaningful
part of each page. The best one I found was [Fast HTML Parser](https://www.npmjs.com/package/node-html-parser#htmlelementouterhtml)
which does the job admirably.

### \_11ty/plugins/search-index-generator/index.js

```javascript
const elasticlunr = require("elasticlunr");
const HTMLParser = require("node-html-parser");
const fs = require("fs");

module.exports = function ({ dir, results }) {
  console.log("Generating search index");

  const index = elasticlunr(function () {
    this.setRef("id");

    this.addField("title");
    this.addField("keywords");
  });

  results.forEach((page) => {
    const id = page.url;
    const doc = HTMLParser.parse(page.content);
    const titleNode = doc.querySelector("#doc-title");
    const contentNode = doc.querySelector("#doc-content");

    if (contentNode) {
      const title = titleNode.innerText;
      const searchText = squash(contentNode.textContent);

      index.addDoc({
        id,
        title,
        keywords: searchText.split(" "),
      });
    }
  });

  const json = JSON.stringify(index);
  fs.writeFileSync(dir.output + "/search-index.json", json);

  console.log("Search index complete");
};
```

Given the full html content, I extract the most important parts of each page and use those as the keywords for that page.
Finally, I write out the json search index into the site output with the html files.

## Squash

Of course, the full html, even for a small section of a page is probably too much to include in a search, so I
reduced this by taking the original and "squashing" it a little to extract only the good bits, a digest if you will.

I found that a lot of experimentation was needed (and a lot of console.logs) to work out how the data was shaping up,
how much to include, what to exclude and in what order. First, we make sure we are dealing with only lower case
characters, then I make sure there are no html tags left in the text and remove as much punctuation as I dare.
Some punctuation had to remain so that the code examples and names of variables and types made sense.

Next I removed duplicated words from the list and replaced a lot of common english words and then
common progamming words to try to declutter the output a bit more. The list shown is a bit shorter than
the real one, just so it can fit on the page :)

```javascript
const squash = (text) => {
  const lowerCased = new String(text).toLowerCase();

  // remove all html elements and new lines
  const htmlElementMatcher = /(<.\*?>)/gi;
  const plainText = unescape(lowerCased.replace(htmlElementMatcher, ""));

  // remove punctuation but leave full stops in place so that code namespaces are maintained.
  const punctuationMatcher = /\,|\?|-|—|\n|\r|\t|{|}/g;
  const unpunctuatedText = plainText.replace(punctuationMatcher, " ");

  // remove duplicated words
  const words = unpunctuatedText.split(" ");
  const uniqueWordList = [...new Set(words)];
  const uniqueWords = uniqueWordList.join(" ");

  // remove short and less meaningful words
  const unneededWordMatcher =
    /\b(a|an|and|am|also|by|you|I|to|if|of|off|...|for|how|to|the|such|now)\b/gi;

  let interestingWords = uniqueWords.replace(unneededWordMatcher, "");

  const programmingTermMatcher =
    /\b(begin|end|assumptions|assume|...|true|false|summary|item|value|page|this|use)\b/gi;
  interestingWords = interestingWords.replace(programmingTermMatcher, "");

  //remove repeated spaces
  interestingWords = interestingWords.replace(/[ ]{2,}/g, " ");

  return interestingWords;
};
```

Last thing was to remove double spaces and replace with single spaces and return the final string.

## Clean Up

The search database is much larger now than in the original version, around 10MB, but gzipping this takes it down
hugely so the transfer isn't noticeable in the browser.

The search template document is no longer needed and the search Filter code is also redundant but was the original
inspiration for the shape of the plugin where it interacts with elastic lunr.

The biggest benefit is that now we don't need to maintain keywords and any example code changes are reflected in the
search output without us having to worry about that either. In fact, I wrote an anti-keyword script to remove the keywords
I carefully put in at the start of the project.

A possible downside of using the plugin approach was that the search index was generated on each build, taking the
build time from around 10 seconds all the way up to 30 seconds. This isn't too much trouble for a single build
but can get a bit tedious when using the dev build server when pages can be unavailable while the search generation
happens.
