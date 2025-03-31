import test from "ava";
import dates from "./dates.js";

const exampleDate = new Date(2025, 5, 19);

// dateRFC822
test("RFC 822 format includes day of week, date and timestamp", (t) => {
  t.is(dates.dateRFC2822(exampleDate), "Thu, 19 Jun 2025 00:00:00 +0000");
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
  t.is(dates.dateISO(exampleDate), "2025-06-19T00:00:00.000+00:00");
});

// dateYear
test("Year date is year as integer", (t) => {
  t.is(dates.dateYear(exampleDate), 2025);
});
