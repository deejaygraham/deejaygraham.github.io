/// <summary>
/// instance based, unit-testable
/// </summary>
class TelemetryService
{
    private ITelemetryService service;

    public TelemetryService()
    {
        this.service = new ConcreteTelemetryService();
    }

    public void Send(string message)
    {
        service.Send(message);
    }
}

class TelemetryServiceFactory
{
    private static TelemetryService _service = InitializeTelemetryService();

    private static TelemetryService InitializeTelemetryService()
    {
        return new TelemetryService();
    }

    public static TelemetryService Instance
    {
        get
        {
            return _service;
        }
    }
}

class Program
{
    static void Main(string[] args)
    {
        TelemetryServiceFactory.Instance.Send("hello world");
    }

}
