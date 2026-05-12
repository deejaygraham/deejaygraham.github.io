function normalizePath(u) {
  if (u == null || typeof u !== "string") {
    return "";
  }
  let s = u.trim();
  if (!s) {
    return "";
  }
  if (!s.startsWith("/")) {
    s = `/${s}`;
  }
  return s.replace(/\/+$/, "") || "/";
}

/** @param {import('@11ty/eleventy').CollectionItem[]} collection */
export function findPostByUrl(collection, url) {
  if (!Array.isArray(collection) || !url) {
    return undefined;
  }
  const target = normalizePath(url);
  return collection.find((p) => normalizePath(p?.url) === target);
}

/**
 * Drop posts whose URL appears in featured (string URL or { url }).
 * @param {import('@11ty/eleventy').CollectionItem[]} collection
 */
export function excludePostsByUrls(collection, featuredEntries) {
  if (!Array.isArray(collection)) {
    return [];
  }
  const urls = (featuredEntries || [])
    .map((e) => (typeof e === "string" ? e : e?.url))
    .filter(Boolean)
    .map(normalizePath);
  if (!urls.length) {
    return collection;
  }
  const set = new Set(urls);
  return collection.filter((p) => !set.has(normalizePath(p?.url)));
}
