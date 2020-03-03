public class WeaselMutator : IMutator<string>
{
    private Random _rng;

    public WeaselMutator()
    {
        this._rng = new Random((int)DateTime.Now.Ticks);
    }

    public string Mutate(string current, double rate)
    {
        return String.Join("", from c in current
                               select _rng.NextDouble() <= rate ? _rng.NextCharacter() : c);
    }
}