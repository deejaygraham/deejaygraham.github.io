---
title: T-Rex Runner Game in Scratch
tags: [code, scratch]
---

A final, more complicated game to round off the scratch for beginners sessions. This is a recreation of the Chrome browser game
that shows if your internet connection is down. It features a pixelated T-Rex dinosaur running across the screen and jumping to avoid
cactus in it's path. Pressing the spacebar causes the t-rex to jump, you score points for how far you can run, and if you come
into contact with a cactus, the game is over.

I found a <a href="https://github.com/wayou/t-rex-runner">github repo with the assets from the game</a>. The readme shows a nice
animated version of the game for reference.

## Start

![original](/assets/img/posts/scratch-t-rex-runner/200-offline-sprite.png)

The assets in github come as a single png file so first I needed to extract the sprites into individual files so that they could be
imported into Scratch as costumes.

## T-Rex Images

![t-rex 1](/assets/img/posts/scratch-t-rex-runner/trex1.png)
![t-rex 2](/assets/img/posts/scratch-t-rex-runner/trex2.png)
![t-rex 3](/assets/img/posts/scratch-t-rex-runner/trex3.png)
![t-rex 4](/assets/img/posts/scratch-t-rex-runner/trex4.png)
![t-rex 5](/assets/img/posts/scratch-t-rex-runner/trex5.png)
![t-rex 6](/assets/img/posts/scratch-t-rex-runner/trex6.png)
![t-rex 7](/assets/img/posts/scratch-t-rex-runner/trex7.png)
![t-rex 8](/assets/img/posts/scratch-t-rex-runner/trex8.png)

I didn't use all of the t-rex sprites, e.g. the crouching versions, because I was only building a simple version of the game.

![t-rex costumes](/assets/img/posts/scratch-t-rex-runner/t-rex-costumes.png)

## Cactus Images

![cactus 1](/assets/img/posts/scratch-t-rex-runner/cactus1.png)
![cactus 2](/assets/img/posts/scratch-t-rex-runner/cactus2.png)
![cactus 3](/assets/img/posts/scratch-t-rex-runner/cactus3.png)

![cactus costumes](/assets/img/posts/scratch-t-rex-runner/cactus-costumes.png)

With the sprites created and the costumes loaded, the next stage was to write the code behind each piece.

## Stage

First the stage is represented by a simple line to show the horizon in the background, not the more complex
terrain that the original game shows. The dinosaur and the cactus appear in front of the line to show they are
closer to the player.

![running](/assets/img/posts/scratch-t-rex-runner/running.png)

The stage sets up the variables we use for positions, ground level, left and right etc. before we begin.

![stage code](/assets/img/posts/scratch-t-rex-runner/stage-code.png)

The stage also keeps track of the score by incrementing the distance the t-rex has run during the game. This is
shown in the top left of the screen.

The stage listens for the game over event and switches to the game over background.

![game over](/assets/img/posts/scratch-t-rex-runner/game-over.png)

## Cactus

The cactus obstacle sprite generates a clone of itself ever few seconds and positions them off the right hand side of
the screen, then travels to the left, towards the t-rex and finally off the screen again. The cactus has
three costumes and switches between them at random so that each appearance of the cactus can be different.

![stage code](/assets/img/posts/scratch-t-rex-runner/cactus-code.png)

## T-Rex

The t-rex is the most complex sprite in the game which might be expected since they represent the player. First we put the
sprite towards the left hand side of the screen so as to give the most notice of the cactus approaching from the right.

Next, we want to make sure that the t-rex is aware of gravity and if they are up in the air at any time, they are brought back
to ground level. Also here, I put in the ending condition which is if the t-rex touches a cactus as it is passing by.

There are two distinct actions happening with the t-rex, running and jumping. Getting the t-rex to run means keeping it at ground level
but switching between two costumes to animate a running motion. Jumping on the other hand, switches to a stationary costume and
launches the t-rex into the air in a somewhat graceful arc under the influence of gravity before returning to earth again.

I had to implement the running and jumping portions as separate chunks and use broadcast messages to switch between them so that
costume behaviour and physics would work correctly in the simplest way. At startup, the t-rex begins running, when the space key is pressed
the jump subroutine takes over and then returns to running.

Finally, on game over, the t-rex switches to a last costume which shows a bit of a surprised expression.

![t-rex code](/assets/img/posts/scratch-t-rex-runner/t-rex-code.png)
