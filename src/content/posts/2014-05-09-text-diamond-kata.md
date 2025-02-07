---
permalink: 2014/05/09/text-diamond-kata/
layout: post
title: Text Diamond Kata

tags: [tdd, deliberate-practice]
---

Here's a sample solution for the Text Diamond Kata that I'm using with
[cyber-dojo](http://cyber-dojo.com):

```
    Given a letter print a diamond starting with 'A'
    with the supplied letter at the widest point.
    For example: print-diamond 'E' prints


        A
       B B
      C   C
     D     D
    E       E
     D     D
      C   C
       B B
        A

```

This sample deliberately doesn't used recursion (the group is learning basic
algorithm handling), and is written in C# using MsTest as the test framework.

## Code

### PaddedText.cs

```csharp
using System.Text;

public class PaddedText
{
	public PaddedText()
	{
		this.SpaceCharacter = ' ';
	}

	public char SpaceCharacter { get; set; }

	public int ExternalSpacing { get; set; }

	public int InternalSpacing { get; set; }

	public string Text { get; set; }

	public override string ToString()
	{
		string externalSpaces = MakeStringOfLength(this.ExternalSpacing, this.SpaceCharacter);
		string internalSpaces = MakeStringOfLength(this.InternalSpacing, this.SpaceCharacter);

		string textFormat = this.InternalSpacing > 0
			? "{0}{1}{2}{1}{0}"
			: "{0}{1}{0}";

		return String.Format(textFormat, externalSpaces, this.Text, internalSpaces);
	}

	private static string MakeStringOfLength(int length, char repeatCharacter)
	{
		return length > 0 ? new String(repeatCharacter, length) : String.Empty;
	}
}
```

### TextDiamond.cs

```csharp
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;

public class TextDiamond
{
	private readonly string Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	private char _highCharacter;

	public TextDiamond()
	{
		this.SpaceCharacter = 'X';
	}

	public char HighCharacter 
	{ 
		get 
		{ 
			return this._highCharacter; 
		} 
		set 
		{ 
			this._highCharacter = Char.ToUpper(value); 
		} 
	}

	public char SpaceCharacter { get; set; }

	public int Width
	{
		get
		{
			return PlaceInAlphabet(this.HighCharacter) * 2 + 1;
		}
	}

	public int PlaceInAlphabet(char letter)
	{
		Debug.Assert(Char.IsLetter(letter), "Invalid character");

		return this.Alphabet.IndexOf(Char.ToUpper(letter));
	}

	public override string ToString()
	{
		List<PaddedText> triangle = new List<PaddedText>();

		int from = PlaceInAlphabet(this.Alphabet.First());
		int to = PlaceInAlphabet(this.HighCharacter) + 1;

		int externalSpacing = (to > 1) ? to - 1 : 0;

		for (int i = from; i < to; ++i)
		{
			int lettersInRow = i == 0 ? 1 : 2;
			int internalSpacing = (i > 0) ? this.Width - lettersInRow - (externalSpacing * 2) : 0;
			triangle.Add(new PaddedText { Text = this.Alphabet.Substring(i, 1), ExternalSpacing = externalSpacing, InternalSpacing = internalSpacing });

			--externalSpacing;
		}

		return BuildDiamond(triangle);
	}

	public string BuildDiamond(IEnumerable<PaddedText> triangle)
	{
		StringBuilder builder = new StringBuilder();

		const string NewLine = "\r\n";

		builder.AppendLine(String.Join(NewLine, triangle));
		builder.AppendLine(String.Join(NewLine, triangle.Reverse().Skip(1)));

		return builder.ToString();
	}
}
```


## Tests

### PaddedTextTest.cs

```csharp

using System;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;

[TestClass]
public class PaddedTextTest
{
	[TestMethod]
	public void PaddedText_No_Spacing_Returns_Text_Only()
	{
		var pt = new PaddedText
		{
			Text = "A"
		};

		Assert.AreEqual("A", pt.ToString());
	}

	[TestMethod]
	public void PaddedText_External_Spacing_Returns_Centered_Text()
	{
		var pt = new PaddedText
		{
			Text = "A",
			ExternalSpacing = 5
		};

		string output = pt.ToString();

		Assert.AreEqual(10, CountChars(output, pt.SpaceCharacter));
		Assert.AreEqual(1, CountChars(output, 'A'));
	}

	[TestMethod]
	public void PaddedText_Fully_Spaced_Returns_Repeated_Centered_Text()
	{
		var pt = new PaddedText
		{
			Text = "A",
			ExternalSpacing = 5,
			InternalSpacing = 2
		};

		string output = pt.ToString();

		Assert.AreEqual(12, CountChars(output, pt.SpaceCharacter));
		Assert.AreEqual(2, CountChars(output, 'A'));
	}


	public static int CountChars(string text, char toCount)
	{
		return text.Count(x => x.CompareTo(toCount) == 0);
	}
}

```

### TextDiamondTest.cs

```csharp
using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;

[TestClass]
public class TextDiamondTest
{
	[TestMethod]
	public void TextDiamond_Places_Are_Zero_Based()
	{
		var td = new TextDiamond();

		Assert.AreEqual(0, td.PlaceInAlphabet('A'));
		Assert.AreEqual(25, td.PlaceInAlphabet('Z'));
	}

	[TestMethod]
	public void TextDiamond_Letters_Are_Case_Insensitive()
	{
		var td = new TextDiamond();

		Assert.AreEqual(0, td.PlaceInAlphabet('a'));
	}

	[TestMethod]
	public void TextDiamond_BuildDiamond_Returns_Full_Diamond_From_Triangle()
	{
		const char SpaceChar = 'X';
		
		var list = new List<PaddedText>();

		list.Add(new PaddedText { ExternalSpacing = 2, InternalSpacing = 0, Text = "A", SpaceCharacter = SpaceChar });
		list.Add(new PaddedText { ExternalSpacing = 1, InternalSpacing = 1, Text = "B", SpaceCharacter = SpaceChar });
		list.Add(new PaddedText { ExternalSpacing = 0, InternalSpacing = 3, Text = "C", SpaceCharacter = SpaceChar });

		var td = new TextDiamond { SpaceCharacter = SpaceChar };

		string output = td.BuildDiamond(list);

		Assert.AreEqual(2, PaddedTextTest.CountChars(output, 'A'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'B'));
		Assert.AreEqual(2, PaddedTextTest.CountChars(output, 'C'));
		Assert.AreEqual(17, PaddedTextTest.CountChars(output, td.SpaceCharacter));
	}

	[TestMethod]
	public void TextDiamond_A_Returns_Single_String()
	{
		var td = new TextDiamond
		{
			HighCharacter = 'A',
			SpaceCharacter = ' '
		};

		string output = td.ToString();

		Assert.AreEqual(1, PaddedTextTest.CountChars(output, 'A'));
		Assert.AreEqual(0, PaddedTextTest.CountChars(output, 'B'));
		Assert.AreEqual(0, PaddedTextTest.CountChars(output, 'C'));
		Assert.AreEqual(0, PaddedTextTest.CountChars(output, td.SpaceCharacter));
		Assert.AreEqual(2, PaddedTextTest.CountChars(output, '\n'));
	}

	[TestMethod]
	public void TextDiamond_Is_Case_Insensitive()
	{
		var td = new TextDiamond
		{
			HighCharacter = 'a',
			SpaceCharacter = ' '
		};

		string output = td.ToString();

		Assert.AreEqual(1, PaddedTextTest.CountChars(output, 'A'));
	}

	[TestMethod]
	public void TextDiamond_B_Returns_ABBA_String()
	{
		var td = new TextDiamond
		{
			HighCharacter = 'B',
			SpaceCharacter = ' '
		};

		string output = td.ToString();

		Assert.AreEqual(2, PaddedTextTest.CountChars(output, 'A'));
		Assert.AreEqual(2, PaddedTextTest.CountChars(output, 'B'));
		Assert.AreEqual(0, PaddedTextTest.CountChars(output, 'C'));
		Assert.AreEqual(5, PaddedTextTest.CountChars(output, td.SpaceCharacter));
		Assert.AreEqual(3, PaddedTextTest.CountChars(output, '\n'));
	}

	[TestMethod]
	public void TextDiamond_C_Returns_ABCCBA_String()
	{
		var td = new TextDiamond
		{
			HighCharacter = 'C',
			SpaceCharacter = ' '
		};

		string output = td.ToString();

		Assert.AreEqual(2, PaddedTextTest.CountChars(output, 'A'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'B'));
		Assert.AreEqual(2, PaddedTextTest.CountChars(output, 'C'));
		Assert.AreEqual(17, PaddedTextTest.CountChars(output, td.SpaceCharacter));
		Assert.AreEqual(5, PaddedTextTest.CountChars(output, '\n'));
	}

	[TestMethod]
	public void TextDiamond_Z_Returns_Full_Diamond_String()
	{
		var td = new TextDiamond
		{
			HighCharacter = 'Z',
			SpaceCharacter = ' '
		};

		string output = td.ToString();

		Assert.AreEqual(2, PaddedTextTest.CountChars(output, 'A'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'B'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'C'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'D'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'E'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'F'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'G'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'H'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'I'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'J'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'K'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'L'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'M'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'N'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'O'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'P'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'Q'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'R'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'S'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'T'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'U'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'V'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'W'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'X'));
		Assert.AreEqual(4, PaddedTextTest.CountChars(output, 'Y'));
		Assert.AreEqual(2, PaddedTextTest.CountChars(output, 'Z'));

		Assert.AreEqual(2501, PaddedTextTest.CountChars(output, td.SpaceCharacter));
		Assert.AreEqual(51, PaddedTextTest.CountChars(output, '\n'));
	}
}

```
