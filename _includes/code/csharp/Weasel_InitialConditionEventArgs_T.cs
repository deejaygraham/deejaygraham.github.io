public class InitialConditionEventArgs<T> : EventArgs
{
    public InitialConditionEventArgs(T initial, int score)
    {
        this.InitialCondition = initial;
        this.Score = score;
    }

    public T InitialCondition { get; set; }

    public int Score { get; set; }
}