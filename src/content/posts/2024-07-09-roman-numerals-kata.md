---
permalink: 2024/07/09/roman-numerals-kata/
layout: post
title: Roman Numerals Kata

tags: [code, tdd, csharp]
---

Another go at the Roman Numerals Kata from cyber dojo.

## Code

```csharp

using System.Collections.Generic;

public class RomanNumerals
{
    static Dictionary<int, string> arabicToRoman = new Dictionary<int, string>
    {
        { 1000, "M" },
        { 900, "CM" },
        { 500, "D" },
        { 400, "CD" },
        { 100, "C" },
        { 90, "XC" },
        { 50, "L" },
        { 40, "XL" },
        { 10, "X" },
        { 9, "IX" },
        { 6, "VI" },
        { 5, "V" },
        { 4, "IV" },
        { 1, "I" }
    };
    
    public static string ToRoman(int arabic)
    {
        string roman = string.Empty;
            
        foreach(int value in arabicToRoman.Keys)
        {
            while (arabic >= value)
            {
                roman += arabicToRoman[value];
                arabic -= value;
            }
        }
        
        return roman;
    }
}

```

## Unit Tests

```csharp
using NUnit.Framework;

[TestFixture]
public class RomanNumeralTest
{
    [Test]
    public void Zero_Returns_Empty_String()
    {
        Assert.AreEqual(string.Empty, RomanNumerals.ToRoman(0));
    }
    
    [Test]
    public void One_Returns_Single_I()
    {
        Assert.AreEqual("I", RomanNumerals.ToRoman(1));
    }
 
    [Test]
    public void Three_Returns_Three_Is()
    {
        Assert.AreEqual("III", RomanNumerals.ToRoman(3));
    }

    [Test]
    public void Four_Returns_IV()
    {
        Assert.AreEqual("IV", RomanNumerals.ToRoman(4));
    }

    [Test]
    public void Five_Returns_V()
    {
        Assert.AreEqual("V", RomanNumerals.ToRoman(5));
    }

    [Test]
    public void Six_Returns_VI()
    {
        Assert.AreEqual("VI", RomanNumerals.ToRoman(6));
    }

    [Test]
    public void Nine_Returns_IX()
    {
        Assert.AreEqual("IX", RomanNumerals.ToRoman(9));
    }

    [Test]
    public void Ten_Returns_X()
    {
        Assert.AreEqual("X", RomanNumerals.ToRoman(10));
    }

    [Test]
    public void Twenty_Seventeen_Returns_Lots_Of_Letters()
    {
        Assert.AreEqual("MMXVII", RomanNumerals.ToRoman(2017));
    }
}
```


