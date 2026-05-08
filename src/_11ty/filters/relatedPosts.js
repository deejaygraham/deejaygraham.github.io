const SYSTEM_TAGS = new Set(["all", "nav", "post", "posts"]);

const normalizedTagList = (tags) => {
  return (Array.isArray(tags) ? tags : [])
    .filter((tag) => typeof tag === "string")
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag.length > 0 && !SYSTEM_TAGS.has(tag));
};

const getTimestamp = (value) => {
  if (!value) {
    return 0;
  }

  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
};

export default function relatedPosts(allPosts, currentPage, currentTags = [], max = 6) {
  if (!Array.isArray(allPosts) || !currentPage) {
    return [];
  }

  const limit = Number.isFinite(max) ? max : 6;
  const currentPath = currentPage.inputPath;
  const currentTagSet = new Set(normalizedTagList(currentTags));

  if (currentTagSet.size === 0) {
    return [];
  }

  return allPosts
    .filter((post) => post?.inputPath && post.inputPath !== currentPath)
    .map((post) => {
      const postTags = normalizedTagList(post?.data?.tags);
      const score = postTags.reduce(
        (shared, tag) => shared + (currentTagSet.has(tag) ? 1 : 0),
        0,
      );

      return { post, score, timestamp: getTimestamp(post.date) };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      if (b.timestamp !== a.timestamp) {
        return b.timestamp - a.timestamp;
      }

      return (a.post.url || "").localeCompare(b.post.url || "");
    })
    .slice(0, limit)
    .map((entry) => entry.post);
}
