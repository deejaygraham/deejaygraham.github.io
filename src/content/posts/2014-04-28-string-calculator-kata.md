---
permalink: 2014/04/28/string-calculator-kata/
layout: post
title: String Calculator Kata
published: true
tags: [tdd, deliberate-practice, csharp]
---

Here's a sample solution for the String Calculator Kata that I'm using with
<a href="http://cyber-dojo.com" alt="link to cyber dojo">cyber-dojo</a>,
in C# using NUnit as the test framework.

## Code

```csharp

{% include 'code/csharp/StringCalculator.cs' %}

```

## Tests

```csharp
using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;

[TestFixture]
public class StringCalculatorSpecimenTests
{
	[Test]
	public void StringCalculator_Add_Empty_String_Returns_Zero()
	{
		var sc = new StringCalculator();

		Assert.AreEqual(0, sc.Add(string.Empty));
	}

	[Test]
	public void StringCalculator_Add_Non_Numeric_Returns_Zero()
	{
		var sc = new StringCalculator();

		Assert.AreEqual(0, sc.Add("a,b,c"));
	}

	[Test]
	public void StringCalculator_Add_OneNumber_One_ReturnsOne()
	{
		var sc = new StringCalculator();

		Assert.AreEqual(1, sc.Add("1"));
	}

	[Test]
	public void StringCalculator_Add_OneNumber_Five_ReturnsFive()
	{
		var sc = new StringCalculator();

		Assert.AreEqual(5, sc.Add("5"));
	}

	[Test]
	public void StringCalculator_Add_TwoNumbers_OneTwo_ReturnsThree()
	{
		var sc = new StringCalculator();

		Assert.AreEqual(3, sc.Add("1,2"));
	}

	[Test]
	public void StringCalculator_Add_ThreeNumbers_OneTwoThree_ReturnsSix()
	{
		var sc = new StringCalculator();

		Assert.AreEqual(6, sc.Add("1,2,3"));
	}

	[Test]
	public void StringCalculator_Add_Three_Numbers_NewLine_OneTwoThree_Returns_Six()
	{
		var sc = new StringCalculator();

		Assert.AreEqual(6, sc.Add("1\n2,3"));
	}

	[Test]
	public void StringCalculator_Add_Three_Numbers_Whitespace_OneTwoThree_Returns_Six()
	{
		var sc = new StringCalculator();

		Assert.AreEqual(6, sc.Add("   1,		2,3  "));
	}

	[Test]
	[ExpectedException(typeof(NegativesNotAllowedException))]
	public void StringCalculator_Add_One_Negative_Number_Throws_Exception()
	{
		var sc = new StringCalculator();

		sc.Add("-1");

		Assert.Fail("Expecting Exception");
	}

	[Test]
	[ExpectedException(typeof(NegativesNotAllowedException))]
	public void StringCalculator_Add_Two_Numbers_Negative_First_Throws_Exception()
	{
		var sc = new StringCalculator();

		sc.Add("-1, 9");

		Assert.Fail("Expecting Exception");
	}

	[Test]
	[ExpectedException(typeof(NegativesNotAllowedException))]
	public void StringCalculator_Add_Two_Numbers_Negative_Second_Throws_Exception()
	{
		var sc = new StringCalculator();

		sc.Add("2,-7");

		Assert.Fail("Expecting Exception");
	}
}
```
