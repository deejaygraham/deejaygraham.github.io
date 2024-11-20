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

export default function(text) {
  const content = new String(text);
  const speed = 240; // reading speed in words per minute

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
  if (readingTime === 0) {
    return "Less than 1 minute to read";
  } else if (readingTime === 1) {
    return "1 minute to read";
  } else {
    return readingTime + " minutes to read";
  }
};
