Random random = new Random();

var boxes = new List<Box>();

for (int i = 0; i < 800; ++i)
{
    boxes.Add(new Box
    {
        Id = (i + 1).ToString(),
        Size = random.Next(1, Bin.BinSize + 1)
    });
}

int sizeOfAllBoxes = boxes.Sum(x => x.Size);
// since we are going to randomly assign them, let's make that 3 * as big as we need.
int originalRequiredBins = 3 * sizeOfAllBoxes;

var originalBins = new List<Bin>(originalRequiredBins);

for (int i = 0; i < originalRequiredBins; ++i)
{
    originalBins.Add(new Bin
    {
        Id = (i + 1).ToString()
    });
}

PrintStats(originalBins);

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
