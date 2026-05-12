import topicHubs from "../_data/topicHubs.js";

export default {
  eleventyComputed: {
    /** Import hub config here so computed runs do not depend on global data merge order. */
    topicHub: (data) => topicHubs[data.tag] ?? null,
    title: (data) => topicHubs[data.tag]?.title ?? "posts by tag",
    /** Exposed to `partials/head/meta.njk` for hub pages (clean meta / Open Graph text). */
    metaDescription: (data) => topicHubs[data.tag]?.description,
    excludeFromSitemap: (data) => !topicHubs[data.tag],
  },
};
