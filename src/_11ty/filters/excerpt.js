// generate an excerpt suitable for a summary page
// with elipsis...
// usage: {{ post.templateContent | excerpt }}
export default function (post) {
  const characterLimit = 200;
  const content = post.replace(/(<([^>]+)>)/gi, "");

  if (content && content.length > 0) {
    return content.substr(0, content.lastIndexOf(" ", characterLimit)) + "...";
  }

  return '';
}
