    public ObjectMetadata(IEnumerable<string> lines)
    {
        this.Name = lines.FirstOrDefault();
        this.Values = new SortedDictionary<string, string>();

        foreach(string line in lines.Skip(1).Where (x => !String.IsNullOrEmpty(x)))
        {
            int colonPosition = line.IndexOf(":");
            string key = line.Substring(0, colonPosition).Trim();
            string value = line.Substring(colonPosition + 1).Trim();
            this.Values.Add(key, value);
        }
    }
