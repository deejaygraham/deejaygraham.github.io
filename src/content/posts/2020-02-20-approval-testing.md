---
permalink: 2020/02/20/approval-testing/
layout: post
title: Approval Testing
tags: [ agile, xp ]
published: true
thumbnail: "/img/posts/approval-tests-workshop/thumbnail-420x255.webp"
---

Last night we had our February <a href="http://nebytes.net">NE Bytes</a> developer meetup, this time with the 
excellent <a href="https://twitter.com/emilybache">Emily Bache</a> running a remote workshop from her home in Sweden. 

<img src="/img/posts/approval-tests-workshop/opening.webp" alt="opening" class="u-max-full-width" />

Emily spoke on approval testing, what it was and how to use it to improve the quality of software. 

<img src="/img/posts/approval-tests-workshop/discussion.webp" alt="what makes a good test" class="u-max-full-width" />

We kicked off with a discussion in small groups of what makes for a good unit test with plenty of suggestions from the delegates. Because this was
a remote session, I had Emily's feed from my laptop projected onto the big room display and my webcam facing out into the room. Despite 
this, it was difficult for Emily to hear all the feedback so I acted as her local proxy and relayed feedback when she asked for it. 

<img src="/img/posts/approval-tests-workshop/workshop-1.webp" alt="code review" class="u-max-full-width" />

Staying in our small groups, after this discussion of general unit tests, Emily asked us to look at some sample tests which we had 
pinned around the room earlier. They were different styles, levels of complexity, format and layout and again we had a good 
discussion about the relative pros and cons of each approach. We put up post-it notes of feedback against each of the reviewed samples.

<img src="/img/posts/approval-tests-workshop/workshop-2.webp" alt="code review" class="u-max-full-width" />

We then moved onto the main topic, approval tests and how to use them to tame legacy code which doesn't already have tests written for it. 
Emily took us through several different applications to show how to use an approval test library in Java using a shopping cart example where 
the original tests were verbose with a lot of repetition. Approval testing made the code easier to read at the expense of having to regenerate the 
golden copy and maintain it in source control along with the test code itself.

<img src="/img/posts/approval-tests-workshop/code-1.webp" alt="code" class="u-max-full-width" />

<img src="/img/posts/approval-tests-workshop/code-2.webp" alt="code" class="u-max-full-width" />

Last, Emily ran through the <a href="https://github.com/emilybache/GildedRose-Refactoring-Kata">Gilded Rose kata</a> to demonstrate the use of 
approval tests when refactoring "untestable", complex, code into a more readable form. Having the approval tests there to act as a safe guard she 
was able to make some bolder refactorings than she could have without them and was confident that she hadn't broken anything.

<img src="/img/posts/approval-tests-workshop/code-3.webp" alt="code" class="u-max-full-width" />


## Feedback

As a final exercise, Emily asked us to come up with some thoughts for things we could take away from the workshop and capture 
them on a few post-it notes. 

<img src="/img/posts/approval-tests-workshop/feedback-postits.webp" alt="feedback" class="u-max-full-width" />

Not everyone was comfortable saying what their feedback was aloud or writing it down but I got lots of feedback in the form of 
private comments that everyone had learned a huge amount and had been encouraged to think about the topic. I was even contacted by 
a team who had heard about the session later and asked for an overview with a chance to implement it for an existing project.

Again this was an event hosted by Scott Logic at their Newcastle offices and we are grateful to them for their continued support.
