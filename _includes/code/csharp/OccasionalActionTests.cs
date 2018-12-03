[Test]
public void OccasionalAction_Always_Executed_First_Time()
{
	bool actionCalled = false;

	OccasionalAction action = new OccasionalAction(() =>
	{
		actionCalled = true;
	},
	TimeSpan.FromDays(1));

	action.Run();

	Assert.IsTrue(actionCalled);
}

[Test]
public void OccasionalAction_Executes_Once_For_Long_Frequency()
{
	int callCount = 0;

	OccasionalAction action = new OccasionalAction(() =>
	{
		callCount++;
	},
	TimeSpan.FromDays(365));

	for(int i = 0; i < 10; ++i)
		action.Run();

	Assert.AreEqual(1, callCount);
}

[Test]
public void OccasionalAction_Executes_Multiply_For_Short_Frequency()
{
	int callCount = 0;

	OccasionalAction action = new OccasionalAction(() =>
	{
		callCount++;
	},
	TimeSpan.FromMilliseconds(1));

	for (int i = 0; i < 10; ++i)
	{
		action.Run();
		System.Threading.Thread.Sleep(TimeSpan.FromMilliseconds(10));
	}

	Assert.AreEqual(10, callCount);
}


[Test]
public void OccasionalAction_Future_Action_Not_Run_First_Time()
{
	bool actionCalled = false;

	OccasionalAction action = new OccasionalAction(() =>
	{
		actionCalled = true;
	},
	TimeSpan.FromDays(1),
	DateTime.Now.AddHours(1));

	action.Run();

	Assert.IsFalse(actionCalled);
}
