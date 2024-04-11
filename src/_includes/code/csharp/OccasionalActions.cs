public class OccasionalActions
{
	private List<OccasionalAction> actions = new List<OccasionalAction>();

	public void Add(OccasionalAction action)
	{
		this.actions.Add(action);
	}

	public void Add(Action a, TimeSpan frequency)
	{
		this.Add(new OccasionalAction(a, frequency));
	}

	public void Run()
	{
		this.actions.ForEach(x => x.Run());
	}
}
