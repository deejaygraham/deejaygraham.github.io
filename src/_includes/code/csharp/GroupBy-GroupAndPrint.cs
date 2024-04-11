IEnumerable<IGrouping<DogKey, Dog>> query = dogs.GroupBy(pet => 
    new DogKey { Age = pet.Age, Breed = pet.Breed }, 
    new GroupByBreed());

foreach (IGrouping<DogKey, Dog> petGroup in query)
{
    Console.WriteLine("\t{0}", petGroup.Key.Breed);
    Console.WriteLine("\t-------------------------");

    foreach (Dog pet in petGroup)
        Console.WriteLine("\t\t{0}", pet.Name);

    Console.WriteLine();
}
