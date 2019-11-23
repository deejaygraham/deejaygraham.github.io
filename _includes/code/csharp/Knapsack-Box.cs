class Box
{
    public string Id { get; set; }

    public int Size { get; set; }

    public override string ToString()
    {
        return $"{Id} {Size}";
    }

    public bool WillFitInto(Bin bin)
    {
        return this.Size <= bin.FreeSpace;
    }

    public static int CompareBySizeDescending(Box x, Box y)
    {
        return y.Size.CompareTo(x.Size);
    }
}
