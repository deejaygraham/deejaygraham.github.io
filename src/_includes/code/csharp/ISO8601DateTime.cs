
public static string ToISO8601(this DateTime dt)
{	
	return dt.ToString("yyyy-MM-dd hhmmss");
}

public static string ToISO8601Ex(this DateTime dt)
{	
	return dt.ToString("yyyy-MM-dd hh:mm:ss");
}
