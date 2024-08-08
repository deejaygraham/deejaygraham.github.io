---
permalink: 2024/06/05/custom-microbit-modules/
layout: post
title: Custom Microbit Modules
published: true
tags: [code, microbit]
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.webp"
alttext: microbit sorting hat
---

As long as I have been working with the BBC microbit, I have always - for simplicity and ease of explanation - crammed all my code into a single tab in the mu editor,
regardless of how I would structure things in my day job, knowing what is good practice and what is not. 

Microbit can handle executing code spread across multiple files but the process is slightly clunky and not too intuitive.

### Process

* Write a file containing some code
* Save that file into the mu_editor folder locally
* import the file into the main source tab as you would with a "from microbit import *"
* Flash the source to the microbit
* Expect an error
* Open the "Files" console in the editor
* Drag the extra .py source file across to the microbit
* Restart the microbit
* Watch the code execute!

