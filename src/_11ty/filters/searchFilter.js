import elasticlunr from "elasticlunr";
import generateExcerpt from './generateExcerpt.js';

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

    if (page.data.excludeFromSitemap || page.data.draft) {
      // exclude this page from search
      continue;
    }

    if (page.rawInput) {
      const excerptLength = 250; // chars
      excerpt = generateExcerpt(page.rawInput, excerptLength);
    }

    if (page.data.layout && page.data.layout === "quotation") {
      if (page.data.attribution) {
        excerpt += " " + page.data.attribution;
      }
    }

    index.addDoc({
      id: page.url,
      title: page.data.title,
      excerpt: excerpt,
      tags: page.data.tags,
    });
  }

  return index.toJSON();
}

export default searchFilter;
