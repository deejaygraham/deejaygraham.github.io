public class FitnessProgressEventArgs<T> : EventArgs
{
    public FitnessProgressEventArgs(int attempt, T best, int score)
    {
        this.Generation = attempt;
        this.Best = best;
        this.Score = score;
    }

    public int Generation { get; set; }

    public T Best { get; set; }

    public int Score { get; set; }
}