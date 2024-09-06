const elasticlunr = require("elasticlunr");

// search titles only for now.
module.exports = function (collection) {
  var index = elasticlunr(function () {
    this.addField("title");
    this.addField("tags");
    this.setRef("id");
  });

  collection.forEach((page) => {

    if (page.template.frontMatter.data.layout && page.template.frontMatter.data.layout === 'quotation') {
      let content = page.template.frontMatter.data.title;

      if (page.template.frontMatter.data.attribution) {
        content += ' ' + page.template.frontMatter.data.attribution;
      }
      
      index.addDoc({
        id: page.url,
        title: content,
        tags: page.template.frontMatter.data.tags,
      });
    } 
    else {
      index.addDoc({
        id: page.url,
        title: page.template.frontMatter.data.title,
        tags: page.template.frontMatter.data.tags,
      });
    }
  });

  return index.toJSON();
};
