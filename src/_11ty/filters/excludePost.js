export default function (allPosts, currentPost) {
  return allPosts.filter((post) => post.inputPath !== currentPost.inputPath);
}
