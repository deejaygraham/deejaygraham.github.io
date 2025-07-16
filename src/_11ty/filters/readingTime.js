/*
 * Calculate the reading time, in minutes, of a post (from bob monsour.com)
 *
 * Assumptions:
 * - average reading time is 240 words per minute
 *   source: https://bit.ly/3HCogSr, "Most Comprehensive
 *   Review To Date Finds The Average Person’s Reading
 *   Speed Is Slower Than Previously Thought"
 *
 * Output:
 * - reading time is rounded to the nearest minute
 * - in the case of less than 1 minute, reading time is
 *   displayed as "less than a minute"
 *
 * @param {String} text
 */
import wordCount from "./wordCount.js";

export default function (text, speed = 160) {
  const count = wordCount(text);

  // calculate the reading time
  const readingTime = Math.round(count / speed);

  let estimate = "Takes ";

  if (readingTime === 0) {
    estimate += "less than 1 minute to read";
  } else if (readingTime === 1) {
    estimate += "about 1 minute to read";
  } else {
    estimate += `about ${readingTime} minutes to read`;
  }

  return estimate;
}
