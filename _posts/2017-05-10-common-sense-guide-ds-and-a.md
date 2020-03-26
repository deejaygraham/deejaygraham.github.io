---
layout: post
title: A Common-Sense Guide to Data Structures and Algorithms
published: true
categories: [ code, books ]
thumbnail: "/img/posts/common-sense-guide-ds-and-a/thumbnail-420x255.jpg"
alttext: pairing
---

![cover](/img/posts/common-sense-guide-ds-and-a/cover.png)

In my spare time, I do pre-publication technical reviews for Pragmatic Programmer books, checking the technical consistency and accuracy, code samples etc. The process is always a delight because of the efficiency and friendliness of the editors and the high quality of the texts that we, as a panel of reviewers, get to see before a book is published. 

Since getting an early pdf of this book in my email it has been the one that I recommend to junior developers wanting to get a grip on some of the fundamentals of computer science, especially if they have not come from a traditional CS degree path. Almost immediately, from a first read through, I couldn't see anything wrong with the book as it stood. It was much more approachable than a few "standard" books I have felt bad recommending in the past just because they are such academic, dry texts and most of the time I don't think our juniors get any value from them and end up giving the whole thing up as "too hard". I'm sure this book will give them a much better start and a better awareness of complexity and performance issues in their code.

After reading through the book again, I was confused more by the earlier chapters, in particular the consistency of the diagrams used to explain memory. 

In chapter 1, there is a grid of memory locations and variations continue for the next few pages. All other diagrams in the book use a line of blocks and show them moving around (during sorting etc.) which is nice and clear but I don’t think the grid helps with anything. It is a traditional view of “memory” but I find in my teaching that it’s one of the things that causes confusion early on, why each row wraps around to the next etc. For a book on algorithms, is it important to talk about memory allocation? A lot of the diagrams assume a view from a particular programming language which is not true in all languages or across implementations of compilers (e.g. arrays allocating contiguous memory, arrays always begin at index 0) and across platforms. What do the numbers represent? If it’s memory locations then that’s not true for all cases. The diagram at the top of page six shows memory containing items from a shopping list - again this is true for c/c++ - but not for other languages. How does a string fit into a single byte of memory? I think this chapter can be cleaned up and made much simpler without the memory specific details that give too much detail for a discussion of algorithms but not enough detail to make sense - more confusion than helping. I think adopting the later approach of using each type of data as just a box is much easier to understand for this audience.

In step #4 on page 10, the diagrams are inconsistent, memory blocks have their contents shuffled down the line to leave a blank space for the inserted value. The final diagrams shows a new block being inserted into the place where there already was a block, rather than the value being copied into the block (which is closer to the linked list example later in the book). The delete section has it correct, the value is overwritten and other blocks shuffled up rather than the block being removed. Diagrams later in the book (e.g. chapter 2 ordered arrays) show the correct described behaviour.

There are a couple of places where “one logical step” is not clear - e.g. page 13 - where searching each element in an array takes N steps yet looking up an address - finding the base address and doing addition to find the required address - is treated as one step. In some places this in the text doing two steps counts as one operation and in others each step is counted on its own but it doesn’t seem clear why that is. Similarly on page 87 talking about hashing functions, this is assumed to be a single step process even though in the implementation it depends on the number of items in the list so can’t be constant time. If this is not true, then it’s not expressed clearly why, the given examples show hash multiplications for different lengths of key? Maybe a note about real hash functions and why they are considered to be O(1)?

I know we’re not supposed to report typos but page 44 (Step #8: We being by comparing the 2 and the 4:) being should be begin?

On the bubble sort implementation, pages 46 and 47, the naming of some of the variables could be better. The text describes the algorithm but then the variable names seem to be working against the description. "sorted" is clunky when having to be turned on and off and the while needs to include a not condition. Also “unsorted_until_index” needs explanation which seems unnecessary (or reduced) if worded to match the description of the algorithm.
