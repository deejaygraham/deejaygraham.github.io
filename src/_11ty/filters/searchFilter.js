import elasticlunr from "elasticlunr";

// search titles only for now.
async function searchFilter(collection) {
  const index = elasticlunr(function () {
    this.addField("title");
    this.addField("excerpt");
    this.addField("tags");
    this.setRef("id");
  });

  for(const page of collection){
    let excerpt = ' ';

    const frontMatter = await page.template.read();
   
    if (frontMatter.data.layout && frontMatter.data.layout === 'quotation') {
      if (frontMatter.data.attribution) {
        excerpt = frontMatter.data.attribution;
      }
    } else if (page.content) {
      const excerptLength = 255; // chars
      let content = page.content.replace(/(<([^>]+)>)/gi, "");
      content = content.replace(/\n/g, ' ');
      excerpt = content.substr(0, content.lastIndexOf(" ", excerptLength));
    }

    index.addDoc({
      id: page.url,
      title: frontMatter.data.title,
      excerpt: excerpt,
      tags: frontMatter.data.tags
    });
  }

  return index.toJSON();
};

export default searchFilter;