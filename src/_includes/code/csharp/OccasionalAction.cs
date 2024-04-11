public class OccasionalAction
{
	private DateTime nextRun;
	private TimeSpan frequency;

	private Action action;

	public OccasionalAction(Action a, TimeSpan freq)
		: this(a, freq, DateTime.MinValue)
	{
	}

	public OccasionalAction(Action a, TimeSpan freq, DateTime future)
	{
		this.action = a;
		this.frequency = freq;
		this.nextRun = future;
	}

	public void Run()
	{
		if (RunNow())
		{
			this.action();
			this.nextRun = DateTime.UtcNow + this.frequency;
		}
	}

	protected virtual bool RunNow()
	{
		return (DateTime.UtcNow > this.nextRun);
	}
}
