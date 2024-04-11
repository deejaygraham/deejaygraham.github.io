ChromeOptions options = new ChromeOptions();

if (openBrowserDebugWindow)
{
    // https://peter.sh/experiments/chromium-command-line-switches/
    options.AddArgument("--auto-open-devtools-for-tabs");
}

var driver = new ChromeDriver(pathToWebDriver, options);

if (!String.IsNullOrEmpty(networkSpeed))
{
    var throttling = Throttling.FromPreset(networkSpeed);

    if (throttling.Enabled)
    {
        driver.NetworkConditions = new ChromeNetworkConditions
        {
            Latency = throttling.Latency,
            DownloadThroughput = throttling.Download,
            UploadThroughput = throttling.Upload
        };
    }
}
