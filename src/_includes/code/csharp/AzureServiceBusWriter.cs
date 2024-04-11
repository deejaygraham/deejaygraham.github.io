using Microsoft.ServiceBus;
using Microsoft.ServiceBus.Messaging;
using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Sending Messages");

        string connectionString = "<Your Endpoint Here>";
        string queueName = "sample-queue";

        var nsm = NamespaceManager.CreateFromConnectionString(connectionString);

        if (!nsm.QueueExists(queueName))
        {
            QueueDescription description = new QueueDescription(queueName);
            nsm.CreateQueue(description);
        }

        MessagingFactory factory = MessagingFactory.CreateFromConnectionString(connectionString);
        MessageSender messageSender = factory.CreateMessageSender(queueName);

        const int TotalMessages = 100;

        Random randomWait = new Random();

        for (int i = 0; i < TotalMessages; ++i)
        {
            string messageText = string.Format("Message {0}", i + 1);
            Console.WriteLine("Sending message " + messageText);

            BrokeredMessage message = new BrokeredMessage(messageText);
            message.Properties.Add("Say", ((i % 2) == 0) ? "hello" : "goodbye");

            messageSender.Send(message);

            TimeSpan wait = TimeSpan.FromSeconds(randomWait.Next(1, 10));

            Console.WriteLine("Waiting for " + wait);
            System.Threading.Thread.Sleep(wait);
        }

        Console.WriteLine("Done, press a key to continue...");
        Console.ReadKey();
    }
}