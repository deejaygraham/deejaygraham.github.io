public class WeaselFitnessScore : IFitnessScore<string>, IMatchesTarget<string>
{
    public WeaselFitnessScore(string target)
    {
        this.Target = target;
    }

    public string Target { get; set; }

    public int Score(string current)
    {
        return this.Target.Zip(current, (a, b) => a == b ? 1 : 0).Sum();
    }

    public bool MatchesTarget(string instance)
    {
        return this.Target == instance;
    }
}
