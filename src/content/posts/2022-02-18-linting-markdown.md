---
permalink: 2022/02/18/linting-markdown.html
layout: post
title: Linting Markdown
published: true
categories: [code, javascript, 11ty]
thumbnail: img/posts/linting-markdown/thumbnail-420x255.png
alttext: screenshot
---

Currently in the middle of porting a large-ish web documentation site from janky, old style, MS Word generated html to 
standard markdown so I can use it as content for an [11ty](https://www.11ty.dev) site.

Of course, all the html is broken in different ways and written over time in various different styles so running a conversion 
tool on it proved to be a problem. I have been migrating it piece by piece by writing simple command line conversion tools to 
address one problem at a time and the bits that are too difficult to automate I am hand converting.

This lead me to finding a tool to run against all my pages to make sure that the markdown is correct and I don't have any 
stray html markup where I don't want it. The tool is a package called [markdownlint](https://github.com/DavidAnson/markdownlint) 
which I run as a script from npm using markdownlint-cli.

```json
{
  "scripts": {
    "lint": "markdownlint --config .markdownlint.json content/DOC*.md"
  },
}
```

It works very much like other lint varieties in other languages but I found it very useful to (as the command line allows) use 
a config file to turn on and off issues while I make gradual improvements to the docs. 

```json
{
  "no-trailing-spaces": false,
  "no-hard-tabs": false,
  "line-length": {
    "line_length": 100
  },
  "no-inline-html": {
    "allowed_elements": [
      "a",
      "p",
      "h4",
      "caption"
    ]
  },
  "no-multiple-blanks": false
}
```

Configuration can be single options on or off or objects with embedded configuration to override the defaults, like the 
line-length and allowed_elements above.

Part way through the conversion means I have to relax some issues generally, turn off checking on some files and override 
small sections where there is no other option.

Turning off checking in a draft/broken source file you can put a single comment tag at the beginning of the file like this:

```html
<!-- markdownlint-disable-file -->

<dodgy_html />
```

Specific issues can be "accepted" by adding an exception a line above:

```html
<!-- markdownlint-disable-next-line line-length -->
This is too long a line to show up correctly in the doc....
```

For more extreme cases where more than one line in a block is causing a violation, then capturing the current state,
disabling checking then restoring at the end is a good solution.

```html
<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
<oUteRagousHtmlCode>
    <goeSHEere />
</oUteRagousHtmlCode>
<!-- markdownlint-restore -->
```
