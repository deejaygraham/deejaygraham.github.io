foreach (var box in boxes)
{
    Console.WriteLine("Fitting Box {0}", box);

    bool foundSpace = false;

    for (int attempt = 0; attempt < 10; ++attempt)
    {
        int binNumber = random.Next(originalBins.Count);
        var chosenBin = originalBins[binNumber];

        Console.WriteLine("Trying Bin {0}", chosenBin);

        if (chosenBin.CanFit(box))
        {
            Console.WriteLine("Adding to Bin");
            chosenBin.Add(box);
            foundSpace = true;
            break;
        }
    }

    if (!foundSpace)
    {
        originalBins.Add(new Bin
        {
            Id = originalBins.Count.ToString()
        });
    }
}

// now remove all that are completely empty...
originalBins.RemoveAll(x => x.AllocatedSpace == 0);
