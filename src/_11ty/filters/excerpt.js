module.exports = function(post) {
  const characterLimit = 200;
  const content = post.replace(/(<([^>]+)>)/gi, "");
  return content.substr(0, content.lastIndexOf(" ", characterLimit)) + "...";
});
