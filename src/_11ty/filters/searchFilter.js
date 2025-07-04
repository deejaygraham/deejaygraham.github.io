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

    if (page.data.excludeFromSitemap) {
      // exclude this page from search
      continue;
    }

    const frontMatter = await page.template.read();

    if (page.rawInput) {
      const excerptLength = 400; // chars
      excerpt = generateExcerpt(page.rawInput, excerptLength);
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
