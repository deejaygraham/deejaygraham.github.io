[TestFixture]
public class SoundexTests
{
	[Test]
	[TestCase("Robert", "Rupert")]
	[TestCase("Campbel", "Cammmppppbbbeeelll")]
	[TestCase("Ravi", "Ravee")]
	public void Soundex_Similar_Sounding_Words_Give_Identical_Scores(string word1, string word2)
	{
		Assert.AreEqual(word1.ToSoundex(), word2.ToSoundex());
	}

	[Test]
	[TestCase("Rupert", "Rubin")]
	public void Soundex_Different_Sounding_Words_Give_Different_Scores(string word1, string word2)
	{
		Assert.AreNotEqual(word1.ToSoundex(), word2.ToSoundex());
	}

	[Test]
	[TestCase("Donald", "D543")]
	[TestCase("Zach", "Z200")]
	[TestCase("David", "D130")]
	[TestCase("Ashcraft", "A261")]
	[TestCase("Ashcroft", "A261")]
	[TestCase("Tymczak", "T520")]
	[TestCase("Honeyman", "H500")]
	public void Soundex_Word_Encodes_Correctly(string word, string encoding)
	{
		Assert.AreEqual(encoding, word.ToSoundex());
	}
}
