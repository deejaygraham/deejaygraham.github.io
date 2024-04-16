---
permalink: 2019/06/08/balanced-parens-kata/
layout: post
title: Balanced Parentheses Kata
published: true
categories: [ code, deliberate-practice, tdd ]
---

Here's a quick solution to the balanced parentheses kata. The problem statement is:

<pre>
{% raw %}
Write a program to determine if the the parentheses (),
the brackets [], and the braces {}, in a string are balanced.

For example:

{{)(}} is not balanced because ) comes before (

({)} is not balanced because ) is not balanced between {}
     and similarly the { is not balanced between ()

[({})] is balanced

{}([]) is balanced

{()}[[{}]] is balanced

{% endraw %}
</pre>   

In a recent dojo we did some investigation of this, trying to find the best way to model the inner set of parentheses, maybe 
how to split the string and compare front and back halves, how to count the number of opening and closing but it struck me 
that we can model it very well by using a stack metaphor. When we open a parenthesis we push it onto the stack and when we 
close one we should have seen a matching open otherwise we consider it unbalanced. We know we have a balance at the end of the 
function if the stack is empty - that is, we have popped as many closing parentheses as we have pushed opening ones. 

### Code

First pass looked like this with lots of repeated code in brace comparisons:

```python

{% include 'code/python/balanced-parens-naive.py' %}

```

We can also neatly match up opening and closing pairs by using a dictionary. 


```python

{% include 'code/python/balanced-parens-kata.py' %}

```

If we find a closing character, we look at the previous 
paren and look up what we think should be the matching closing character and compare it to the one we have just read. If they 
don't match, that's an unbalanced case. 


### Unit Tests

```python

{% include 'code/python/balanced-parens-tests.py' %}

```
