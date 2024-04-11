public class LocalFileSystem : IFileSystem
{
    public bool DirectoryExists(string path)
    {
        return System.IO.Directory.Exists(path);
    }
}