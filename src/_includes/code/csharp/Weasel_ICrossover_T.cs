public interface ICrossover<T>
{
    T Mutate(T instance, double rate);
}
