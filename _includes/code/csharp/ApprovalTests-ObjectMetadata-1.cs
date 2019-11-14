public class ObjectMetadata
{
    // build an instance of metdata from another object's 
    // public property values
    public ObjectMetadata(object instance)
    {
        this.Name = instance.ToString();
        this.Values = new SortedDictionary<string, string>();

        var type = instance.GetType();

        foreach (var property in type.GetProperties(BindingFlags.Public | BindingFlags.Instance))
        {
            if (property.CanRead)
            {
                string key = property.Name;
                string value = "<Unknown>";

                try
                {
                    object valueObj = property.GetValue(instance);

                    if (Object.ReferenceEquals(null, valueObj))
                    {
                        value = "<Null>";
                    }
                    else
                    {
                        value = valueObj.ToString();

                        if (String.IsNullOrEmpty(value))
                            value = "<Blank>";
                    }
                }
                catch
                {
                    value = "<Unknown>";
                }

                this.Values.Add(key, value);
            }
        }
    }

    public string Name { get; private set; }

    public IDictionary<string, string> Values { get; private set; }

    // simplest output format
    public override string ToString()
    {
        var builder = new StringBuilder();

        builder.AppendLine(this.Name);

        foreach (var key in this.Values.Keys)
            builder.AppendFormat("{0} : {1}\r\n", key, this.Values[key]);

        return builder.ToString();
    }
}
