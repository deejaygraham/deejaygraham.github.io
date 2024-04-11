boxes.Sort(Box.CompareBySizeDescending);

var defraggedBins = new List<Bin>();

int binCount = 1;

// add first bin, definitely will need.
defraggedBins.Add(new Bin 
{ 
    Id = binCount.ToString() 
});

foreach (var box in boxes)
{
    Bin firstAvailableBin = defraggedBins.FirstOrDefault(x => box.WillFitInto(x));

    if (firstAvailableBin == null)
    {
        // nothing big enough, add a new bin.
        binCount++;
        firstAvailableBin = new Bin 
                            { 
                                Id = binCount.ToString() 
                            };

        defraggedBins.Add(firstAvailableBin);
        Console.WriteLine("Adding new Bin {0}", firstAvailableBin);
    }

    firstAvailableBin.Add(box);
}

PrintStats(defraggedBins);
