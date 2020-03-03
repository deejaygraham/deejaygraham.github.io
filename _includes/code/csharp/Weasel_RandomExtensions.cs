public static class RandomExtensions
{
    public static char NextCharacter(this Random self)
    {
        const string AllowedChars = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return AllowedChars[self.Next() % AllowedChars.Length];
    }

    public static string NextString(this Random self, int length)
    {
        return String.Join("", Enumerable.Repeat(' ', length)
            .Select(c => self.NextCharacter()));
    }
}