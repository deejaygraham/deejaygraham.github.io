using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/// <summary>
/// Simulation of slower networks in selenium. 
/// </summary>
public class Throttling
{
    /// <summary>
    /// Load a set of network throttling characteristics based on a network name.
    /// Unknown networks or blank returns a default "off" setting.
    /// </summary>
    /// <param name="name"></param>
    /// <returns></returns>
    public static Throttling FromPreset(string name)
    {
        if (!String.IsNullOrEmpty(name))
        {
            string key = name.ToLower();

            if (Presets.ContainsKey(key))
                return Presets[key];
        }

        // turned off
        return new Throttling { Enabled = false };
    }

    private static int KilobitPerSecond = 1000;
    private static int MegabitPerSecond = 1000 * KilobitPerSecond;

    // Figures taken from https://helpdeskgeek.com/networking/simulate-slow-internet-connection-testing/
    private static readonly Dictionary<string, Throttling> Presets = new Dictionary<string, Throttling>
    {
        { "gprs",   new Throttling { Latency = TimeSpan.FromMilliseconds(500),  Download =  50 * KilobitPerSecond,       Upload =  20 * KilobitPerSecond } },
        { "2g",     new Throttling { Latency = TimeSpan.FromMilliseconds(300),  Download = 250 * KilobitPerSecond,       Upload =  50 * KilobitPerSecond } },
        { "good2g", new Throttling { Latency = TimeSpan.FromMilliseconds(150),  Download = 450 * KilobitPerSecond,       Upload = 150 * KilobitPerSecond } },
        { "3g",     new Throttling { Latency = TimeSpan.FromMilliseconds(100),  Download = 750 * KilobitPerSecond,       Upload = 250 * KilobitPerSecond } },
        { "good3g", new Throttling { Latency = TimeSpan.FromMilliseconds(40),   Download = (long)1.5 * MegabitPerSecond, Upload = 750 * KilobitPerSecond } },
        { "4g",     new Throttling { Latency = TimeSpan.FromMilliseconds(20),   Download =  4 * MegabitPerSecond,        Upload =  3 * MegabitPerSecond } },
        { "dsl",    new Throttling { Latency = TimeSpan.FromMilliseconds(5),    Download =  2 * MegabitPerSecond,        Upload =  1 * MegabitPerSecond } },
        { "wifi",   new Throttling { Latency = TimeSpan.FromMilliseconds(2),    Download = 30 * MegabitPerSecond,        Upload = 15 * MegabitPerSecond } },
    };

    public Throttling()
    {
        this.Enabled = true;
        this.Latency = TimeSpan.Zero;
        this.Download = -1L;
        this.Upload = -1L;
    }

    public bool Enabled { get; private set; }

    public TimeSpan Latency { get; private set; }

    public long Download { get; private set; }

    public long Upload { get; private set; }
}
