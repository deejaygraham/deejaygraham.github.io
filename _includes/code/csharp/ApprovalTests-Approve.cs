    
public static class Approve
{
    public static void Instance(object instance, string hint = null)
    {
        // improve this path handling
        string workingFolder = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
        string approvalsFolder = Path.Combine(workingFolder, "Approvals");

        if (!Directory.Exists(approvalsFolder))
            Directory.CreateDirectory(approvalsFolder);

        string goldenImagePath = GeneratePath(approvalsFolder, instance.GetType(), hint, "expected");

        if (!File.Exists(goldenImagePath))
        {
            // no approval yet, nothing to compare against - 
            // save this as the golden copy and return
            var snapshot = new InstanceSnapshot(instance);
            File.WriteAllText(goldenImagePath, snapshot.ToString());
        }
        else
        {
            // load golden image
            List<string> goldenFileContent = new List<string>(File.ReadAllLines(goldenImagePath));
            var goldenImage = new InstanceSnapshot(goldenFileContent);

            // save actual image for investigation later.
            string actualImagePath = GeneratePath(approvalsFolder, instance.GetType(), hint, "actual");

            var actual = new InstanceSnapshot(instance);
            File.WriteAllText(actualImagePath, actual.ToString());

            // compare and report
            var diffs = goldenImage.CompareTo(actual);

            if (diffs.Any())
            {
                Assert.Multiple(() =>
                {
                    foreach (var difference in diffs)
                    {
                        Assert.That(difference.Actual, Is.EqualTo(difference.Expected), difference.Name);
                    }
                });
            }
        }
    }

    private static string GeneratePath(string baseFolder, Type type, string hint, string caseName)
    {
        StringBuilder fileName = new StringBuilder();

        fileName.Append(type.FullName);

        if (!String.IsNullOrEmpty(hint))
            fileName.AppendFormat(".{0}", hint);

        fileName.AppendFormat(".{0}.txt", caseName);
        
        return System.IO.Path.Combine(baseFolder, fileName.ToString());
    }
}
    
var alice = new Person("Alice");
Approve.Instance(alice, "After Create");

alice.GoToJob();
Approve.Instance(alice, "At Work");
