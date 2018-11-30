using NewtonSoft.Json;
using Microsoft.ServiceBus.Messaging;

...

// Connection data from the Azure portal
string connectionString = "Endpoint=sb://my-environment.servicebus.windows.net/;SharedAccessKeyName=MyEventHub;SharedAccessKey=ThisIsNotAKey=";
string eventHubName = "my-event-hub";

var client = EventHubClient.CreateFromConnectionString(connectionString, eventHubName);

// send a single piece of data.
string json = JsonConvert.SerializeObject(new ApplicationSpecificEvent
											{
												Value = thisIsMyValue,
												Timestamp = DateTime.UtcNow
											});

client.Send(new EventData(Encoding.Default.GetBytes(json)));
