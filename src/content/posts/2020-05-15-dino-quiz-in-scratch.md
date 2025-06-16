---
title: Dino Quiz in Scratch
tags: [code, scratch]
---

I'm teaching a new beginner class in <a href="https://scratch.mit.edu/">Scratch</a> and came up with this fun version of a maths quiz
featuring a dinosaur and a bat.

I did this mainly to show some more animation features, how to use more than one sprite, how to assign scripts to each part of the application
and to have them interact using broadcast messages and events.

### Game

![game](/assets/img/posts/dino-quiz-in-scratch/main.png)

The game is split into three sections. Each animal is assigned a role, either the dinosaur or the bat, whichever you prefer, 
one as the asker of the questions (the "Quizmaster") and the answerer of the questions (the "Contestant"). 

### Quiz Master

Here are the blocks assigned to the quiz master role, asking the questions.

![quiz](/assets/img/posts/dino-quiz-in-scratch/quizmaster-events.png)

### Contestant

Here are the blocks assigned to the contestant role, answering the questions from the quiz master.

![contestant](/assets/img/posts/dino-quiz-in-scratch/contestant-events.png)

### Stage

Some elements of the game don't belong with either of the two roles above so I created blocks to 
be assigned to the stage.

![stage](/assets/img/posts/dino-quiz-in-scratch/stage-events.png)
