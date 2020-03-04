// Ms Test example
[TestClass]
public class ConfusedConcernsGodClass
{
    public int MixedConcerns()
    {
        // horrible code here
        return 75;
    }

    // First test method 
    [TestMethod]
    public void MixedConcerns_Always_Returns_75()
    {
        Assert.AreEqual(75, this.MixedConcerns());
    }
}