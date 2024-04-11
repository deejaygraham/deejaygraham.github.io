
[Test]
[TestCase(new DateTime(2015, 1, 7, 11, 19, 8), "2015-01-07 111908")]
public void ISO8601Format_Dates_Are_Ordered_Year_First(DateTime date, string formatted)
{
	Assert.AreEqual(date.ToISO8601(), formatted);
}

[Test]
[TestCase(new DateTime(2015, 1, 7, 11, 19, 8), "2015-01-07 11:19:08")]
public void ISO8601ExFormat_Dates_Are_Ordered_Year_First_With_Time_Colons(DateTime date, string formatted)
{
	Assert.AreEqual(date.ToISO8601Ex(), formatted);
}
