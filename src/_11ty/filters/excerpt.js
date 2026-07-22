// generate an excerpt suitable for a summary page
// with elipsis...
// usage: {{ post.templateContent | excerpt }}
export default function (post) {
  const characterLimit = 200;
  const content = post
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  if (content.length > 0) {
    const cut = content.lastIndexOf(" ", characterLimit);
    const end = cut > 0 ? cut : Math.min(content.length, characterLimit);
    return content.slice(0, end) + "...";
  }

  return "";
}
