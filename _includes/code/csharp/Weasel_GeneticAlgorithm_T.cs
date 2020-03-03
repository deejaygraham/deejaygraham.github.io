public class GeneticAlgorithm<T>
{
    public event EventHandler<InitialConditionEventArgs<T>> Start;

    public event EventHandler<FitnessProgressEventArgs<T>> Progress;

    public event EventHandler<FinalConditionEventArgs<T>> Finish;

    public IPopulationFactory<T> Population { get; set; }

    public IMatchesTarget<T> TargetMatch { get; set; }

    public IMutator<T> Mutator { get; set; }

    public IFitnessScore<T> FitnessScore { get; set; }

    public GeneticAlgorithm()
    {
        this.PopulationSize = 100;
        this.MutationRate = 0.05;
        this.GenerationLimit = 100;
    }

    public int PopulationSize { get; set; }

    public double MutationRate { get; set; }

    public int GenerationLimit { get; set; }

    public void Run()
    {
        T parent = this.Population.Create();

        if (this.Start != null)
            this.Start(this, new InitialConditionEventArgs<T>(parent, this.FitnessScore.Score(parent)));

        int attempt = 0;

        while (!this.TargetMatch.MatchesTarget(parent) && attempt < GenerationLimit)
        {
            // Create C mutated strings + the current parent.
            var candidates = (from child in Enumerable.Repeat(parent, PopulationSize)
                              select this.Mutator.Mutate(child, MutationRate))
                              .Concat(Enumerable.Repeat(parent, 1));

            // Sort the strings by the fitness function.
            var sorted = from candidate in candidates
                         orderby this.FitnessScore.Score(candidate) descending
                         select candidate;

            // New parent is the most fit candidate.
            parent = sorted.First();

            ++attempt;

            if (this.Progress != null)
                this.Progress(this, new FitnessProgressEventArgs<T>(attempt, parent, this.FitnessScore.Score(parent)));
        }

        if (this.Finish != null)
            this.Finish(this, new FinalConditionEventArgs<T>(attempt, parent, this.FitnessScore.Score(parent)));
    }
}
