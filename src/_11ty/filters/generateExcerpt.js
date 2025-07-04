export default function (text, excerptLength) {
  let content = text.replace(/(<([^>]+)>)/gi, ""); // remove html
  content = content.replace(/\n/g, " "); // remove new lines
  content = content.replace(/\([^)]*\)/g, ""); // remove markdown link url and parentheses
  content = content.replace(/\[/g, ""); // remove surrounding square brackets from markdown link
  content = content.replace(/\]/g, ""); // remove surrounding square brackets from markdown link
  return content.substr(0, content.lastIndexOf(" ", excerptLength));
}
