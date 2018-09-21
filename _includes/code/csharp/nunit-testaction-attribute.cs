using NUnit.Framework;

... 

[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class | AttributeTargets.Assembly, AllowMultiple = true)]
public class CommonTestHousekeepingAttribute : Attribute, ITestAction
{
	public ActionTargets Targets
	{
		get { return ActionTargets.Default; }
	}

	public void BeforeTest(TestDetails testDetails)
	{
        // do stuff here 
		// ...
		
		if (NotAbleToDoTheThingIWasSupposedToDo)
		{
			// report an error back to the NUnit framework
			throw new ApplicationException("Could not do the thing");
		}
	}

	public void AfterTest(TestDetails testDetails)
	{
        // do stuff here 
		// ...
	}
}

