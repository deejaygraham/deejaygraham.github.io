    public ICollection<SnapshotDifference> CompareTo(InstanceSnapshot other)
    {
        var differences = new List<SnapshotDifference>();

        var missingKeys = this.Values.Keys.Except(other.Values.Keys);

        if (missingKeys.Any())
        {
            foreach (var missingKey in missingKeys)
            {
                differences.Add(new SnapshotDifference
                {
                    Name = this.Name + "." + missingKey,
                    Expected = this.Values[missingKey],
                    Actual = "<Missing>"
                });
            }
        }

        var addedKeys = other.Values.Keys.Except(this.Values.Keys);

        if (addedKeys.Any())
        {
            foreach (var addedKey in addedKeys)
            {
                differences.Add(new SnapshotDifference
                {
                    Name = this.Name + "." + addedKey,
                    Expected = "<Missing>",
                    Actual = other.Values[addedKey]
                });
            }
        }

        var commonKeys = this.Values.Keys.Intersect(other.Values.Keys);

        if (commonKeys.Any())
        {
            foreach (var commonKey in commonKeys)
            {
                string expectedValue = this.Values[commonKey];
                string actualValue = other.Values[commonKey];

                if (String.Compare(expectedValue, actualValue, StringComparison.InvariantCulture) != 0)
                {
                    differences.Add(new SnapshotDifference
                    {
                        Name = this.Name + "." + commonKey,
                        Expected = expectedValue,
                        Actual = actualValue
                    });
                }
            }
        }

        return differences;
    }
