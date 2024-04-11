class Bin
{
    public static int BinSize = 4;

    public Bin()
    {
        this.Size = BinSize;
        this.Contents = new List<Box>();
    }

    public string Id { get; set; }

    public List<Box> Contents { get; set; }

    public int Size { get; set; }

    public override string ToString()
    {
        return $"{Id} {FreeSpace} of {Size}";
    }

    public bool CanFit(Box box)
    {
        return box.Size <= this.FreeSpace;
    }

    public void Add(Box box)
    {
        if (CanFit(box))
        {
            this.Contents.Add(box);
        }
    }
    
    public int AllocatedSpace
    {
        get
        {
            return this.Contents.Sum(s => s.Size);
        }
    }

    public int FreeSpace
    {
        get
        {
            return this.Size - this.AllocatedSpace;
        }
    }
}
