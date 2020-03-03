class Program
{

    static void Main(string[] args)
    {
        GeneticAlgorithm<string> algo = new GeneticAlgorithm<string>
        {
            PopulationSize = 100,
            MutationRate = 0.05,
            GenerationLimit = 100
        };

        string target = "METHINKS IT IS LIKE A WEASEL";

        algo.Mutator = new WeaselMutator();

        var scorer = new WeaselFitnessScore(target);
        algo.FitnessScore = scorer;
        algo.TargetMatch = scorer;

        algo.Population = new WeaselPopulationFactory(target.Length);

        algo.Start += (obj, e) =>
        {
            Console.WriteLine("START:       {0,20} fitness: {1}", e.InitialCondition, e.Score);
        };

        algo.Progress += (obj, e) =>
        {
            Console.WriteLine("     #{0,6} {1,20} fitness: {2}", e.Generation, e.Best, e.Score);
        };

        algo.Finish += (obj, e) =>
        {
            Console.WriteLine("END: #{0,6} {1,20}", e.Generation, e.FinalCondition);
        };

        //const string target = "METHINKS IT IS LIKE A WEASEL";

        algo.Run();

        Console.ReadKey();
    }
}