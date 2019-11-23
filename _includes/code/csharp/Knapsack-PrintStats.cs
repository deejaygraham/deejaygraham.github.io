private static void PrintStats(IEnumerable<Bin> bins)
{
    foreach (var bin in bins)
    {
        Console.WriteLine();
        Console.WriteLine("Bin {0}", bin.Id);
        Console.WriteLine("--------");

        Console.WriteLine("Used {0} Free {1}", bin.AllocatedSpace, bin.FreeSpace);

        Console.WriteLine();

        foreach (var site in bin.Contents)
        {
            Console.WriteLine("\tBin {0} Size {1}", site.Id, site.Size);
        }
    }

    Console.WriteLine("{0} Bins", bins.Count());

    Console.WriteLine("Allocations:");
    int fullyAllocated = bins.Count(x => x.FreeSpace == 0);
    int partiallyAllocated = bins.Count(x => x.FreeSpace > 0 && x.AllocatedSpace > 0);
    int unallocated = bins.Count(x => x.AllocatedSpace == 0);
    Console.WriteLine("Fully {0} bins", fullyAllocated);
    Console.WriteLine("Partly {0} bins", partiallyAllocated);
    Console.WriteLine("Free {0} bins", unallocated);

    int boxes = bins.Sum(x => x.Contents.Count());

    Console.WriteLine("Wastage:");
    int waste = bins.Sum(x => x.FreeSpace);
    Console.WriteLine("{0} units", waste);
}
