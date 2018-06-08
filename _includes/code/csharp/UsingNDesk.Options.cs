using NDesk.Options;

internal class CommandLineOptionsBuilder 
{
    public CommandLineOptions GetOptions(string[] args) 
	{
		CommandLineOptions options = new CommandLineOptions();

		var os = new OptionSet
		{
   			{ "project=",      	path => options.ProjectFilePath = path },
   			{ "output=",      	path => options.OutputFilePath = path },
   			{ "t|targets",  	t => options.AnalysisOption = AnalysisOption.Targets },
   			{ "i|items",  		i => options.AnalysisOption = AnalysisOption.Items },
   			{ "p|properties",  	i => options.AnalysisOption = AnalysisOption.Properties },
   			{ "h|?|help",   	help => options.ShowHelp = help != null },
		};
			
		os.Parse(args);

        return options;
    }
}
