using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

public class NegativesNotAllowedException : Exception
{
}

/// <summary>
/// Calculators the sum of up to two numbers in a formatted string
/// </summary>
public class StringCalculator
{
	/// <summary>
	/// Examples: 
	///		Empty string returns 0.
	///		"1" returns 1
	///		"1,2" returns 3
	///		"1\n2,3" returns 6
	///		Negative numbers throw a NegativesNotAllowed exception
	/// </summary>
	/// <param name="numbers"></param>
	/// <returns></returns>
	public int Add(string numbers)
	{
		int sum = 0;

		if (!string.IsNullOrWhiteSpace(numbers))
		{
			var splits = numbers.Split(new char[] { ',', '\n' });

			foreach (string number in splits)
			{
				int newNumber = 0;

				try
				{
					newNumber = Convert.ToInt32(number);
				}
				catch (FormatException)
				{
					newNumber = 0;
				}

				if (newNumber < 0)
				{
					throw new NegativesNotAllowedException();
				}

				sum += newNumber;
			}
		}

		return sum;
	}
}