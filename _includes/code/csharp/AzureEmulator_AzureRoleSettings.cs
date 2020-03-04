/// <summary>
/// Deployed implementation
/// </summary>
public class AzureRoleSettings : IRoleSettings
{
    public string ReadValue(string key)
    {
        return RoleEnvironment.GetConfigurationSettingValue(key);
    }
}