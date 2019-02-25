
Bot chatBot = new Bot();
chatBot.loadSettings();

User consoleUser = new User("consoleUser", chatBot);

chatBot.isAcceptingUserInput = false;
chatBot.loadAIMLFromFiles();
chatBot.isAcceptingUserInput = true;

while (true)
{
	Console.ForegroundColor = ConsoleColor.Green;
	Console.Write("> ");
	string typedInput = Console.ReadLine();

	if (typedInput.ToLower() == "quit")
		return;

	Result botResponse = chatBot.Chat(new Request(typedInput, consoleUser, chatBot));
	Console.ForegroundColor = ConsoleColor.Red;
	Console.WriteLine(botResponse.Output);
}
