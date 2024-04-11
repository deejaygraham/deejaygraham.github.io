public interface IPopulationFactory<T>
{
    T Create();

    Collection<T> Create(int populationSize);

    Collection<T> CreateFrom(Collection<T> generation);
}