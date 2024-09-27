const elasticlunr = require("elasticlunr");

// search titles only for now.
module.exports = function (collection) {
  var index = elasticlunr(function () {
    this.addField("title");
    this.addField("excerpt");
    this.addField("tags");
    this.setRef("id");
  });

  collection.forEach((page) => {
    let excerpt = ' ';
    
    if (page.template.frontMatter.data.layout && page.template.frontMatter.data.layout === 'quotation') {
      if (page.template.frontMatter.data.attribution) {
        excerpt = page.template.frontMatter.data.attribution;
      }
    } else if (page.content) {
      const excerptLength = 255; // chars
      let content = page.content.replace(/(<([^>]+)>)/gi, "");
      content = content.replace(/\n/g, ' ');
      excerpt = content.substr(0, content.lastIndexOf(" ", excerptLength));
    }
    
    index.addDoc({
      id: page.url,
      title: page.template.frontMatter.data.title,
      excerpt: excerpt,
      tags: page.template.frontMatter.data.tags
    });
  });

  return index.toJSON();
};
