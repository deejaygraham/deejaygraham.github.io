const elasticlunr = require("elasticlunr");

// search titles only for now.
module.exports = function(collection) {
  var index = elasticlunr(function() {
    this.addField("title");
  });

  collection.forEach(page => {
    index.addDoc({
      id: page.url,
      title: page.template.frontMatter.data.title
    });
  });

  return index.toJSON();
};
