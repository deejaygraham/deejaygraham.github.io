public class WeaselPopulationFactory : IPopulationFactory<string>
{
    private Random _rng;

    public WeaselPopulationFactory(int length)
    {
        this.Length = length;
        this._rng = new Random((int)DateTime.Now.Ticks);
    }

    private int Length { get; set; }

    public string Create()
    {
        return this._rng.NextString(this.Length);
    }

    public Collection<string> Create(int populationSize)
    {
        throw new NotImplementedException();
    }

    public Collection<string> CreateFrom(Collection<string> generation)
    {
        throw new NotImplementedException();
    }
}