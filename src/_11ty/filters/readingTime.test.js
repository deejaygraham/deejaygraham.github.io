import test from "ava";
import readingTime from "./readingTime.js";

test("reading time for short sentence is less than a minute", (t) => {
  const sentence = 'this is very short';
  const estimate = readingTime(sentence);
  const regex = /less than 1 minute/;
  
  t.truthy(regex.test(estimate), `${estimate} does not match ${regex}`);
});

test("reading time for medium sentence is one minute", (t) => {
  const sentence = 'this is a slightly longer sentence but read by someone who reads slowly';
  const speed = sentence.length;
  const estimate = readingTime(sentence, speed);
  const regex = /about 1 minute/;
  
  t.truthy(regex.test(estimate), `${estimate} does not match ${regex}`);
});

test("reading time for longer sentence is more than 1 minute", (t) => {
  const sentence = 'this is a much longer sentence containing words and also read by someone who reads slowly';
  const speed = sentence.length / 2;
  const estimate = readingTime(sentence, speed);
  const regex = /about 2 minutes/;
  
   t.truthy(regex.test(estimate), `${estimate} does not match ${regex}`);
});
