module.exports = function(collection = [], ...requiredTags) {
  if(requiredTags) {
    const flatTags = requiredTags.flat();
    return collection.filter(post => {
      return flatTags.every(tag => post.data.tags?.includes(tag));
    });
  }

  return [];
}
