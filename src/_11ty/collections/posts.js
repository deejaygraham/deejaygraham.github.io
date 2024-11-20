const now = new Date();

export default function(collection) {
  return collection
    .getFilteredByGlob("./src/content/posts/*.md")
    .filter((item) => item.data.draft !== true && item.date <= now)
    .reverse();
};
