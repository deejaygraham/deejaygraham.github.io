export default function (text) {
  const content = new String(text);
  
  // remove all html elements
  const re = /(&lt;.*?&gt;)|(<[^>]+>)/gi;
  let plain = content.replace(re, "");

  // replace all newlines and 's with spaces
  plain = plain.replace(/\s+|'s/g, " ");

  const words = plain.split(" ");
  return words.length;
}
