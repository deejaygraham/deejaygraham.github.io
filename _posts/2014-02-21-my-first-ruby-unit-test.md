---
layout: post
title: My First Ruby Unit Test
published: true
categories: [ ruby, tdd, code ]
---

I have an on-going project to trick myself into learning Ruby by accident.

Being a big proponent of TDD I thought it was important that one of the first 
things I should get to learn was what was available to support unit testing 
while developing in Ruby. 

Asking around it seems like test/unit is the easiest to get going with so 
that's what I'm going to try. 

The test examples below comes from chapter 9 of [Chris Pine's](https://pine.fm/) 
[Learn to Program in Ruby](http://www.pragprog.com/titles/ltp2/learn-to-program-2nd-edition).

First we need to import the unit test module:

	require 'test/unit'
	

The derive our test class from Test::Unit::TestCase

	class TestOldRomanNumerals < Test::Unit::TestCase
	
	end
	

Hurrah! Now we're ready to do some testing! 

By convention, each method in the test class must begin with "test" so that 
the framework knows it's a test.

Here I'm testing that my roman numeral code returns a blank string when given a
zero to translate.

	def test_zero_value_returns_blank
		assert_equal('', old_roman_numerals(0))
	end
	
We can continue in this way with other values

	def test_thousand_value_returns_m
		assert_equal('m', old_roman_numerals(1000))
	end
	
To test an exception is thrown in a particular scenario, test/unit uses this 
construct:

	def test_non_arabic_value_throws_exception
		assert_raises(RuntimeError) { old_roman_numerals('xvii') }
	end
	
	
In .Net my favourite unit testing framework is [xUnit](http://xunit.codeplex.com) and
it was nice to see that, apart from enforcing a derivation on the test class, 
the boilerplate test code required in each framework is not a million miles 
apart. Even testing exceptions is kind of similar. In xUnit, there is a 
construct to assert a given lambda expression throws an expected type of 
exception and the test/unit code is very similar.

In it's favour xUnit, rather than explicitly preprending the method name with "test", 
the framework discovers tests by searching for public methods that have a 
"[Fact]" attribute. If find the use of attributes in .Net leaves you as the 
conveyer of intent (to yourself in six months or some other poor soul) free 
to use the method name as a sensible description of your expectation for the code.

