public class GroupByBreed : IEqualityComparer<DogKey>
{
    public bool Equals(DogKey x, DogKey y)
    {
        return x.Breed.CompareTo(y.Breed) == 0;
    }

    public int GetHashCode(DogKey obj)
    {
        return 0;
    }
}

public class GroupByAge : IEqualityComparer<DogKey>
{
    public bool Equals(DogKey x, DogKey y)
    {
        return x.Age == y.Age;
    }

    public int GetHashCode(DogKey obj)
    {
        return 0;
    }
}
