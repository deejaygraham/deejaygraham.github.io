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

export default function (text, speed = 160) {
  const content = new String(text);
  
  // remove all html elements
  const re = /(&lt;.*?&gt;)|(<[^>]+>)/gi;
  let plain = content.replace(re, "");

  // replace all newlines and 's with spaces
  plain = plain.replace(/\s+|'s/g, " ");

  // create array of all the words in the post & count them
  const words = plain.split(" ");
  const count = words.length;

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
