using Microsoft.ServiceBus.Messaging;
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Retrieving Messages...");

        string connectionString = "<Your Endpoint Here>";
        string queueName = "sample-queue";

        MessagingFactory factory = MessagingFactory.CreateFromConnectionString(connectionString);
        MessageReceiver messageReceiver = factory.CreateMessageReceiver(queueName, ReceiveMode.PeekLock);

        List<long> deferredMessages = new List<long>();

        Random randomWait = new Random();

        while (true)
        {
            try
            {
                if (deferredMessages.Any())
                {
                    Console.WriteLine("Processing deferred messages...");

                    foreach (long sequenceNumber in deferredMessages)
                    {
                        using (BrokeredMessage retrievedMessage = messageReceiver.Receive(sequenceNumber))
                        {
                            if (retrievedMessage != null)
                            {
                                if (retrievedMessage.Properties.ContainsKey("Say"))
                                {
                                    Console.WriteLine(retrievedMessage.Properties["Say"].ToString());
                                }

                                retrievedMessage.Complete();
                            }
                        }
                    }

                    deferredMessages.Clear();
                }

                using (BrokeredMessage originalMessage = messageReceiver.Receive(TimeSpan.FromSeconds(1)))
                {
                    try
                    {
                        if (originalMessage != null)
                        {
                            // defer some messages
                            if ((originalMessage.SequenceNumber % 2) == 0)
                            {
                                Console.WriteLine("{0} - Deferred", originalMessage.SequenceNumber);
                                originalMessage.Defer();
                                deferredMessages.Add(originalMessage.SequenceNumber);
                            }
                            else
                            {
                                if (originalMessage.Properties.ContainsKey("Say"))
                                {
                                    Console.WriteLine(originalMessage.Properties["Say"].ToString());
                                }

                                Console.WriteLine("{0} - Complete", originalMessage.SequenceNumber);
                                originalMessage.Complete();
                            }
                        }
                        else
                        {
                            Console.Write(".");
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.ToString());
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception {0}", ex.Message);
            }

            TimeSpan wait = TimeSpan.FromSeconds(randomWait.Next(1, 10));
            System.Threading.Thread.Sleep(wait);
        }
    }
}