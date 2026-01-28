// generate an excerpt of plain text suitable for 
// inclusion in a search database doc - 
// remove all html and markdown
export default function (text, excerptLength) {
  let content = text.replace(/(<([^>]+)>)/gi, ""); // remove html
  content = content.replace(/\n/g, " "); // remove new lines
  content = content.replace(/\([^)]*\)/g, ""); // remove markdown link url and parentheses
  content = content.replace(/\[/g, ""); // remove surrounding square brackets from markdown link
  content = content.replace(/\]/g, ""); // remove surrounding square brackets from markdown link

  // remove some dodgy markup that should not appear in search results
  const forbiddenList = [ '```', '#', '{%', '{{' ];
  let earliestIndex = -1;

  for (const forbidden in forbiddenList) {
      const index = content.indexOf(forbidden);
      if (index !== -1 && (earliestIndex === -1 || index < earliestIndex)) {
        earliestIndex = index;
      }
  }

  if (content && earliestIndex > -1) {
    content = content.slice(0, earliestIndex);
  }
  
  if (content && content.length > excerptLength) {
    // find space closest to the character limit
    return content.substr(0, content.lastIndexOf(" ", excerptLength));
  }

  return content;
}
