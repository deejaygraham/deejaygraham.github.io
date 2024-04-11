public static class SoundexExtension
{
	const int NotFound = -1;
	const int SoundexLength = 4;
	const char PaddingChar = '0';

	public static string ToSoundex(this string text)
	{
		if (string.IsNullOrEmpty(text)) return string.Empty.PadRight(SoundexLength, PaddingChar); 

		var encoded = new StringBuilder();

		// keep first letter 
		encoded.Append(text.First());

		int encodeValue = NotFound;
		int lastValue = NotFound;

		foreach(char letter in text.ToLower().Skip(1))
		{
			encodeValue = MapCharToSoundexCode(letter);

			if (encodeValue != NotFound && encodeValue != lastValue)
				encoded.Append(encodeValue);

			if (encoded.Length >= SoundexLength)
				break;

			if (encodeValue != NotFound)
				lastValue = encodeValue;
		}

		if (encoded.Length < SoundexLength)
		{
			encoded.Append(PaddingChar, SoundexLength - encoded.Length);
		}

		return encoded.ToString().ToUpper();
	}

	private static int MapCharToSoundexCode(char letter)
	{
		if ("bfpv".Contains(letter)) return 1;
		if ("cgjkqsxz".Contains(letter)) return 2;
		if ("dt".Contains(letter)) return 3;
		if ("l".Contains(letter)) return 4;
		if ("mn".Contains(letter)) return 5;
		if ("r".Contains(letter)) return 6;

		return NotFound;
	}
}
