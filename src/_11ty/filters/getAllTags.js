// Return all the tags used in a collection, including the
// 11ty tags.
// The list of tags is sorted into alphabetical order.
export default function(collection) {
  let uniqueTags = new Set();
  for (let item of collection) {
    (item.data.tags || []).forEach((t) => uniqueTags.add(t));
  }

  return Array.from(uniqueTags).sort();
};
