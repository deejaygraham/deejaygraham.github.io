var list = new List<Uri>();

list.Add(new Uri("http://www.madeup.com/1/"));
list.Add(new Uri("http://www.madeup.com/1/2/"));
list.Add(new Uri("http://www.madeup.com/1/2/3/4/5/6/7/8"));
list.Add(new Uri("http://www.madeup.com/1/2/3/4/"));
list.Add(new Uri("http://www.madeup.com/1/2/3"));
list.Add(new Uri("http://www.madeup.com/1/3/5/7/"));
list.Add(new Uri("http://www.madeup.com/1/4/6/8/10"));
list.Add(new Uri("http://www.madeup.com/1/3/5/7/9"));

foreach(var item in list.OrderByDescending(x => x.AbsolutePath.Length))
{
	Console.WriteLine(item);
}
