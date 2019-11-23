class TelemetryService
{
    private static ITelemetryService service;

    static TelemetryService()
    {
        // opportunity to throw from here?
        service = new ConcreteTelemetryService();
    }

    public static void Send(string message)
    {
        service.Send(message);
    }
}


class Program
{
    static void Main(string[] args)
    {
        TelemetryService.Send("hello world");
    }

}
