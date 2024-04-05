---
layout: post
title: Perfecting Code Reviews
published: true
categories: [ code, agile ]
---

I first read about the Core Protocols way back in the early 2000s from 
<a href="http://www.mccarthyshow.com/">Jim & Michele McCarthy</a>'s book "Software for your head".

![book cover](/img/posts/perfecting-code-reviews/software-for-your-head.webp)

They seem like a sensible set of ideas but probably way too radical for most organizations. I recall 
we tried adopting the protocols with a team I was leading a few years later but due to other constraints 
it didn't entirely succeed.

Like all great ideas, it came back to me again while listening to the <a href="http://integrumtech.com/category/agile-weekly-podcast/">agile
weekly</a> podcast in the early 2010's. I had not thought about them again or had another opportunity to 
try using them with a new team until recently when talking to a friend about code reviews.

Describing how I do code reviews with another developer, I noticed during the conversation 
that I had been subconsciously using the *Perfection Game* in recent sessions. It was in an 
adapted form to suit the medium but still captured the spirit of the original.

## Perfection

The Perfection Game is used as a way to help you improve something you have created. It's at a time when
you are asking for help in making something better so that the exercise becomes more
collaborative than critical.

<blockquote>
Perfect results by thinking and telling one another what you like and what would make the results perfect.
</blockquote>

It starts with the creator (or *perfectee*) presenting something to someone else, asking that
person to rate the performance on a scale of 1 to 10. The *perfector* then lists the things
they liked about the performance and offers suggestions for improvement that would take the work
from it's current score to a "10". If the perfector can't think of a way to improve the code, they
can't withhold points.

## Review

Code reviews, by contrast, can be very negative experiences, particularly for less experienced
developers presenting code to world-weary, battle-scarred bad-ass senior devs. A more experienced
developer looking at the code may be tempted to start straight into statements pretending to be
questions - "why did you do it that way?", "that's all wrong, why would you write it like that?",
"why didn't you think about...?", "how can that ever work?" etc.

The less experienced developer often have a lot of anxiety about others reading their code and may 
strongly identify with *their* code and feel very protective of it, may be 
hurt by ill considered comments or withdraw from further interactions. There's probably
a whole series of articles on using techniques, like the Socratic method, to teach self evaluation
of source code.


## Steps

Here's how I approach code reviews now using my covert perfection game :)

* Person asks for code review
* Person explains the reason for the change
* Person demonstrates the change 
* Person shows diffs between old and new code 

During this process I am making notes on things I think could be improved, things which may be wrong, 
things which they may not have considered. I have a running total in my head of the "score" I think I want 
to give. At the end, I'll say something like: "I would give that change a 7 out of 10". I would then ask 
for permission to share my thoughts for how it could be improved (no is always an acceptable answer). 
Then I would suggest concrete improvements to be made to bring the score up to full marks. This might be a 
suggestion of how to make something more robust but might be as vague as "that name doesn't convey what you 
are hoping it would, how can we make it better reflect your intention?"


## Conclusion

It seems to be working well and I *think* I might keep it.

You can <a href="http://www.mccarthyshow.com/online/">see</a> the core protocols at the
McCarthy website or <a href="http://www.mccarthyshow.com/download-the-core/">download</a> a pdf.
