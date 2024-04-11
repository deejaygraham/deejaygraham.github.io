/// <summary>
/// Integration test version, reads from local cscfg
/// </summary>
public class LocalCloudConfigRoleSettings : IRoleSettings
{
    private Dictionary<string, string> nameValuePairs = new Dictionary<string, string>();

    public static LocalCloudConfigRoleSettings FromCloudConfig(string path, string roleName)
    {
        LocalCloudConfigRoleSettings settings = new LocalCloudConfigRoleSettings();

        XElement doc = XElement.Load(path);

        const string RoleElement = "Role";
        const string NameAttribute = "name";

        // namespace for cscfgs
        XNamespace scns = "http://schemas.microsoft.com/ServiceHosting/2008/10/ServiceConfiguration";

        // find the correct role
        XElement requiredRole = (from role in doc.Descendants(scns + RoleElement)
                                 where (string)role.Attribute(NameAttribute) == roleName
                                 select role).FirstOrDefault();

        if (requiredRole != null)
        {
            const string SettingElement = "Setting";
            const string ValueAttribute = "value";

            // import each name value pair
            foreach (XElement setting in requiredRole.Descendants(scns + SettingElement))
            {
                XAttribute name = setting.Attributes(NameAttribute).FirstOrDefault();
                XAttribute value = setting.Attributes(ValueAttribute).FirstOrDefault();

                if (name != null && value != null)
                {
                    settings.nameValuePairs.Add(name.Value, value.Value);
                }
            }
        }

        return settings;
    }

    public string ReadValue(string key)
    {
        return this.nameValuePairs[key];
    }
}
