import test from "ava";
import { dateRFC2822, dateFormat, dateFull, dateISO, dateYear } from "./dates.js";

const exampleDate = new Date(2025, 5, 19);

// dateRFC822
test("RFC 822 format displayed correctly", (t) => {
  t.is(dateRFC2822(exampleDate), "");
});

// dateFormat
test("Formatted date displayed correctly", (t) => {
  t.is(dateFormat(exampleDate, 'yyyy-MM-dd'), "");
});

// dateFull
test("Full date is human readable", (t) => {
  t.is(dateFull(exampleDate), "");
});

// dateISO
test("ISO date is displayed correctly", (t) => {
  t.is(dateISO(exampleDate), "");
});

// dateYear
test("Year date is displayed correctly", (t) => {
  t.is(dateYear(exampleDate), "");
});
