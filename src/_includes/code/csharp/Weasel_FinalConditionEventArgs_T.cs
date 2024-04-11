public class FinalConditionEventArgs<T> : EventArgs
{
    public FinalConditionEventArgs(int attempt, T final, int score)
    {
        this.Generation = attempt;
        this.FinalCondition = final;
        this.Score = score;
    }

    public int Generation { get; set; }

    public T FinalCondition { get; set; }

    public int Score { get; set; }
}
