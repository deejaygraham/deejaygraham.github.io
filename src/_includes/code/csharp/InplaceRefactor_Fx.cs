using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using System.Runtime.Serialization;

/*
 * Test Attributes - Add attributes to your test code
 * 
 */

/// <summary>
/// MsTest test class
/// </summary>
[AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
internal class TestClassAttribute : Attribute
{
}

/// <summary>
/// MsTest test method.
/// </summary>
[AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
internal class TestMethodAttribute : Attribute
{
}

/// <summary>
/// NUnit test class
/// </summary>
[AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
internal class TestFixtureAttribute : Attribute
{
}

/// <summary>
/// NUnit test method.
/// </summary>
[AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
internal class TestAttribute : Attribute
{
}


/*
 * Asserts - mixture of MsTest and NUnit
 * 
 */

internal static class Assert
{
    /* MsTest specific */
    public static void IsTrue(bool condition)
    {
        if (!condition)
            NotifyFailure("Assert.IsTrue");
    }

    public static void IsFalse(bool condition)
    {
        if (!condition)
            NotifyFailure("Assert.IsFalse");
    }

    public static void IsNull(object value)
    {
        if (value != null)
            NotifyFailure("Assert.IsNull");
    }

    public static void IsNotNull(object value)
    {
        if (value == null)
            NotifyFailure("Assert.IsNotNull");
    }

    public static void AreEqual(object expected, object actual)
    {
        if (!object.Equals(expected, actual))
            NotifyFailure("Assert.AreEqual");
    }

    // Nunit
    public static void AreNotEqual(object expected, object actual)
    {
        if (object.Equals(expected, actual))
            NotifyFailure("Assert.AreNotEqual");
    }

    public static void Fail()
    {
        NotifyFailure("Assert.Fail called");
    }

    /* End of MsTest specific */

    internal static void NotifyFailure(string message)
    {
        throw new AssertionFailedException(message);
    }
}

/*
 * Framework 
 * 
 */

[Serializable]
internal class AssertionFailedException : Exception
{
    public AssertionFailedException()
    {
    }

    public AssertionFailedException(string message)
        : base(message)
    {
    }

    public AssertionFailedException(string message, Exception ex)
        : base(message, ex)
    {
    }

    protected AssertionFailedException(SerializationInfo info, StreamingContext context)
        : base(info, context)
    {
    }
}

/// <summary>
/// Instance of one test.
/// </summary>
internal class TestCase
{
    public TestCase(Type t, MethodInfo m)
    {
        this.TestType = t;
        this.TestMethod = m;
    }

    public void Run()
    {
        object instance = Activator.CreateInstance(this.TestType);

        this.TestMethod.Invoke(instance, null);
    }

    public override string ToString()
    {
        return this.TestType.Name + " " + this.TestMethod.Name;
    }

    private Type TestType { get; set; }
    private MethodInfo TestMethod { get; set; }
}

/// <summary>
/// Finds test cases in an assembly.
/// </summary>
internal interface ITestFinder
{
    IEnumerable<TestCase> FindTests(Assembly a);
}

/// <summary>
/// Executes test cases and logs results.
/// </summary>
internal interface ITestExecutor
{
    int Passes { get; }

    int Failures { get; }

    void Run(IEnumerable<TestCase> testCases, ITestLogger logger);
}

/// <summary>
/// Writes log results.
/// </summary>
internal interface ITestLogger
{
    void Log(string text);
}

/// <summary>
/// Write results to debug window
/// </summary>
internal class DebugLogger : ITestLogger
{
    public void Log(string text)
    {
        Debug.WriteLine(text);
    }
}

/// <summary>
/// Finds MsTest-style tests
/// </summary>
internal class MsTestFinder : AttributedSourceTestFinder<TestClassAttribute, TestMethodAttribute>
{
}

/// <summary>
/// Finds NUnit-style tests
/// </summary>
internal class NUnitTestFinder : AttributedSourceTestFinder<TestFixtureAttribute, TestAttribute>
{
}

/// <summary>
/// Generic test finder, given class and method level attributes.
/// </summary>
/// <typeparam name="TestClass"></typeparam>
/// <typeparam name="TestMethod"></typeparam>
internal class AttributedSourceTestFinder<TestClass, TestMethod>
    : ITestFinder
    where TestClass : Attribute
    where TestMethod : Attribute
{
    public IEnumerable<TestCase> FindTests(Assembly a)
    {
        var list = new List<TestCase>();

        // look for all test classes,
        foreach (Type eachType in a.GetTypes())
        {
            object[] testClassAttributes = eachType.GetCustomAttributes(typeof(TestClass), false);

            if (testClassAttributes.Length == 0)
                continue;

            // build list of test methods...
            foreach (MethodInfo method in eachType.GetMethods())
            {
                object[] testMethodAttributes = method.GetCustomAttributes(typeof(TestMethod), false);

                if (testMethodAttributes.Length == 0)
                    continue;

                list.Add(new TestCase(eachType, method));
            }
        }

        return list;
    }
}

internal class SimpleTestExecutor : ITestExecutor
{
    public int Passes { get; private set; }

    public int Failures { get; private set; }

    public void Run(IEnumerable<TestCase> testCases, ITestLogger logger)
    {
        this.Passes = 0;
        this.Failures = 0;

        foreach (TestCase testCase in testCases)
        {
            Exception ex = null;

            try
            {
                testCase.Run();
                ++this.Passes;
            }
            catch (TargetInvocationException tie)
            {
                ex = tie.InnerException;
            }
            catch (AssertionFailedException afe)
            {
                ex = afe;
            }

            if (ex != null)
            {
                ++this.Failures;
                logger.Log(testCase.ToString() + " : " + ex.Message);
            }
        }
    }
}

internal class Inplace
{
    private Inplace()
    {
    }

    public static Inplace Tests()
    {
        return new Inplace
        {
            Finder = new MsTestFinder(),
            Executor = new SimpleTestExecutor(),
            Logger = new DebugLogger()
        };
    }

    private ITestFinder Finder { get; set; }

    private ITestExecutor Executor { get; set; }

    private ITestLogger Logger { get; set; }

    public Inplace UsesMsTest()
    {
        this.Finder = new MsTestFinder();

        return this;
    }

    public Inplace UsesNUnit()
    {
        this.Finder = new NUnitTestFinder();

        return this;
    }

    public void Run()
    {
        Assembly thisAssembly = Assembly.GetExecutingAssembly();

        var allTestCases = new List<TestCase>();

        allTestCases.AddRange(this.Finder.FindTests(thisAssembly));

        this.Executor.Run(allTestCases, this.Logger);

        if (this.Executor.Failures > 0)
        {
            this.Logger.Log(string.Format("{0} tests failed", this.Executor.Failures));
        }
    }
}
