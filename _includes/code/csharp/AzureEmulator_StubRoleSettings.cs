/// <summary>
/// Unit test version (or mock IRoleSettings)
/// </summary>
public class StubRoleSettings : IRoleSettings
{
    public Dictionary<string, string> nameValuePairs = new Dictionary<string, string>();

    public string ReadValue(string key)
    {
        return this.nameValuePairs[key];
    }
}