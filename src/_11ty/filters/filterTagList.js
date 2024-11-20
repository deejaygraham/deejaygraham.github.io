// filter a list of tags to remove 11ty in-built and retain the
// tags explicitly added to posts.
export function filterTagList(tags) {
  return (tags || []).filter(
    (tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1,
  );
};
