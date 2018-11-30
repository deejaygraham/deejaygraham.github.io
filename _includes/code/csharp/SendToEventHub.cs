using NewtonSoft.Json;
using Microsoft.ServiceBus.Messaging;

...

// Connection data taken from the Azure portal
const string endpoint = "sb://my-environment.servicebus.windows.net/";
const string eventHubName = "my-event-hub";
const string SAKName = "MyEventHub";
const string SAKSecret = "ThisIsNotAKey=";

string connectionString = string.Format("Endpoint={0};SharedAccessKeyName={1};SharedAccessKey={2}",
									SAKName,
									SAKSecret,
									endpoint);
									
var client = EventHubClient.CreateFromConnectionString(connectionString, eventHubName);

var message = new ApplicationSpecificEvent
{
	Value = thisIsMyValue,
	Timestamp = DateTime.UtcNow
};

string json = JsonConvert.SerializeObject(message);
client.Send(new EventData(Encoding.Default.GetBytes(json)));
