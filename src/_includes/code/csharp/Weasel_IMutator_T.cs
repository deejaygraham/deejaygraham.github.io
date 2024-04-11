public interface IMutator<T>
{
    T Mutate(T instance, double rate);
}