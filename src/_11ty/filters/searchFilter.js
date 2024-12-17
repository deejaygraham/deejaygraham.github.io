import elasticlunr from "elasticlunr";

// search on title, tags and an excerpt of each post.
async function searchFilter(collection) {
  const index = elasticlunr(function () {
    this.addField("title");
    this.addField("excerpt");
    this.addField("tags");
    this.setRef("id");
  });

  for (const page of collection) {
    let excerpt = " ";

    const frontMatter = await page.template.read();

    if (page.rawInput) {
      const excerptLength = 255; // chars
      let content = page.rawInput.replace(/(<([^>]+)>)/gi, "");
      content = content.replace(/\n/g, " ");
      excerpt = content.substr(0, content.lastIndexOf(" ", excerptLength));
    }

    if (frontMatter.data.layout && frontMatter.data.layout === "quotation") {
      if (frontMatter.data.attribution) {
        excerpt += " " + frontMatter.data.attribution;
      }
    }

    index.addDoc({
      id: page.url,
      title: frontMatter.data.title,
      excerpt: excerpt,
      tags: frontMatter.data.tags,
    });
  }

  return index.toJSON();
}

export default searchFilter;
