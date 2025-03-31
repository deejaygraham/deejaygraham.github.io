import test from "ava";
import readingTime from "./readingTime.js";

test("reading time for short sentence is less than a minute", (t) => {
  t.is(readingTime('this is very short'), /less than 1 minute/);
});

test("reading time for medium sentence is one minute", (t) => {
  const sentence = 'this is a slightly longer sentence but read by someone who reads slowly';
  const speed = sentence.length;
  t.is(readingTime(sentence, speed), /about 1 minute/);
});
