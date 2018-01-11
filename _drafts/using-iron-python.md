---

---


~~~ python

using IronPython.Hosting;
using IronPython.Runtime;
using IronPython;


// inside class...
private ScriptEngine engine;



      // setup iron python
			Dictionary<string, object> options = new Dictionary<string, object>();
			options["Debug"] = true;
			engine = Python.CreateEngine(options);

      var paths = engine.GetSearchPaths();

			string executionFolder = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);
			paths.Add(executionFolder);

			engine.SetSearchPaths(paths);



      private void AttemptCodeCompilation()
{
  // throw new NotImplementedException();
  string candidatePython = this.pythonEditor.Text;

  if (!String.IsNullOrWhiteSpace(candidatePython))
  {
    try
    {
      ScriptSource source = engine.CreateScriptSourceFromString(candidatePython);
      ScriptScope scope = engine.CreateScope();

      var display = new microbit.display();
      display.Display = this.microbitLedGrid1;

      scope.SetVariable("display", display);

      source.Compile();

      var result = source.Execute(scope);
      if (result != null)
      {
        string r = engine.Operations.Format(result);

        //OutputTextBox.AppendText(engine.Operations.Format(result));
      }

      // add paths to script for module loading
      // set some variables..
    }
    catch(Exception ex)
    {
      var eo = engine.GetService<ExceptionOperations>();
      var eoString = eo.FormatException(ex);

      this.interpreterOutput.Text = eoString;
    }
  }
}

~~~


~~~ python

class Program
{
  static readonly string LocalAddress = "127.0.0.1";
  static readonly int Port = 4711;

      static void Main()
  {
    TcpListener listener = null;

    try
    {
      IPAddress ipAddress = IPAddress.Parse(LocalAddress);

      listener = new TcpListener(ipAddress, Port);
      listener.Start();

      Console.WriteLine("Listening for a tcp connection on port {0}... ", Port);
      TcpClient client = listener.AcceptTcpClient();

      NetworkStream stream = client.GetStream();
      StreamWriter writer = new StreamWriter(stream, Encoding.ASCII) { AutoFlush = true };
      StreamReader reader = new StreamReader(stream, Encoding.ASCII);

      MinecraftUniverse universe = new MinecraftUniverse();
      MinecraftCommandParser parser = new MinecraftCommandParser();

      while (true)
      {
        if (Console.KeyAvailable)
        {
          var key = Console.ReadKey();

          if (key.Key == ConsoleKey.Q)
            break;
        }

        string inputLine = string.Empty;

        while (inputLine != null)
        {
          inputLine = reader.ReadLine();

          if (String.IsNullOrWhiteSpace(inputLine))
            continue;

          var command = parser.Parse(inputLine);

          string response = string.Empty;

          switch (command.Object)
          {
            case "world":

              response = universe.Landscape.Process(command.Method, command.Arguments);
              break;

            case "chat":

              response = universe.History.Process(command.Method, command.Arguments);
              break;
          }

          if (!string.IsNullOrEmpty(response))
          {
            writer.WriteLine(response);
          }
        }

        Console.WriteLine("Server saw disconnect from client.");


        //String data = null;

        //NetworkStream readWriteStream = client.GetStream();

        //Byte[] bytes = new Byte[256];
        //int byteCount;

        //StringBuilder response = new StringBuilder();

        //while ((byteCount = readWriteStream.Read(bytes, 0, bytes.Length)) != 0)
        //{
        //	// Translate data bytes to a ASCII string.
        //	data = System.Text.Encoding.ASCII.GetString(bytes, 0, byteCount);

        //	var lines = data.Split(new char[] { '\n' });

        //	foreach(var line in lines)
        //	{
        //		if (String.IsNullOrWhiteSpace(line))
        //			continue;

        //		var command = parser.Parse(line);

        //		string returnMessage = string.Empty;

        //		switch(command.Object)
        //		{
        //			case "world":

        //				returnMessage = universe.Landscape.Process(command.Method, command.Arguments);
        //				break;

        //			case "chat":

        //				returnMessage = universe.History.Process(command.Method, command.Arguments);
        //				break;
        //		}

        //		if (!string.IsNullOrEmpty(returnMessage))
        //		{
        //			response.AppendLine(returnMessage);
   //                       }
        //	}
        //}

        //if (!String.IsNullOrEmpty(response.ToString()))
        //{
        //	byte[] msg = System.Text.Encoding.ASCII.GetBytes(response.ToString());
        //	readWriteStream.Write(msg, 0, msg.Length);
        //}

        // Shutdown and end connection
//					client.Close();
      }
    }
    catch(IOException e)
    {
      Console.WriteLine("IOException: {0}", e);
    }
    catch (SocketException e)
    {
      Console.WriteLine("SocketException: {0}", e);
    }
    finally
    {
      if (listener != null)
        listener.Stop();
    }

    Console.WriteLine("\nHit enter to continue...");
    Console.Read();
  }
}

~~~
