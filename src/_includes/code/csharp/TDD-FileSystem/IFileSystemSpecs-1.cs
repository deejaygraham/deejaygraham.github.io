ipublic class IFileSystemSpecs
{
    [Test]
    public void IFileSystem_Reports_Existing_Path_Exists()
    {
        IFileSystem fs = Substitute.For<IFileSystem>();
        fs.DirectoryExists(@"c:\Windows").Returns(true);
        fs.DirectoryExists(@"c:\users").Returns(false);

        Assert.That(fs.DirectoryExists(@"c:\Windows"), Is.True);
        Assert.That(fs.DirectoryExists(@"c:\users"), Is.False);
    }
}
