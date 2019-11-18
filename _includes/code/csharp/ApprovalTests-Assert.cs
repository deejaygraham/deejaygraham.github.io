    
    var alice = new Person("Alice");
    var goldenImage = new InstanceSnapshot(alice);

    var bob = new Person("Bob");
    var imageToApprove = new InstanceSnapshot(bob);

    var diffs = goldenImage.CompareTo(imageToApprove);

    if (diffs.Any())
    {
        Assert.Multiple(() =>
        {
            foreach(var difference in diffs)
            {
                Assert.That(difference.Actual, Is.EqualTo(difference.Expected), difference.Name);
            }
        });
    }
