
public class InstanceLogger
{
	private readonly EventLog _eventLog;
	
	public InstanceLogger()
	{
		this._eventLog = new EventLog();
	}
	
	public void Log(string message)
	{
		this._eventLog.Log(message, Information);
	}
}

public static class Logger
{
	private static InstanceLogger _loggerInstance;
	
	static Logger()
	{	
		_loggerInstance = new InstanceLogger();
	}
	
	public static void Log(string message)
	{	
		_loggerInstance.Log(message);
	}
}
