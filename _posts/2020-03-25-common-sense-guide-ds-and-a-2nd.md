---
layout: post
title: A Common-Sense Guide to Data Structures and Algorithms 2nd Edition
published: true
categories: [ code, books ]
thumbnail: "/img/posts/common-sense-guide-ds-and-a-2nd/thumbnail-420x255.webp"
alttext: cover
---

![cover](/img/posts/common-sense-guide-ds-and-a-2nd/cover.webp)

It's been 2-and-a-bit years since the first edition of this book and my opinion of it hasn't dimmed in that time so I was excited to get an email from Pragmatic Programmers with the updates for the 2nd Edition. 

I found the code examples easy to follow but did find it a little frustrating that they cycled between languages. I know ruby, python and javascript so it didn’t hurt my understanding but I wonder if some junior devs might find it harder to get the points if they were only familiar with one language (and there seems to be a slight bias towards JavaScript?) ? I don’t know a good way out of this except to offer multiple language examples as downloads if there is enough demand? Most of the examples aren’t that complicated but I know a few junior devs who would like to have the code so they could run it for themselves to see what how it worked and would perhaps struggle translating from one language to another. In quite a few places there are call outs for which language an example is shown in but in many others the language isn’t mentioned and sometimes it can be a little bit difficult to pick out the sense of the function trying to decide if it’s ruby or python, python or javascript.

In the newer chapters and where parts have been rewritten from the earlier edition, I think the explanations and worked examples are clearer and hit about the right level for guiding e.g how data element moves through a sort. I think this goes some way to mitigating my point about language above. The chapters on traditionally difficult recursion were particularly good on this especially since the topic can be confusing and it was good to see lots of different examples and the progression of recursive functions with detailed explanations rather than some texts I have seen which show Fibonacci sequences and not much more. I was glad to see some expanded content on the topic of recursion. In the section about the use of the stack in recursion and in later chapters about subtle changes to recursive functions I kept expecting the topic of tail call optimisation to come up, especially since there are JavaScript examples, even as a short section to describe how “magic” can be invoked to get around some of the problems people tend to associate with recursion. I feel it was almost there in chapter 10 with Recursion in the Eyes of the Computer. Was there a reason for missing it out? 

Chapter 4 example answers seem a little bit confused, example 2 isn’t answered in the back of the book, example 3 answer seems to answer example 4.

Chapter 8 answers are all for answer 1? The function for example 4 missingLetter appears to be setup rather strangely, the alphabet is defined as a dictionary but treated like an array when used in the loop? Could a string or an array not be used for better space conservation and clearer example? 

Chapter 11, the code at the top of page #161 is wrong. If string.length == 1 return if string[0] == ‘X’ but then else is returning zero. The remainder of the function will never be executed. Else and return zero need to be inside the if rather than the alternative to the if.

Chapter 11 and 12 sample answers are also all numbered with 1s.

I know we aren’t supposed to be concerned about layout but I did notice that several of the purple side panels (e.g. In-Place Modifications on page #153) looked like they should have formatted code within them where the rendering has failed so the example is not at all clear and the idea of having that explanation in a box is diminished.

Lastly, lots of the graphs in this edition seem to be a lot less clear in terms of the legends. The graph on page #70 is nice and clear which line relates to which O classification. Other graphs have very small legends (e.g. bottom of page 94, top of page 103 is particularly bad) and make it really difficult to be able to tell the lines apart so the point of using them was lost on me. I found I could only zoom in so far but the legibility was not what it should be for me to make it out. It would help the book a lot if the graphs could be consistent.

This is still my favourite intro book on algorithms that I recommend to our junior devs and I will be buying more copies of this new edition when it is available. 