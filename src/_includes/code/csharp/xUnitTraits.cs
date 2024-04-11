    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
    public class InMemoryTestAttribute : TraitAttribute
    {
       public InMemoryTestAttribute()
           : base("Category", "Fast")
       {
       }
    }
    
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
    public class TouchingFileSystemTestAttribute : TraitAttribute
    {
        public TouchingFileSystemTestAttribute()
            : base("Category", "Slow - FileSystem")
        {
        }
    }
    
    public class CompilerFacts
    {
        [Fact]
        [InMemoryTest]
        public void Compiler_Created_With_Default_Properties()
        {
            // ... fast test here
        }
        
        [Fact]
        [TouchingFileSystemTest]
        public void Compiler_Writes_File_In_Correct_Location()
        {
            // ... slow test here
        }
    
    }
    