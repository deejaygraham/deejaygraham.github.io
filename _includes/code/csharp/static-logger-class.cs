
// made up logging example.
public static class Logger
{
	private static EventLog _loggerInstance;
	
	static Logger()
	{	
		// create instances, open files, make network calls....
		_loggerInstance = new EventLog();
	}
	
	public static void Log(string message)
	{	
		_loggerInstance.Log(message, Information);
	}
}

...

// used like this...

Logger.Log("Hello world");

