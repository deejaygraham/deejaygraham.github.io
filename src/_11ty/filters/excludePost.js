export function excludePost(allPosts, currentPost) {
  return allPosts.filter(
    (post) => post.inputPath !== currentPost.inputPath
  )
}
