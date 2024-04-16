---
permalink: 2016/06/21/remembering-lost-kittens-and-robots.html
layout: post
title: Remembering Lost Kittens and Robots
published: true
categories: [ code, kata, open-source ]
---

I had been looking at some alternative programming languages, like [Sonic Pi](http://sonic-pi.net) 
[Processing](http://processing.org) and [Scratch](http://scratch.mit.edu/) when I remembered 
a little game I created way back in 2008 and when one of my children was interested in writing 
computer games. 

The game was called [Robot Finds Kitten](http://robotfindskitten.org/) and the original version was 
written by Leonard Richardson. Since that time, many people have ported to lots of different hardware 
environments and [web 2.0](http://robotfindskitten.org/play/robotfindskitten/).

Playing around with Scratch and feeling particularly unoriginal, I decided to write a version of 
the game using Scratch. It turned out to be easier than I thought. 

<blockquote> 
A very simple game (updated to add more non-kittens).
 
Your job is to find kitten. This task is complicated by the existence of various 
things which are not kitten.

Robot must touch items to determine if they are kitten or not. Use the arrow keys to 
move robot. The game ends when robotfindskitten.

Inspired by the game of the same name by Leonard Richardson.
 
Robots, Kittens etc. courtesy of iconarchive.com

No robots or kittens were harmed in the making of this game. 
</blockquote> 

Because it was targetted at younger players (my son was 10 at the time), I went with a very 
vivid, retro feel for the icons and colours. Read on, if you have sunglasses to hand :)


## Setting the Stage

The background and "host" for a scratch game is called "the stage". A stage can have a background,
display text, react to events and host other game stuff, icons, avatars etc. 

The game starts off with some simple instructions:

![intro](/img/posts/remembering-lost-kittens-and-robots/rfk-intro.webp)

Clicking on the game (stage), the starts the game with a screen filled with hidden, potential-kittens,
disguised as packages, and a robot that you move around to interact with the packages to see what they 
are.

![game](/img/posts/remembering-lost-kittens-and-robots/rfk-game.webp)

Once the kitten has been found by the robot, the complete screen is shown:

![complete](/img/posts/remembering-lost-kittens-and-robots/rfk-complete.webp)

The number of avatars is fixed but each's location is randomised at startup to make the 
game harder. Kittens and Non-Kittens have the same starting avatar (package) but change to 
reveal their "real" identity when bumped into by Robot. The game is over when Robot finds 
the Kitten.

You can still see the game online at the [scratch website](https://scratch.mit.edu/projects/118819/).

## Source "Code"

Scratch stores each project as a single binary file, bundling all the "code" and graphics,               
sound etc. together into a single image. The "source" below is therefore a set of 
screenshots of the project showing each of the actions performed by each sprite.               
The best way to understand the code, such as it is, is to play with it in the Scratch 
environment. 

### Stage

![stage](/img/posts/remembering-lost-kittens-and-robots/rfk-stage-code.webp)

### Robot

![stage](/img/posts/remembering-lost-kittens-and-robots/rfk-robot-code.webp)

### Non-Kittens 

![stage](/img/posts/remembering-lost-kittens-and-robots/rfk-non-kitten-code-1.webp)

![stage](/img/posts/remembering-lost-kittens-and-robots/rfk-non-kitten-code-2.webp)

### Kitten

![stage](/img/posts/remembering-lost-kittens-and-robots/rfk-kitten-code.webp)

If the game disappears from the MIT website, can get the scratch binary image of the game 
[here](https://github.com/deejaygraham/deejaygraham.github.io/raw/master/downloads/rfk_scratch_binary.zip)
