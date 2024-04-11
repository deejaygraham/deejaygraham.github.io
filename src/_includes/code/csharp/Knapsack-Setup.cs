Random random = new Random();

var boxes = new List<Box>();

for (int i = 0; i < 800; ++i)
{
    // allocate a random size to each box.
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
