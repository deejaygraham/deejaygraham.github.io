public static class TextSimilarity
{
	// Using Levenshtein Distance technique.
	// For algorithm see : http://en.wikipedia.org/wiki/Levenshtein_distance
	// adapted from http://www.codeproject.com/Articles/13525/Fast-memory-efficient-Levenshtein-algorithm
	public static int DifferenceBetween(object s, object t)
	{
		string first = s.ToString();
		string second = t.ToString();

		// degenerate cases
		if (first == second) return 0;
		if (first.Length == 0) return second.Length;
		if (second.Length == 0) return first.Length;

		// create two work vectors of integer distances
		// initialize the previous row of distance)
		// this row is A[0][i]: edit distance for an empty s
		// the distance is just the number of characters to delete from t
		List<int> previousRow = new List<int>(Enumerable.Range(0, second.Length + 1));
		List<int> currentRow = new List<int>(Enumerable.Repeat(0, second.Length + 1));

		int indexInFirst = 0;

		foreach(var characterFromFirst in first)
		{
			// calculate current row distances from the previous row
			// edit distance is delete (i+1) chars from first to match empty second
			currentRow[0] = indexInFirst + 1;

			int indexInSecond = 0;

			// use formula to fill in the rest of the row
			foreach(var characterFromSecond in second)
			{
				var cost = (characterFromFirst == characterFromSecond) ? 0 : 1;

				int[] candidatesForLeastCost = 
				{ 
					currentRow[indexInSecond] + 1, 
					previousRow[indexInSecond + 1] + 1, 
					previousRow[indexInSecond] + cost 
				};

				currentRow[indexInSecond + 1] = candidatesForLeastCost.Min(); 

				++indexInSecond;
			}

			// copy current row to previous row for next iteration
			previousRow = new List<int>(currentRow);

			++indexInFirst;
		}

		return currentRow[second.Length];
	}
}