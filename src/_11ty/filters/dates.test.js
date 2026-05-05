import test from "ava";
import { DateTime } from "luxon";
import dates from "./dates.js";

const exampleDate = new Date(2025, 5, 19);

// dateRFC822
test("RFC 822 format includes day of week, date and timestamp", (t) => {
  const expected = DateTime.fromJSDate(exampleDate).toRFC2822();
  t.is(dates.dateRFC2822(exampleDate), expected);
});

// dateFormat
test("Formatted date displayed correctly", (t) => {
  t.is(dates.dateFormat(exampleDate, 'yyyy-MM-dd'), "2025-06-19");
});

// dateFull
test("Full date is human readable day month year only", (t) => {
  t.is(dates.dateFull(exampleDate), "19 June 2025");
});

// dateISO
test("ISO date is displayed as year month day and timestamp", (t) => {
  const expected = DateTime.fromJSDate(exampleDate).toISO();
  t.is(dates.dateISO(exampleDate), expected);
});

// dateYear
test("Year date is year as integer", (t) => {
  t.is(dates.dateYear(exampleDate), 2025);
});
