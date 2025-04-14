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

export default function (text, speed = 240) {
  const content = new String(text);
  const stopwatch = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" /></svg>';

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

  let estimate = stopwatch + " Takes ";

  if (readingTime === 0) {
    estimate += "less than 1 minute to read";
  } else if (readingTime === 1) {
    estimate += "about 1 minute to read";
  } else {
    estimate += `about ${readingTime} minutes to read`;
  }

  return estimate;
}
